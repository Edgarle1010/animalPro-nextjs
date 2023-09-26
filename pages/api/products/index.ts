import type { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "@/database";
import { Product } from "@/models";
import { IProduct } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { species = "all" } = req.query;

  let condition = {};

  if (species !== "all" && SHOP_CONSTANTS.validSpecies.includes(`${species}`)) {
    condition = { species };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select("title images price sizes slug -_id")
    .lean();
  await db.disconnect();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });

    return product;
  });

  return res.status(200).json(updatedProducts);
};
