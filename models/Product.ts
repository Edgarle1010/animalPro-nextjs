import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "@/interfaces";

const sizeSchema = new Schema(
  {
    size: {
      type: String,
      enum: ["XSS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      message: "{VALUE} no es un tamaño válido",
    },
    quantity: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    sku: { type: String, require: true, default: "" },
    brand: { type: String, require: true, default: "" },
    description: { type: String, require: true, default: "" },
    images: [{ type: String }],
    price: { type: Number, require: true, default: 0 },
    sizes: [{ type: sizeSchema, require: true, default: {} }],
    slug: { type: String, require: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, require: true, default: "" },
    type: {
      type: String,
      enum: {
        values: [
          "leashes-collars",
          "transporters-travel",
          "bowls-feeders",
          "grooming",
          "home",
          "beds-blankets",
          "antifleas-ticks",
          "training",
          "dental-care",
          "cleaning-grooming",
          "toys",
          "clothes-accessories",
        ],
        message: "{VALUE} no es un tipo válido",
      },
      default: "shirts",
    },
    species: [
      {
        type: String,
        enum: {
          values: ["dog", "cat", "other"],
          message: "{VALUE} no es una especie válida",
        },
        default: "dog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.index({ title: "text", tags: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);

export default Product;
