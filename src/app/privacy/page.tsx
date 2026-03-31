import { Crown } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 처리방침 | The Royal Closet",
  description: "The Royal Closet의 개인정보 처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600">
          <Crown className="h-4 w-4" />
          개인정보 처리방침
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          개인정보 처리방침
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          최종 업데이트: 2026년 3월 31일
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            1. 개요
          </h2>
          <p>
            The Royal Closet(이하 &quot;서비스&quot;)은 사용자의 개인정보를
            소중히 여기며, 관련 법률에 따라 개인정보를 보호하기 위해 최선을
            다하고 있습니다. 본 방침은 서비스 이용 시 수집되는 정보와 그 처리
            방법을 설명합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            2. 수집하는 정보
          </h2>
          <h3 className="mb-2 font-semibold text-slate-800">
            2-1. 자동 수집 정보
          </h3>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>브라우저 유형 및 버전</li>
            <li>기기 유형 (데스크톱/모바일)</li>
            <li>방문 일시 및 페이지 조회 기록</li>
            <li>쿠키 및 유사 기술을 통한 식별자</li>
          </ul>
          <h3 className="mb-2 font-semibold text-slate-800">
            2-2. 사용자 제공 정보
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>가상 트라이온 사진:</strong> 사용자가 자발적으로 업로드하는
              사진. 이 사진은 브라우저 내에서만 처리되며, 서버로 전송되거나
              저장되지 않습니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            3. 사진 데이터 처리
          </h2>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-900">
              중요: 사진은 서버에 저장되지 않습니다
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-800">
              <li>
                모든 사진 처리는 사용자의 브라우저(클라이언트 사이드)에서만
                이루어집니다.
              </li>
              <li>사진은 서버로 전송되지 않습니다.</li>
              <li>얼굴 인식 기술을 사용하지 않습니다.</li>
              <li>
                EXIF 메타데이터(위치, 기기 정보 등)는 처리 전 자동으로
                제거됩니다.
              </li>
              <li>
                세션 종료 또는 브라우저 닫기 시 모든 사진 데이터가 자동으로
                삭제됩니다.
              </li>
              <li>
                사진 업로드를 원하지 않는 경우 아바타 기반 드레스업 기능을
                이용하실 수 있습니다.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            4. 정보 처리 목적
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>가상 트라이온 및 드레스업 기능 제공</li>
            <li>서비스 이용 통계 분석 및 개선</li>
            <li>서비스 오류 감지 및 보안 유지</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            5. 쿠키 사용
          </h2>
          <p>
            서비스는 사용자 경험 향상을 위해 쿠키를 사용할 수 있습니다. 쿠키는
            브라우저 설정을 통해 거부하실 수 있으며, 이 경우 일부 기능 이용에
            제한이 있을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            6. 제3자 제공
          </h2>
          <p>
            수집된 정보는 제3자에게 판매, 교환 또는 임대되지 않습니다. 다만,
            다음의 경우 예외가 적용될 수 있습니다:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>법률에 의한 요구가 있는 경우</li>
            <li>사용자의 명시적 동의가 있는 경우</li>
            <li>
              서비스 운영에 필요한 분석 도구 (예: 웹 분석 서비스)를 통한 익명화된
              데이터 처리
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            7. 사용자 권리
          </h2>
          <p>사용자는 다음과 같은 권리를 행사할 수 있습니다:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>접근권:</strong> 수집된 개인정보에 대한 열람 요청
            </li>
            <li>
              <strong>정정권:</strong> 부정확한 정보의 수정 요청
            </li>
            <li>
              <strong>삭제권:</strong> 개인정보 삭제 요청
            </li>
            <li>
              <strong>처리 제한권:</strong> 특정 상황에서 정보 처리 제한 요청
            </li>
            <li>
              <strong>이동권:</strong> 정보를 구조화된 형식으로 수령 요청
            </li>
            <li>
              <strong>반대권:</strong> 정보 처리에 대한 이의 제기
            </li>
          </ul>
          <p className="mt-2">
            위 권리 행사를 원하시는 경우 아래 연락처로 문의해 주세요.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            8. 아동 보호
          </h2>
          <p>
            본 서비스는 만 13세 미만 아동의 개인정보를 의도적으로 수집하지
            않습니다. 만 13세 미만 아동이 개인정보를 제공한 사실을 인지한 경우,
            해당 정보를 즉시 삭제합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            9. 보안
          </h2>
          <p>
            서비스는 사용자 정보 보호를 위해 HTTPS 암호화 통신을 사용하며,
            사진 데이터의 클라이언트 사이드 처리를 통해 서버 측 데이터 유출
            위험을 원천적으로 차단합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            10. 방침 변경
          </h2>
          <p>
            본 방침은 관련 법률 또는 서비스 변경에 따라 수정될 수 있습니다.
            중요한 변경 사항이 있는 경우 서비스 내 공지를 통해 안내하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            11. 연락처
          </h2>
          <p>
            개인정보 처리와 관련한 문의사항이 있으시면 아래로 연락해 주세요:
          </p>
          <div className="mt-2 rounded-lg bg-slate-50 p-4">
            <p className="font-medium text-slate-800">The Royal Closet</p>
            <p className="mt-1 text-slate-600">
              이메일: privacy@theroyalcloset.app
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
