import { Dress, Royal, ItemType } from "@/types";

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

const daphne: Royal = {
  name: "다프네",
  nameEn: "Daphne",
  title: "헤이스팅스 공작부인",
};

const queenCharlotte: Royal = {
  name: "샬럿 여왕",
  nameEn: "Queen Charlotte",
  title: "영국 여왕 (리젠시)",
};

const penelope: Royal = {
  name: "페넬로페",
  nameEn: "Penelope",
  title: "리젠시 시대 사교계",
};

const marieAntoinette: Royal = {
  name: "마리 앙투아네트",
  nameEn: "Marie Antoinette",
  title: "프랑스 왕비",
};

const meghan: Royal = {
  name: "윈저 모던",
  nameEn: "Windsor Modern",
  title: "서섹스 공작부인 스타일",
};

const graceKelly: Royal = {
  name: "모나코 클래식",
  nameEn: "Monaco Classic",
  title: "모나코 공비 스타일",
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
      catalog: "/dresses/diana-revenge/catalog.png",
      garment: "/dresses/diana-revenge/garment.svg",
      overlay: "/dresses/diana-revenge/overlay.svg",
      thumbnail: "/dresses/diana-revenge/catalog.png",
    },
    category: "dress",
    itemType: "clothing",
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
      catalog: "/dresses/diana-wedding/catalog.png",
      garment: "/dresses/diana-wedding/garment.svg",
      overlay: "/dresses/diana-wedding/overlay.svg",
      thumbnail: "/dresses/diana-wedding/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
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
      catalog: "/dresses/diana-travolta/catalog.png",
      garment: "/dresses/diana-travolta/garment.svg",
      overlay: "/dresses/diana-travolta/overlay.svg",
      thumbnail: "/dresses/diana-travolta/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
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
      catalog: "/dresses/kate-engagement/catalog.png",
      garment: "/dresses/kate-engagement/garment.svg",
      overlay: "/dresses/kate-engagement/overlay.svg",
      thumbnail: "/dresses/kate-engagement/catalog.png",
    },
    category: "dress",
    itemType: "clothing",
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
      catalog: "/dresses/kate-wedding/catalog.png",
      garment: "/dresses/kate-wedding/garment.svg",
      overlay: "/dresses/kate-wedding/overlay.svg",
      thumbnail: "/dresses/kate-wedding/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
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
      catalog: "/dresses/kate-red-korea/catalog.png",
      garment: "/dresses/kate-red-korea/garment.svg",
      overlay: "/dresses/kate-red-korea/overlay.svg",
      thumbnail: "/dresses/kate-red-korea/catalog.png",
    },
    category: "dress",
    itemType: "clothing",
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
      catalog: "/dresses/elizabeth-coronation/catalog.png",
      garment: "/dresses/elizabeth-coronation/garment.svg",
      overlay: "/dresses/elizabeth-coronation/overlay.svg",
      thumbnail: "/dresses/elizabeth-coronation/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
    era: "1950s" as Dress["era"],
  },
  // === Accessories ===
  {
    slug: "spencer-tiara",
    name: "스펜서 티아라",
    nameEn: "The Spencer Tiara",
    royal: diana,
    designer: "Garrard",
    year: 1981,
    event: "다이애나 비 결혼식",
    description:
      "스펜서 가문 대대로 내려온 티아라로, 다이애나 비가 결혼식에서 착용하여 전 세계적으로 유명해졌습니다. 영국 왕실이 아닌 스펜서 가문의 소유입니다.",
    funFact:
      "이 티아라는 원래 1930년대에 제작되었으며, 다이애나의 두 언니도 결혼식에서 착용했습니다.",
    tags: ["티아라", "다이아몬드", "결혼식", "스펜서 가문"],
    images: {
      catalog: "/dresses/spencer-tiara/catalog.png",
      garment: "/dresses/spencer-tiara/garment.svg",
      overlay: "/dresses/spencer-tiara/overlay.svg",
      thumbnail: "/dresses/spencer-tiara/catalog.png",
    },
    category: "tiara",
    itemType: "accessory",
    era: "1980s",
    canvasPosition: { top: 20, left: 195, width: 110, height: 50 },
  },
  {
    slug: "cambridge-lovers-knot-tiara",
    name: "캠브리지 러버스 노트 티아라",
    nameEn: "Cambridge Lover's Knot Tiara",
    royal: kate,
    designer: "Garrard",
    year: 2015,
    event: "국빈 만찬",
    description:
      "1914년 메리 여왕을 위해 제작된 티아라로, 다이애나 비가 자주 착용했으며 현재는 케이트 미들턴이 주요 행사에서 착용합니다. 진주와 다이아몬드로 장식되어 있습니다.",
    funFact:
      "다이애나는 이 티아라가 무거워서 두통이 생긴다고 말한 적이 있습니다.",
    tags: ["티아라", "진주", "다이아몬드", "국빈 만찬"],
    images: {
      catalog: "/dresses/lovers-knot-tiara/catalog.png",
      garment: "/dresses/lovers-knot-tiara/garment.svg",
      overlay: "/dresses/lovers-knot-tiara/overlay.svg",
      thumbnail: "/dresses/lovers-knot-tiara/catalog.png",
    },
    category: "tiara",
    itemType: "accessory",
    era: "2010s",
    canvasPosition: { top: 20, left: 195, width: 110, height: 50 },
  },
  {
    slug: "diana-pearl-choker",
    name: "다이애나 진주 초커",
    nameEn: "Diana's Pearl Choker",
    royal: diana,
    designer: "Unknown (Royal Collection)",
    year: 1994,
    event: "다양한 공식 행사",
    description:
      "다이애나 비의 시그니처 악세서리 중 하나로, 여러 줄의 진주로 이루어진 초커 목걸이입니다. 사파이어 브로치를 중앙에 장식하여 착용하기도 했습니다.",
    funFact:
      "원래 엘리자베스 여왕이 선물한 브로치를 초커 목걸이의 중앙 장식으로 재활용했습니다.",
    tags: ["목걸이", "진주", "초커", "사파이어"],
    images: {
      catalog: "/dresses/diana-pearl-choker/catalog.png",
      garment: "/dresses/diana-pearl-choker/garment.svg",
      overlay: "/dresses/diana-pearl-choker/overlay.svg",
      thumbnail: "/dresses/diana-pearl-choker/catalog.png",
    },
    category: "necklace",
    itemType: "accessory",
    era: "1990s",
    canvasPosition: { top: 140, left: 205, width: 90, height: 30 },
  },
  {
    slug: "kate-sapphire-earrings",
    name: "사파이어 드롭 이어링",
    nameEn: "Sapphire Drop Earrings",
    royal: kate,
    designer: "Unknown (Royal Collection)",
    year: 2011,
    event: "다양한 공식 행사",
    description:
      "다이애나 비의 유명한 사파이어 약혼 반지와 세트인 귀걸이입니다. 케이트 미들턴이 물려받아 다양한 공식 행사에서 착용합니다.",
    tags: ["귀걸이", "사파이어", "다이아몬드"],
    images: {
      catalog: "/dresses/kate-sapphire-earrings/catalog.png",
      garment: "/dresses/kate-sapphire-earrings/garment.svg",
      overlay: "/dresses/kate-sapphire-earrings/overlay.svg",
      thumbnail: "/dresses/kate-sapphire-earrings/catalog.png",
    },
    category: "earrings",
    itemType: "accessory",
    era: "2010s",
    canvasPosition: { top: 75, left: 185, width: 130, height: 30 },
  },
  {
    slug: "diana-clutch-bag",
    name: "다이애나 클러치백",
    nameEn: "Diana's Clutch Bag",
    royal: diana,
    designer: "Anya Hindmarch",
    year: 1990,
    event: "공식 행사",
    description:
      "다이애나 비가 차에서 내릴 때 데콜테를 가리기 위해 클러치백을 사용한 것으로 유명합니다. 이 습관은 '클리비지 클러치'라는 별명을 얻었습니다.",
    funFact:
      "다이애나의 클러치백 사용법은 이후 왕실 에티켓의 하나로 자리잡았습니다.",
    tags: ["백", "클러치", "가죽"],
    images: {
      catalog: "/dresses/diana-clutch/catalog.png",
      garment: "/dresses/diana-clutch/garment.svg",
      overlay: "/dresses/diana-clutch/overlay.svg",
      thumbnail: "/dresses/diana-clutch/catalog.png",
    },
    category: "bag",
    itemType: "accessory",
    era: "1990s",
    canvasPosition: { top: 320, left: 320, width: 60, height: 40 },
  },
  {
    slug: "elizabeth-coronation-gloves",
    name: "대관식 장갑",
    nameEn: "Coronation Gloves",
    royal: elizabeth,
    designer: "Fownes",
    year: 1953,
    event: "웨스트민스터 사원 대관식",
    description:
      "엘리자베스 2세의 대관식에서 착용한 화이트 실크 장갑입니다. 손등에 정교한 자수가 수놓아져 있으며, 대관식의 격식을 상징합니다.",
    tags: ["장갑", "화이트", "실크", "대관식"],
    images: {
      catalog: "/dresses/elizabeth-gloves/catalog.png",
      garment: "/dresses/elizabeth-gloves/garment.svg",
      overlay: "/dresses/elizabeth-gloves/overlay.svg",
      thumbnail: "/dresses/elizabeth-gloves/catalog.png",
    },
    category: "gloves",
    itemType: "accessory",
    era: "1950s" as Dress["era"],
    canvasPosition: { top: 340, left: 120, width: 60, height: 40 },
  },
  {
    slug: "kate-jimmy-choo-pumps",
    name: "지미 추 누드 펌프스",
    nameEn: "Jimmy Choo Nude Pumps",
    royal: kate,
    designer: "Jimmy Choo",
    year: 2011,
    event: "다양한 공식 행사",
    description:
      "케이트 미들턴의 시그니처 슈즈로, 거의 모든 공식 행사에서 착용하는 누드 컬러 스틸레토 펌프스입니다. 심플하면서도 우아한 스타일의 상징입니다.",
    tags: ["구두", "누드", "스틸레토", "펌프스"],
    images: {
      catalog: "/dresses/kate-pumps/catalog.png",
      garment: "/dresses/kate-pumps/garment.svg",
      overlay: "/dresses/kate-pumps/overlay.svg",
      thumbnail: "/dresses/kate-pumps/catalog.png",
    },
    category: "shoes",
    itemType: "accessory",
    era: "2010s",
    canvasPosition: { top: 610, left: 190, width: 120, height: 50 },
  },
  // === Regency Era Collection ===
  {
    slug: "daphne-wedding-gown",
    name: "다프네 웨딩 가운",
    nameEn: "Daphne's Wedding Gown",
    royal: daphne,
    designer: "Ellen Mirojnick (의상 디자인)",
    year: 2020,
    event: "리젠시 시대 드라마 - 헤이스팅스 공작과의 결혼식",
    description:
      "은색 자수가 수놓아진 아이보리 실크 가운으로, 리젠시 시대의 엠파이어 라인 실루엣이 특징입니다. 시즌1의 가장 아이코닉한 의상으로 로맨틱한 분위기를 완벽하게 표현했습니다.",
    funFact:
      "이 드레스는 제작에 약 3주가 걸렸으며, 섬세한 레이스와 은사 자수가 하나하나 수작업으로 완성되었습니다.",
    tags: ["웨딩", "리젠시", "아이보리", "엠파이어라인"],
    images: {
      catalog: "/dresses/daphne-wedding/catalog.png",
      garment: "/dresses/daphne-wedding/garment.svg",
      overlay: "/dresses/daphne-wedding/overlay.svg",
      thumbnail: "/dresses/daphne-wedding/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
    era: "1800s",
  },
  {
    slug: "daphne-blue-ball-gown",
    name: "다프네 블루 볼가운",
    nameEn: "Daphne's Blue Ball Gown",
    royal: daphne,
    designer: "Ellen Mirojnick (의상 디자인)",
    year: 2020,
    event: "리젠시 시대 드라마 - 첫 무도회",
    description:
      "다프네가 사교계에 데뷔하는 첫 무도회에서 입은 파스텔 블루 볼가운입니다. 리젠시 시대 특유의 하이 웨이스트와 퍼프 슬리브가 특징이며, 왕비에게 '올해의 다이아몬드'로 선정받는 장면을 장식했습니다.",
    tags: ["볼가운", "파스텔블루", "리젠시", "무도회"],
    images: {
      catalog: "/dresses/daphne-blue-ball/catalog.png",
      garment: "/dresses/daphne-blue-ball/garment.svg",
      overlay: "/dresses/daphne-blue-ball/overlay.svg",
      thumbnail: "/dresses/daphne-blue-ball/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
    era: "1800s",
  },
  {
    slug: "queen-charlotte-gold-gown",
    name: "샬럿 여왕 골드 가운",
    nameEn: "Queen Charlotte's Gold Gown",
    royal: queenCharlotte,
    designer: "Lyn Paolo (의상 디자인)",
    year: 2023,
    event: "리젠시 시대 드라마 - 대관식",
    description:
      "샬럿 여왕의 화려한 골드 가운으로, 정교한 금사 자수와 보석 장식이 왕실의 위엄을 표현합니다. 거대한 스커트와 코르셋이 18세기 궁정 패션을 재현합니다.",
    funFact:
      "이 의상은 실제로 7미터 이상의 원단이 사용되었으며, 제작비만 수천만 원에 달합니다.",
    tags: ["골드", "왕실", "코르셋", "18세기"],
    images: {
      catalog: "/dresses/charlotte-gold/catalog.png",
      garment: "/dresses/charlotte-gold/garment.svg",
      overlay: "/dresses/charlotte-gold/overlay.svg",
      thumbnail: "/dresses/charlotte-gold/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
    era: "1800s",
  },
  {
    slug: "penelope-yellow-dress",
    name: "페넬로페 옐로우 드레스",
    nameEn: "Penelope's Yellow Dress",
    royal: penelope,
    designer: "Ellen Mirojnick (의상 디자인)",
    year: 2020,
    event: "리젠시 시대 드라마 - 페더링턴 가문 무도회",
    description:
      "페넬로페의 시그니처 옐로우 드레스로, 페더링턴 가문의 화려하고 과장된 스타일을 보여줍니다. 시즌이 진행될수록 페넬로페의 드레스가 세련되어지는 것이 의상 디자인의 핵심 포인트입니다.",
    tags: ["옐로우", "리젠시", "무도회", "페더링턴"],
    images: {
      catalog: "/dresses/penelope-yellow/catalog.png",
      garment: "/dresses/penelope-yellow/garment.svg",
      overlay: "/dresses/penelope-yellow/overlay.svg",
      thumbnail: "/dresses/penelope-yellow/catalog.png",
    },
    category: "dress",
    itemType: "clothing",
    era: "1800s",
  },
  // === Marie Antoinette / Historical ===
  {
    slug: "marie-antoinette-robe",
    name: "마리 앙투아네트 로브 아 라 프랑세즈",
    nameEn: "Robe à la Française",
    royal: marieAntoinette,
    designer: "Rose Bertin",
    year: 1780,
    event: "베르사유 궁전 무도회",
    description:
      "18세기 프랑스 궁정의 대표적인 드레스 형태인 로브 아 라 프랑세즈입니다. 파니에(속치마 틀)로 양옆을 크게 부풀린 실루엣과 풍성한 레이스 장식이 로코코 시대의 화려함을 상징합니다.",
    funFact:
      "마리 앙투아네트의 의상비는 당시 프랑스 국가 예산의 상당 부분을 차지했다고 전해집니다.",
    tags: ["로코코", "파니에", "레이스", "베르사유"],
    images: {
      catalog: "/dresses/marie-robe/catalog.png",
      garment: "/dresses/marie-robe/garment.svg",
      overlay: "/dresses/marie-robe/overlay.svg",
      thumbnail: "/dresses/marie-robe/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
    era: "1700s",
  },
  // === Jewelry / 보석 ===
  {
    slug: "diana-sapphire-ring",
    name: "다이애나 사파이어 약혼 반지",
    nameEn: "Diana's Sapphire Engagement Ring",
    royal: diana,
    designer: "Garrard",
    year: 1981,
    event: "약혼 발표",
    description:
      "12캐럿 실론 사파이어를 14개의 다이아몬드가 둘러싼 클러스터 링입니다. 다이애나 비가 카탈로그에서 직접 선택한 것으로 유명하며, 현재는 케이트 미들턴의 약혼 반지로 이어졌습니다.",
    funFact:
      "당시 왕실에서 기성 카탈로그 제품을 선택한 것이 논란이 되었으나, 이제는 세계에서 가장 유명한 약혼 반지가 되었습니다.",
    tags: ["반지", "사파이어", "다이아몬드", "약혼"],
    images: {
      catalog: "/dresses/diana-sapphire-ring/catalog.png",
      garment: "/dresses/diana-sapphire-ring/garment.svg",
      overlay: "/dresses/diana-sapphire-ring/overlay.svg",
      thumbnail: "/dresses/diana-sapphire-ring/catalog.png",
    },
    category: "necklace",
    itemType: "accessory",
    era: "1980s",
    canvasPosition: { top: 300, left: 120, width: 40, height: 30 },
  },
  {
    slug: "elizabeth-diamond-diadem",
    name: "다이아몬드 다이어뎀",
    nameEn: "Diamond Diadem",
    royal: elizabeth,
    designer: "Rundell, Bridge & Rundell",
    year: 1953,
    event: "대관식 행렬",
    description:
      "1820년 조지 4세를 위해 제작된 다이어뎀으로, 1,333개의 다이아몬드와 진주로 장식되어 있습니다. 영국 우표와 화폐에 엘리자베스 여왕이 착용한 모습으로 가장 많이 알려진 왕관입니다.",
    funFact:
      "이 다이어뎀은 대관식 자체가 아닌 대관식으로 가는 행렬에서 착용됩니다.",
    tags: ["다이어뎀", "다이아몬드", "진주", "왕관"],
    images: {
      catalog: "/dresses/elizabeth-diadem/catalog.png",
      garment: "/dresses/elizabeth-diadem/garment.svg",
      overlay: "/dresses/elizabeth-diadem/overlay.svg",
      thumbnail: "/dresses/elizabeth-diadem/catalog.png",
    },
    category: "tiara",
    itemType: "accessory",
    era: "1950s" as Dress["era"],
    canvasPosition: { top: 15, left: 195, width: 110, height: 50 },
  },
  {
    slug: "marie-diamond-necklace",
    name: "마리 앙투아네트 다이아몬드 목걸이",
    nameEn: "Marie Antoinette's Diamond Necklace",
    royal: marieAntoinette,
    designer: "Boehmer & Bassenge",
    year: 1785,
    event: "목걸이 사건 (L'affaire du collier)",
    description:
      "647개의 다이아몬드, 총 2,800캐럿으로 이루어진 전설적인 목걸이입니다. '목걸이 사건'으로 프랑스 혁명의 도화선 중 하나가 되었으며, 역사상 가장 유명한 보석 스캔들의 중심에 있습니다.",
    funFact:
      "실제로 마리 앙투아네트는 이 목걸이를 구매하지 않았으나, 사기꾼들이 그녀의 이름을 도용하여 구입한 것이 거대한 스캔들로 번졌습니다.",
    tags: ["목걸이", "다이아몬드", "스캔들", "혁명"],
    images: {
      catalog: "/dresses/marie-necklace/catalog.png",
      garment: "/dresses/marie-necklace/garment.svg",
      overlay: "/dresses/marie-necklace/overlay.svg",
      thumbnail: "/dresses/marie-necklace/catalog.png",
    },
    category: "necklace",
    itemType: "accessory",
    era: "1700s",
    canvasPosition: { top: 140, left: 200, width: 100, height: 35 },
  },
  {
    slug: "charlotte-tiara",
    name: "샬럿 여왕 다이아몬드 티아라",
    nameEn: "Queen Charlotte's Tiara",
    royal: queenCharlotte,
    designer: "리젠시 드라마 소품팀",
    year: 2023,
    event: "리젠시 시대 드라마 - 궁정 행사",
    description:
      "브리저튼 시리즈에서 샬럿 여왕이 착용한 화려한 대형 티아라입니다. 높이 솟은 디자인에 수백 개의 크리스탈이 장식되어 있으며, 여왕의 권위와 위엄을 상징합니다.",
    tags: ["티아라", "크리스탈", "리젠시", "왕관"],
    images: {
      catalog: "/dresses/charlotte-tiara/catalog.png",
      garment: "/dresses/charlotte-tiara/garment.svg",
      overlay: "/dresses/charlotte-tiara/overlay.svg",
      thumbnail: "/dresses/charlotte-tiara/catalog.png",
    },
    category: "tiara",
    itemType: "accessory",
    era: "1800s",
    canvasPosition: { top: 10, left: 190, width: 120, height: 55 },
  },
  // === Windsor Modern Collection ===
  {
    slug: "meghan-givenchy-wedding",
    name: "지방시 웨딩 드레스",
    nameEn: "Givenchy Wedding Dress",
    royal: meghan,
    designer: "Clare Waight Keller (Givenchy)",
    year: 2018,
    event: "세인트 조지 채플 결혼식",
    description:
      "메건 마클이 해리 왕자와의 결혼식에서 착용한 미니멀한 보트넥 실크 카디 웨딩드레스입니다. 5미터 길이의 실크 튤 베일에는 영연방 53개국을 상징하는 꽃이 수놓아져 있습니다.",
    funFact:
      "베일 자수 작업에만 500시간 이상이 소요되었으며, 메건이 직접 영연방 국가별 꽃을 선정했습니다.",
    tags: ["웨딩", "화이트", "미니멀", "보트넥"],
    images: {
      catalog: "/dresses/meghan-givenchy-wedding/catalog.png",
      garment: "/dresses/meghan-givenchy-wedding/garment.svg",
      overlay: "/dresses/meghan-givenchy-wedding/overlay.svg",
      thumbnail: "/dresses/meghan-givenchy-wedding/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
    era: "2010s",
  },
  {
    slug: "meghan-stella-reception",
    name: "스텔라 매카트니 리셉션 드레스",
    nameEn: "Stella McCartney Reception Dress",
    royal: meghan,
    designer: "Stella McCartney",
    year: 2018,
    event: "결혼식 리셉션",
    description:
      "결혼식 리셉션에서 착용한 릴리 화이트 홀터넥 드레스입니다. 등이 깊게 파인 실크 크레이프 소재로 모던하고 할리우드적인 글래머를 보여주었습니다. 아쿠아마린 칵테일 링과 함께 착용했습니다.",
    funFact:
      "이 드레스의 레플리카 버전이 스텔라 매카트니 웹사이트에서 한정 판매되어 즉시 완판되었습니다.",
    tags: ["리셉션", "화이트", "홀터넥", "실크"],
    images: {
      catalog: "/dresses/meghan-stella-reception/catalog.png",
      garment: "/dresses/meghan-stella-reception/garment.svg",
      overlay: "/dresses/meghan-stella-reception/overlay.svg",
      thumbnail: "/dresses/meghan-stella-reception/catalog.png",
    },
    category: "dress",
    itemType: "clothing",
    era: "2010s",
  },
  {
    slug: "meghan-aquamarine-ring",
    name: "다이애나 아쿠아마린 링",
    nameEn: "Diana's Aquamarine Ring",
    royal: meghan,
    designer: "Asprey",
    year: 2018,
    event: "결혼식 리셉션",
    description:
      "다이애나 비가 생전에 즐겨 착용하던 대형 아쿠아마린 칵테일 링입니다. 메건이 결혼식 리셉션에서 착용하며 시어머니에 대한 경의를 표했습니다. 에메랄드 컷 아쿠아마린에 다이아몬드 세팅이 특징입니다.",
    funFact:
      "다이애나는 1996년 시드니를 방문할 때 이 반지를 착용했으며, 메건이 이를 이어받아 착용했습니다.",
    tags: ["반지", "아쿠아마린", "다이아몬드", "칵테일링"],
    images: {
      catalog: "/dresses/meghan-aquamarine-ring/catalog.png",
      garment: "/dresses/meghan-aquamarine-ring/garment.svg",
      overlay: "/dresses/meghan-aquamarine-ring/overlay.svg",
      thumbnail: "/dresses/meghan-aquamarine-ring/catalog.png",
    },
    category: "necklace",
    itemType: "accessory",
    era: "2010s",
    canvasPosition: { top: 300, left: 120, width: 40, height: 30 },
  },
  {
    slug: "meghan-queen-mary-tiara",
    name: "퀸 메리 다이아몬드 반다 티아라",
    nameEn: "Queen Mary Diamond Bandeau Tiara",
    royal: meghan,
    designer: "Garrard (1932 리세팅)",
    year: 2018,
    event: "세인트 조지 채플 결혼식",
    description:
      "1893년 제작된 다이아몬드 브로치를 중심으로 플렉서블 반다 밴드에 세팅한 티아라입니다. 엘리자베스 여왕이 메건에게 대여해주었으며, 센터의 10개 다이아몬드가 특징적인 아르데코 디자인입니다.",
    funFact:
      "이 티아라는 수십 년간 전시되지 않아 대중에게 거의 알려지지 않았다가 메건의 결혼식으로 세계적 주목을 받았습니다.",
    tags: ["티아라", "다이아몬드", "아르데코", "반다"],
    images: {
      catalog: "/dresses/meghan-queen-mary-tiara/catalog.png",
      garment: "/dresses/meghan-queen-mary-tiara/garment.svg",
      overlay: "/dresses/meghan-queen-mary-tiara/overlay.svg",
      thumbnail: "/dresses/meghan-queen-mary-tiara/catalog.png",
    },
    category: "tiara",
    itemType: "accessory",
    era: "2010s",
    canvasPosition: { top: 20, left: 195, width: 110, height: 50 },
  },
  // === Monaco Classic Collection ===
  {
    slug: "grace-kelly-wedding-dress",
    name: "그레이스 켈리 웨딩 드레스",
    nameEn: "Grace Kelly Wedding Dress",
    royal: graceKelly,
    designer: "Helen Rose (MGM)",
    year: 1956,
    event: "모나코 대성당 결혼식",
    description:
      "할리우드 의상 디자이너 헬렌 로즈가 제작한 웨딩드레스로, 125년 된 브뤼셀 로즈 포인트 레이스가 사용되었습니다. 하이넥, 긴 소매, 풀스커트의 클래식한 실루엣은 이후 모든 로열 웨딩드레스의 표본이 되었습니다.",
    funFact:
      "MGM 스튜디오가 웨딩 선물로 이 드레스를 제작해주었으며, 현재 필라델피아 미술관에 전시되어 있습니다.",
    tags: ["웨딩", "레이스", "아이보리", "하이넥"],
    images: {
      catalog: "/dresses/grace-kelly-wedding/catalog.png",
      garment: "/dresses/grace-kelly-wedding/garment.svg",
      overlay: "/dresses/grace-kelly-wedding/overlay.svg",
      thumbnail: "/dresses/grace-kelly-wedding/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
    era: "1950s" as Dress["era"],
  },
  {
    slug: "grace-kelly-blue-chiffon",
    name: "블루 시폰 이브닝 가운",
    nameEn: "Blue Chiffon Evening Gown",
    royal: graceKelly,
    designer: "Edith Head",
    year: 1955,
    event: "나잡히지 않는 도둑 (To Catch a Thief) 촬영",
    description:
      "히치콕 영화 '나잡히지 않는 도둑'에서 착용한 아이스 블루 시폰 가운입니다. 프렌치 리비에라의 불꽃놀이 장면에서 입은 이 드레스는 그레이스 켈리의 우아함을 상징하는 가장 유명한 영화 의상 중 하나입니다.",
    funFact:
      "이 영화 촬영 중 그레이스 켈리는 모나코의 레니에 3세 대공을 만났으며, 이듬해 결혼했습니다.",
    tags: ["이브닝", "블루", "시폰", "할리우드"],
    images: {
      catalog: "/dresses/grace-kelly-blue-chiffon/catalog.png",
      garment: "/dresses/grace-kelly-blue-chiffon/garment.svg",
      overlay: "/dresses/grace-kelly-blue-chiffon/overlay.svg",
      thumbnail: "/dresses/grace-kelly-blue-chiffon/catalog.png",
    },
    category: "gown",
    itemType: "clothing",
    era: "1950s" as Dress["era"],
  },
  {
    slug: "grace-kelly-hermes-bag",
    name: "에르메스 켈리 백",
    nameEn: "Hermès Kelly Bag",
    royal: graceKelly,
    designer: "Hermès",
    year: 1956,
    event: "파파라치 사진 (임신 은폐)",
    description:
      "그레이스 켈리가 임신 초기 배를 가리기 위해 에르메스 가방을 사용한 사진이 라이프지에 실리면서, 이 가방은 '켈리 백'이라는 이름을 얻었습니다. 원래 1935년에 디자인된 'Sac à dépêches'가 그녀 덕분에 세계에서 가장 유명한 핸드백이 되었습니다.",
    funFact:
      "현재 빈티지 켈리 백은 상태와 소재에 따라 수천만 원에서 수억 원에 거래됩니다.",
    tags: ["백", "에르메스", "가죽", "아이코닉"],
    images: {
      catalog: "/dresses/grace-kelly-hermes/catalog.png",
      garment: "/dresses/grace-kelly-hermes/garment.svg",
      overlay: "/dresses/grace-kelly-hermes/overlay.svg",
      thumbnail: "/dresses/grace-kelly-hermes/catalog.png",
    },
    category: "bag",
    itemType: "accessory",
    era: "1950s" as Dress["era"],
    canvasPosition: { top: 320, left: 320, width: 60, height: 50 },
  },
  {
    slug: "kate-cartier-halo-tiara",
    name: "카르티에 할로 티아라",
    nameEn: "Cartier Halo Tiara",
    royal: kate,
    designer: "Cartier",
    year: 2011,
    event: "웨스트민스터 사원 결혼식",
    description:
      "1936년 조지 6세가 왕비를 위해 카르티에에 의뢰하여 제작한 티아라입니다. 739개의 브릴리언트 컷 다이아몬드와 149개의 바게트 컷 다이아몬드가 세팅되어 있으며, 케이트 미들턴이 결혼식에서 착용하여 전 세계를 매료시켰습니다.",
    funFact:
      "엘리자베스 2세가 18번째 생일에 아버지로부터 이 티아라를 선물받았습니다.",
    tags: ["티아라", "다이아몬드", "카르티에", "결혼식"],
    images: {
      catalog: "/dresses/kate-cartier-halo/catalog.png",
      garment: "/dresses/kate-cartier-halo/garment.svg",
      overlay: "/dresses/kate-cartier-halo/overlay.svg",
      thumbnail: "/dresses/kate-cartier-halo/catalog.png",
    },
    category: "tiara",
    itemType: "accessory",
    era: "2010s",
    canvasPosition: { top: 20, left: 195, width: 110, height: 50 },
  },
];

export const royals = [diana, kate, elizabeth, daphne, queenCharlotte, penelope, marieAntoinette, meghan, graceKelly];

export const eras = [
  "1700s",
  "1800s",
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

export function getClothing(): Dress[] {
  return dresses.filter((d) => d.itemType === "clothing");
}

export function getAccessories(): Dress[] {
  return dresses.filter((d) => d.itemType === "accessory");
}

export function getItemsByCategory(category: string): Dress[] {
  return dresses.filter((d) => d.category === category);
}
