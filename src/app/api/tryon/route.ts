import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

export async function POST(request: NextRequest) {
  if (!process.env.FAL_KEY) {
    return NextResponse.json(
      { error: "FAL_KEY 환경 변수가 설정되지 않았습니다" },
      { status: 500 },
    );
  }

  try {
    const { modelImageUrl, garmentImageUrl, category } = await request.json();

    if (!modelImageUrl || !garmentImageUrl) {
      return NextResponse.json(
        { error: "modelImageUrl과 garmentImageUrl이 필요합니다" },
        { status: 400 },
      );
    }

    const result = await fal.subscribe("fal-ai/fashn/tryon/v1.6", {
      input: {
        model_image: modelImageUrl,
        garment_image: garmentImageUrl,
        category: category || "auto",
        mode: "balanced",
        num_samples: 1,
      },
    });

    const data = result.data as { images?: { url: string }[] };

    if (!data.images || data.images.length === 0) {
      return NextResponse.json({ error: "이미지 생성 실패" }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: data.images[0].url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    console.error("Try-on API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
