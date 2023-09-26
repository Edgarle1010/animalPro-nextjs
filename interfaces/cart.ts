import { ISize, ISpecie } from ".";

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    specie: ISpecie[];
    maxValue: number;
    quantity: number;
  }