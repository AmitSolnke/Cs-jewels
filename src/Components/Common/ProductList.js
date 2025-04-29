import { Grid, Skeleton, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products = [], isLoading = false }) => {
  const navigate = useNavigate();

  const skeletonArray = Array.from({ length: 12 }); 

  return (
    <Grid
      sx={{ display: "flex", justifyContent: "center" }}
      container
      spacing={1}
      className="p-3 product-item-wrapper"
    >
      {isLoading
        ? skeletonArray.map((_, index) => (
            <Grid item key={index} md={4} className="product-item-card">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: "8px" }}
              />
            </Grid>
          ))
        : products?.length > 0
        ? products.map((product, key) => (
            <Grid
              item
              key={key}
              md={4}
              style={{ cursor: "pointer" }}
              className="product-item-card"
              onClick={() =>
                navigate("/product-details/" + product.product_id)
              }
            >
              <img
                src={product.image_path}
                alt="product"
                className="image"
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <div className="text">{product.name}</div>
            </Grid>
          ))
        : (
          <Box width="100%" textAlign="center" mt={2}>
            <div className="no-data text-center">Products not found</div>
          </Box>
        )}
    </Grid>
  );
};

export default ProductList;
