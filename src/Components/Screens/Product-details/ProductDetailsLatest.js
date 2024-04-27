import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box, Button, Grid } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import EnquiryModal from "./EnquiryModal";

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
        url: "https://source.unsplash.com/random/?sig=2&count=5",
        thumbnailUrl: "https://source.unsplash.com/random/?sig=2&count=5",
      },
      {
        url: "https://source.unsplash.com/random/?sig=3&count=5",
        thumbnailUrl: "https://source.unsplash.com/random/?sig=3&count=5",
      },
    ]);
  }, []);

  const imageItems = images.map((image) => ({
    original: image.url,
    thumbnail: image.thumbnailUrl,
  }));

  const [open, setOpen] = useState(false);

  const handleOpenEnquiryModal = () => {
    setOpen(true);
  };

  const handleCloseEnquiryModal = () => {
    setOpen(false);
  };

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
            <span className="new-arrival-badge">NEW ARRIVAL</span>

            <h2 className="product-name">Ganesha Diamond Ring</h2>

            <div className="metal-description">24 KT | 1 GM</div>

            <div className="product-price"> &#8377; 94000</div>

            <div className="product-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>

            <div className="product-informations my-2">
              <span className="product-details-title-link">
                PRODUCT DETAILS
              </span>

              <div>Gross weight: 64g</div>
              <div>Net weight: 64g</div>
              <div>Purity: </div>
              <div>Stone1 weight: </div>
              <div>Stone2 weight: </div>
            </div>
          </div>

          <table border={2} className="product-information-table my-2">
            <tr>
              <td>Rate:</td>
              <td> &#8377; 94000</td>
            </tr>

            <tr>
              <td>Making charges:</td>
              <td> &#8377; 24000</td>
            </tr>

            <tr>
              <td>Metal amount:</td>
              <td>&#8377; 20000</td>
            </tr>

            <tr>
              <td>Stone amount:</td>
              <td>&#8377; 20000</td>
            </tr>

            <tr>
              <td>GST:</td>
              <td>1234567</td>
            </tr>

            <tr>
              <td>Final product amount:</td>
              <td>&#8377; 94000</td>
            </tr>
          </table>

          <Button
            className="btn btn-block bg-black btn-submit col-12 col-md-10 col-lg-6"
            variant="contained"
            onClick={handleOpenEnquiryModal}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>ENQUIRY NOW</span>
            <EastIcon />
          </Button>

          <EnquiryModal open={open} handleClose={handleCloseEnquiryModal} />
        </Grid>
      </Grid>
    </Box>
  );
};
