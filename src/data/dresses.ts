import { Dress, Royal } from "@/types";

const diana: Royal = {
  name: "다이애나 비",
  nameEn: "Princess Diana",
  title: "웨일스 공비",
};

const kate: Royal = {
  name: "케이트 미들턴",
  nameEn: "Catherine, Princess of Wales",
  title: "웨일스 공비",
};

const elizabeth: Royal = {
  name: "엘리자베스 2세",
  nameEn: "Queen Elizabeth II",
  title: "영국 여왕",
};

export const dresses: Dress[] = [
  {
    slug: "diana-revenge-dress",
    name: "복수의 드레스",
    nameEn: "The Revenge Dress",
    royal: diana,
    designer: "Christina Stambolian",
    year: 1994,
    event: "서펜타인 갤러리 여름 파티",
    description:
      "찰스 왕세자가 TV 인터뷰에서 카밀라와의 불륜을 인정한 바로 그 날 밤, 다이애나 비가 입고 나타난 전설적인 블랙 드레스입니다. 오프숄더 디자인의 이 드레스는 '복수의 드레스'라는 별명으로 역사에 남았습니다.",
    funFact:
      "다이애나는 원래 다른 드레스를 입으려 했으나, 마지막 순간에 이 대담한 드레스로 바꿨습니다.",
    tags: ["이브닝", "블랙", "오프숄더", "미니"],
    images: {
      catalog: "/dresses/diana-revenge/catalog.svg",
      garment: "/dresses/diana-revenge/garment.svg",
      overlay: "/dresses/diana-revenge/overlay.svg",
      thumbnail: "/dresses/diana-revenge/thumbnail.svg",
    },
    category: "dress",
    era: "1990s",
  },
  {
    slug: "diana-wedding-dress",
    name: "세기의 웨딩 드레스",
    nameEn: "The Wedding Dress",
    royal: diana,
    designer: "David & Elizabeth Emanuel",
    year: 1981,
    event: "세인트 폴 대성당 결혼식",
    description:
      "7.6미터의 긴 트레인이 달린 아이보리 실크 태피터 웨딩드레스입니다. 7억 5천만 명이 TV로 시청한 '세기의 결혼식'에서 착용되었으며, 로맨틱한 퍼프 소매가 1980년대 웨딩 트렌드를 이끌었습니다.",
    funFact:
      "드레스 제작에 사용된 실크는 영국 도싯주의 양잠 농장에서 생산되었습니다.",
    tags: ["웨딩", "아이보리", "실크", "트레인"],
    images: {
      catalog: "/dresses/diana-wedding/catalog.svg",
      garment: "/dresses/diana-wedding/garment.svg",
      overlay: "/dresses/diana-wedding/overlay.svg",
      thumbnail: "/dresses/diana-wedding/thumbnail.svg",
    },
    category: "gown",
    era: "1980s",
  },
  {
    slug: "diana-travolta-dress",
    name: "트라볼타 드레스",
    nameEn: "The Travolta Dress",
    royal: diana,
    designer: "Victor Edelstein",
    year: 1985,
    event: "백악관 만찬",
    description:
      "레이건 대통령의 백악관 만찬에서 존 트라볼타와 춤을 추며 유명해진 미드나잇 블루 벨벳 드레스입니다. 오프숄더 디자인으로 다이애나의 우아함을 극대화한 작품입니다.",
    funFact:
      "이 드레스는 2019년 경매에서 약 3억 5천만 원에 낙찰되었습니다.",
    tags: ["이브닝", "벨벳", "네이비", "오프숄더"],
    images: {
      catalog: "/dresses/diana-travolta/catalog.svg",
      garment: "/dresses/diana-travolta/garment.svg",
      overlay: "/dresses/diana-travolta/overlay.svg",
      thumbnail: "/dresses/diana-travolta/thumbnail.svg",
    },
    category: "gown",
    era: "1980s",
  },
  {
    slug: "kate-engagement-dress",
    name: "약혼 발표 드레스",
    nameEn: "The Engagement Dress",
    royal: kate,
    designer: "Issa London (Daniella Helayel)",
    year: 2010,
    event: "약혼 발표 기자회견",
    description:
      "케이트 미들턴이 윌리엄 왕자와의 약혼을 발표할 때 입었던 로열 블루 저지 랩 드레스입니다. 발표 직후 완판되었으며, 이 드레스의 인기로 Issa 브랜드는 세계적 명성을 얻었습니다.",
    funFact:
      "이 드레스는 약 500달러 정도였으며, 발표 후 몇 시간 만에 전 세계에서 품절되었습니다.",
    tags: ["데이웨어", "블루", "랩드레스", "저지"],
    images: {
      catalog: "/dresses/kate-engagement/catalog.svg",
      garment: "/dresses/kate-engagement/garment.svg",
      overlay: "/dresses/kate-engagement/overlay.svg",
      thumbnail: "/dresses/kate-engagement/thumbnail.svg",
    },
    category: "dress",
    era: "2010s",
  },
  {
    slug: "kate-wedding-dress",
    name: "로열 웨딩 드레스",
    nameEn: "The Royal Wedding Dress",
    royal: kate,
    designer: "Sarah Burton (Alexander McQueen)",
    year: 2011,
    event: "웨스트민스터 사원 결혼식",
    description:
      "레이스 소매와 V넥 네크라인이 특징인 새틴 가자르 웨딩드레스입니다. 전통과 현대적 감각을 완벽하게 조화시킨 이 드레스는 23억 명이 시청한 결혼식에서 전 세계를 매료시켰습니다.",
    funFact:
      "드레스의 레이스 패턴에는 장미, 엉겅퀴, 수선화, 클로버가 포함되어 영국의 4개 지역을 상징합니다.",
    tags: ["웨딩", "화이트", "레이스", "새틴"],
    images: {
      catalog: "/dresses/kate-wedding/catalog.svg",
      garment: "/dresses/kate-wedding/garment.svg",
      overlay: "/dresses/kate-wedding/overlay.svg",
      thumbnail: "/dresses/kate-wedding/thumbnail.svg",
    },
    category: "gown",
    era: "2010s",
  },
  {
    slug: "kate-red-korea",
    name: "한국 국빈 방문 레드 드레스",
    nameEn: "Korea State Visit Red Dress",
    royal: kate,
    designer: "Catherine Walker",
    year: 2023,
    event: "한국 국빈 방문 만찬",
    description:
      "케이트 미들턴이 한국 국빈 방문 중 착용한 레드 캐서린 워커 드레스입니다. 다이애나 비가 즐겨 입던 캐서린 워커 디자인에 대한 오마주이기도 합니다.",
    tags: ["이브닝", "레드", "A라인"],
    images: {
      catalog: "/dresses/kate-red-korea/catalog.svg",
      garment: "/dresses/kate-red-korea/garment.svg",
      overlay: "/dresses/kate-red-korea/overlay.svg",
      thumbnail: "/dresses/kate-red-korea/thumbnail.svg",
    },
    category: "dress",
    era: "2020s",
  },
  {
    slug: "elizabeth-coronation",
    name: "대관식 드레스",
    nameEn: "The Coronation Dress",
    royal: elizabeth,
    designer: "Norman Hartnell",
    year: 1953,
    event: "웨스트민스터 사원 대관식",
    description:
      "영연방 국가들의 꽃무늬 자수가 수놓아진 화이트 새틴 대관식 드레스입니다. 장미, 엉겅퀴, 샴록, 리크 등 각 나라를 상징하는 꽃이 금실과 은실로 정교하게 수놓아져 있습니다.",
    funFact:
      "엘리자베스 여왕은 9개의 디자인 시안을 검토한 후 이 디자인을 선택했습니다.",
    tags: ["대관식", "화이트", "새틴", "자수"],
    images: {
      catalog: "/dresses/elizabeth-coronation/catalog.svg",
      garment: "/dresses/elizabeth-coronation/garment.svg",
      overlay: "/dresses/elizabeth-coronation/overlay.svg",
      thumbnail: "/dresses/elizabeth-coronation/thumbnail.svg",
    },
    category: "gown",
    era: "1950s" as Dress["era"],
  },
];

export const royals = [diana, kate, elizabeth];

export const eras = [
  "1950s",
  "1980s",
  "1990s",
  "2000s",
  "2010s",
  "2020s",
] as const;

export function getDressBySlug(slug: string): Dress | undefined {
  return dresses.find((d) => d.slug === slug);
}

export function getDressesByRoyal(royalNameEn: string): Dress[] {
  return dresses.filter((d) => d.royal.nameEn === royalNameEn);
}

export function getDressesByEra(era: string): Dress[] {
  return dresses.filter((d) => d.era === era);
}
