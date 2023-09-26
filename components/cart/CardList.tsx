import { FC, useContext, useEffect } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { ItemCounter } from "../ui";
import { CartContext } from "@/context";
import { ICartProduct, IOrderItem, IProduct } from "@/interfaces";
import { dbProducts } from "@/database";
import axios from "axios";
import { animalproApi } from "@/api";

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CardList: FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productosToShow = products ? products : cart;

  useEffect(() => {
    productosToShow.map(async (product) => {
      const { data } = await animalproApi.get<IProduct>(`/products/${product.slug}`)
      product.maxValue =
        data?.sizes.find((size) => size.size !== product.size)?.quantity ??
        0;
    });
  }, []);

  return (
    <>
      {productosToShow.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.size}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={product.image}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={product.maxValue}
                  updateQuantity={(value) =>
                    onNewCartQuantityValue(product as ICartProduct, value)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{" "}
                  {product.quantity > 1 ? "productos" : "producto"}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeCartProduct(product as ICartProduct)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
