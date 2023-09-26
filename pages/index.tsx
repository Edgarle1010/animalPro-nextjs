import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";
import { ProductList } from "@/components/products";

export default function Home() {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout
      title={"AnimalPro-Shop - Home"}
      pageDescription={"Encuentra los mejores productos de AnimalPro aquí"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
