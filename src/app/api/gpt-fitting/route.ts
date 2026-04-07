import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 120;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { photoDataUrl, dressImageUrl, dressName } = await req.json();

    // 사용자 사진 변환
    const photoBase64 = photoDataUrl.split(",")[1];
    const photoBuffer = Buffer.from(photoBase64, "base64");
    const photoBlob = new Blob([photoBuffer], { type: "image/jpeg" });
    const photoFile = new File([photoBlob], "photo.jpg", { type: "image/jpeg" });

    // 드레스 이미지 fetch (상대 경로 → 절대 URL 변환)
    const origin = req.nextUrl.origin;
    const absoluteDressUrl = dressImageUrl.startsWith("/") ? `${origin}${dressImageUrl}` : dressImageUrl;
    const dressRes = await fetch(absoluteDressUrl);
    const dressBuffer = Buffer.from(await dressRes.arrayBuffer());
    const dressBlob = new Blob([dressBuffer], { type: "image/png" });
    const dressFile = new File([dressBlob], "dress.png", { type: "image/png" });

    const prompt = `The person in the photo is wearing the ${dressName}. Keep the person's face, skin tone, hair, pose, and background exactly the same. Only replace the clothing with the reference dress style. Make it look like a natural, high-quality fashion photograph.`;

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: photoFile,
      prompt,
    });

    const imageBase64 = response.data?.[0]?.b64_json;
    if (!imageBase64) throw new Error("이미지 생성 실패");
    return NextResponse.json({ imageUrl: `data:image/png;base64,${imageBase64}` });
  } catch (err: unknown) {
    console.error("[gpt-fitting] Error:", err);
    let msg = err instanceof Error ? err.message : "Unknown error";
    let status = 500;
    if (err && typeof err === "object" && "status" in err) {
      status = (err as { status: number }).status;
    }
    if (msg.includes("Could not process image")) {
      msg = "이미지를 처리할 수 없습니다. 다른 사진으로 시도해주세요.";
    } else if (msg.includes("rate limit") || status === 429) {
      msg = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
      status = 429;
    } else if (msg.includes("billing") || msg.includes("quota")) {
      msg = "API 사용량이 초과되었습니다. 관리자에게 문의해주세요.";
    }
    return NextResponse.json({ error: msg }, { status });
  }
}
