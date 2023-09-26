import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";

import { FullScreenLoading } from "@/components/ui";

export default function CatPage() {
  const { products, isLoading } = useProducts("/products?species=cat");

  return (
    <ShopLayout
      title={"AnimalPro-Shop - Gatos"}
      pageDescription={"Encuentra los mejores productos de AnimalPro para gatos"}
    >
      <Typography variant="h1" component="h1">
        Gatos
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para gatos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
