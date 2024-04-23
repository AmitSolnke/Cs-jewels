import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box, Grid } from "@mui/material";

export const ProductDetailsLatest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    product_name: "",
    metal_description: "",
    metal_amount: "",
    item_description: "",
    purity: "",
    description: "",
    sales_price: 0,
    gross_wt: 0,
  });

  const getProductData = async () => {
    // // const result = await getProductDetails({product_id: id})
    // // setProductDetails(result.data.data)

    setProductDetails({
      product_name: "Ganesha Diamond Ring",
      metal_description: "24 KT | 1 GM",
      metal_amount: "94,000",
      item_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      purity: "",
      description: "desc",
      sales_price: 0,
      gross_wt: 0,
    });
  };

  //   images array for image gallery

  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      {
        url: "https://source.unsplash.com/random/?sig=1&count=5",
        thumbnailUrl: "https://source.unsplash.com/random/?sig=1&count=5",
      },
      {
        url: "https://source.unsplash.com/random/?sig=1&count=5",
        thumbnailUrl: "https://source.unsplash.com/random/?sig=1&count=5",
      },
    ]);
  }, []);

  const imageItems = images.map((image) => ({
    original: image.url,
    thumbnail: image.thumbnailUrl,
  }));

  return (
    <Box className="product-details-latest">
      <Grid container spacing={1} className="p-3">
        <Grid item md={6}>
          <div className="">
            {/* product images gallery */}
            <div className="product-gallery">
              <ImageGallery
                items={imageItems}
                showNav={false}
                showPlayButton={false}
              />
            </div>
          </div>
        </Grid>

        <Grid item md={6}>
          <div className="">
            {/* section for product information */}
            <h1>This is product information</h1>

            <span className="new-arrival-badge">NEW ARRIVAL</span>

            <h2 className="product-name">Ganesha Diamond Ring</h2>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
