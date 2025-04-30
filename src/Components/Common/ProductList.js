import { Grid, Skeleton, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, isLoading = false }) => {
  const navigate = useNavigate();

  const skeletonArray = Array.from({ length: 12 });

  return (
    <Grid
      sx={{ display: "flex", justifyContent: "center" }}
      container
      spacing={1}
      className="p-3 product-item-wrapper"
    >
      {isLoading ? (
        skeletonArray.map((_, index) => (
          <Grid
            item
            key={index}
            md={4}
            sm={6}
            xs={12}
            className="product-item-card"
          >
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1640 / 1049",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ borderRadius: 0 }}
              />
            </Box>
          </Grid>
        ))
      ) : products?.length > 0 ? (
        products.map((product, key) => (
          <Grid
            item
            key={key}
            md={4}
            style={{ cursor: "pointer" }}
            className="product-item-card"
            onClick={() => navigate("/product-details/" + product.product_id)}
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
      ) : (
        <Box
          width="100%"
          mt={4}
          p={3}
          textAlign="center"
          sx={{
            backgroundColor: "#f8f8f8",
            border: "1px dashed #ccc",
            borderRadius: "8px",
            color: "#555",
            fontSize: "1.2rem",
            fontWeight: 500,
          }}
        >
          No products found
        </Box>
      )}
    </Grid>
  );
};

export default ProductList;
