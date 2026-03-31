import { Crown } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | The Royal Closet",
  description: "The Royal Closet 서비스 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600">
          <Crown className="h-4 w-4" />
          이용약관
        </div>
        <h1 className="text-2xl font-bold text-slate-900">이용약관</h1>
        <p className="mt-2 text-sm text-slate-500">
          최종 업데이트: 2026년 3월 31일
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            1. 서비스 개요
          </h2>
          <p>
            The Royal Closet(이하 &quot;서비스&quot;)은 역사적 왕실 패션에서
            영감을 받은 가상 드레스업 및 피팅 체험 플랫폼입니다. 본 서비스는
            엔터테인먼트 목적으로 제공되며, 실제 왕실이나 패션 브랜드와 공식적인
            제휴, 후원 또는 연관 관계가 없습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            2. 이용 자격
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>만 13세 이상인 자만 서비스를 이용할 수 있습니다.</li>
            <li>
              만 13세 미만의 아동이 서비스를 이용하려면 법정 대리인의 동의가
              필요합니다.
            </li>
            <li>
              서비스 이용 시 본 약관에 동의한 것으로 간주됩니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            3. 서비스 이용
          </h2>
          <h3 className="mb-2 font-semibold text-slate-800">
            3-1. 허용되는 이용
          </h3>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>개인적인 엔터테인먼트 목적의 가상 드레스업 체험</li>
            <li>결과 이미지의 비상업적 개인 소셜 미디어 공유</li>
            <li>서비스 내 제공되는 기능의 정상적 이용</li>
          </ul>
          <h3 className="mb-2 font-semibold text-slate-800">
            3-2. 금지되는 이용
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>서비스 콘텐츠의 상업적 이용 또는 재판매</li>
            <li>서비스의 리버스 엔지니어링, 크롤링 또는 자동화된 접근</li>
            <li>타인의 사진을 무단으로 업로드하는 행위</li>
            <li>서비스를 이용하여 불법적이거나 유해한 콘텐츠를 생성하는 행위</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            4. 지적재산권
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              서비스 내 디지털 의상, 일러스트레이션, 디자인, 코드 등 모든
              콘텐츠의 지적재산권은 The Royal Closet에 귀속됩니다.
            </li>
            <li>
              모든 컬렉션은 역사적 패션 트렌드에서 영감을 받은 독립적인
              창작물이며, 특정 인물이나 브랜드의 공식 제품이 아닙니다.
            </li>
            <li>
              사용자가 업로드한 사진의 저작권은 사용자에게 귀속됩니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            5. 면책 조항
          </h2>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                서비스는 &quot;있는 그대로(as-is)&quot; 제공되며, 특정 목적에
                대한 적합성을 보증하지 않습니다.
              </li>
              <li>
                AI 가상 피팅 결과는 참고용이며, 실제 착용 결과와 다를 수
                있습니다.
              </li>
              <li>
                서비스 이용으로 인한 간접적, 우발적 또는 결과적 손해에 대해
                책임지지 않습니다.
              </li>
              <li>
                서비스는 사전 통지 없이 변경, 중단 또는 종료될 수 있습니다.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            6. 사용자 생성 콘텐츠
          </h2>
          <p>
            사용자가 서비스를 통해 생성한 결과 이미지를 소셜 미디어 등에
            공유할 경우, 해당 이미지가 The Royal Closet의 공식 제품이나
            실제 왕실과 관련이 없음을 명확히 해야 합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            7. 약관 변경
          </h2>
          <p>
            본 약관은 서비스 운영 필요에 따라 변경될 수 있으며, 변경 시
            서비스 내 공지를 통해 안내합니다. 변경 후 서비스를 계속 이용하는
            경우 변경된 약관에 동의한 것으로 간주됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            8. 준거법 및 관할
          </h2>
          <p>
            본 약관의 해석 및 적용에 관한 사항은 대한민국 법률을 준거법으로
            하며, 분쟁 발생 시 서울중앙지방법원을 제1심 관할법원으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            9. 연락처
          </h2>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="font-medium text-slate-800">The Royal Closet</p>
            <p className="mt-1 text-slate-600">
              이메일: support@theroyalcloset.app
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
        >
          갤러리로 돌아가기
        </Link>
      </div>
    </div>
  );
}
