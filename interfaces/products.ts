export interface IProduct {
  _id: string;
  sku: string;
  brand: string;
  description: string;
  images: string[];
  price: number;
  sizes: { size: ISize; quantity: number }[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  specie: ISpecie[];

  createdAt: String;
  updatedAt: String;
}

export type ISpecie = "dog" | "cat" | "other";
export type ISize = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type IType =
  | "leashes-collars"
  | "transporters-travel"
  | "bowls-feeders"
  | "grooming"
  | "home"
  | "beds-blankets"
  | "antifleas-ticks"
  | "training"
  | "dental-care"
  | "cleaning-grooming"
  | "toys"
  | "clothes-accessories";
