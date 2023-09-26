import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";

import { FullScreenLoading } from "@/components/ui";

export default function DogPage() {
  const { products, isLoading } = useProducts("/products?species=other");

  return (
    <ShopLayout
      title={"AnimalPro-Shop - Otras especies"}
      pageDescription={"Encuentra los mejores productos de AnimalPro para otras especies"}
    >
      <Typography variant="h1" component="h1">
        Otras especies
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para otras especies
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
