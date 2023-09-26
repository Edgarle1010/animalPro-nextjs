import React from "react";
import NextLink from "next/link";
import { AdminLayout } from "@/components/layouts";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IProduct } from "@/interfaces";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank">
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={row.img}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "specie", headerName: "Especie" },
  { field: "type", headerName: "Tipo" },
  { field: "stock", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    specie: product.specie,
    type: product.type,
    stock: Object.values(product.sizes).reduce(
      (acc, sizeObj) => acc + sizeObj.quantity,
      0
    ),
    price: product.price,
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subTitle={"Mantenimiento de productos"}
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
        >
          Crear producto
        </Button>
      </Box>

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
