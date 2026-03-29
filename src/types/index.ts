export interface Royal {
  name: string;
  nameEn: string;
  title: string;
}

export interface DressImages {
  catalog: string;
  garment: string;
  overlay: string;
  thumbnail: string;
}

export type ItemCategory = "dress" | "gown" | "suit" | "tiara" | "necklace" | "shoes" | "bag" | "gloves" | "earrings";
export type Era = "1700s" | "1800s" | "1950s" | "1980s" | "1990s" | "2000s" | "2010s" | "2020s";
export type ItemType = "clothing" | "accessory";

export interface Dress {
  slug: string;
  name: string;
  nameEn: string;
  royal: Royal;
  designer: string;
  year: number;
  event: string;
  description: string;
  funFact?: string;
  tags: string[];
  images: DressImages;
  category: ItemCategory;
  era: Era;
  itemType: ItemType;
  /** Canvas placement hint */
  canvasPosition?: { top: number; left: number; width: number; height: number };
}

export interface TryOnRequest {
  personImage: string;
  dressSlug: string;
}

export interface TryOnResult {
  resultImageUrl: string;
  dressSlug: string;
  timestamp: number;
}
