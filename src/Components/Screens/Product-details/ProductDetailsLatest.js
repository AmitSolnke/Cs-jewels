import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box, Button, Grid } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import EnquiryModal from "./EnquiryModal";
import { getProductDetails } from "../../../services/FrontApp/index.service";
import SliderImage from "react-zoom-slider";

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
    stones_details: [],
    images: [],
  });

  const getProductData = async () => {
    const result = await getProductDetails({ product_id: id });
    setProductDetails(result.data.data);

    // Todo: remove while integrating api calls refer above.
    // setProductDetails({
    //   product_name: "Ganesha Diamond Ring",
    //   metal_description: "24 KT | 1 GM",
    //   metal_amount: "94,000",
    //   item_description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //   purity: "",
    //   description: "desc",
    //   sales_price: 0,
    //   gross_wt: 0,
    //   images: [
    //     {
    //       url: "https://source.unsplash.com/random/?sig=1&count=5&orientation=landscape",
    //       thumbnailUrl:
    //         "https://source.unsplash.com/random/?sig=1&count=5&orientation=landscape",
    //     },
    //     {
    //       url: "https://source.unsplash.com/random/?sig=2&count=5&orientation=landscape",
    //       thumbnailUrl:
    //         "https://source.unsplash.com/random/?sig=2&count=5&orientation=landscape",
    //     },
    //     {
    //       url: "https://source.unsplash.com/random/?sig=3&count=5&orientation=landscape",
    //       thumbnailUrl:
    //         "https://source.unsplash.com/random/?sig=3&count=5&orientation=landscape",
    //     },
    //   ],
    // });
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Todo: this is the image array refactor code to use images from the api call
  const imageItems = productDetails.images.map((image) => ({
    original: image.image_path,
    thumbnail: image.image_path,
  }));

  const sliderData =
    imageItems && imageItems.length > 0
      ? imageItems
          .filter((item) => item && item.original) // Filter out invalid items
          .map((item) => ({
            image: item.original, // Use `original` field for the `image`
            description: "", // Add descriptions if needed, or leave empty
          }))
      : [];

  const [open, setOpen] = useState(false);

  const handleOpenEnquiryModal = () => {
    setOpen(true);
  };

  const handleCloseEnquiryModal = () => {
    setOpen(false);
  };

  return (
    <Box className="product-details-latest">
      <Grid
        container
        spacing={1}
        className="p-3 grid-container"
        style={{ background: "#fff" }}
      >
        <Grid item md={6}>
          <div className="">
            {/* product images gallery */}
            <div className="d-none product-gallery d-md-block">
              {/* <ImageGallery
                items={imageItems}
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
              /> */}

              {sliderData && sliderData.length > 0 ? (
                <SliderImage
                  data={sliderData}
                  showDescription={true}
                  direction="right"
                  className="react-slider__imgZoom react-slider__btnNext react-slider__btnPrev"
                />
              ) : (
                <p>No images available to display.</p>
              )}
            </div>

            <div className="d-block product-gallery d-md-none">
              <ImageGallery
                items={imageItems}
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                showBullets={true}
                showThumbnails={false}
              />
            </div>
          </div>
        </Grid>

        <Grid
          item
          md={6}
          style={{ paddingLeft: "1rem" }}
          className="product-details-wrapper"
        >
          <div className="">
            {/* <span className="new-arrival-badge">NEW ARRIVAL</span>

            <h2 className="product-title">{productDetails.product_name}</h2>

            <div className="metal-description my-2">
              {productDetails.metal_description}
            </div> */}

            {/* commented temporary
            <div className="product-price"> &#8377; {productDetails.sales_price}</div> */}

            {/* <div className="product-description">
              {productDetails.item_description}
            </div> */}

            <div className="product-informations my-2">
              <span className="product-details-title-link">
                PRODUCT DETAILS
              </span>

              <div>Gross weight: {productDetails.gross_wt}g</div>
              <div>Net weight: {productDetails.net_wt}g</div>
              <div>Purity: {productDetails.purity}</div>
              {productDetails.stones_details.map((stone, index) => (
                <div>
                  Stone {index + 1} weight: {stone.net_wt}g
                </div>
              ))}
            </div>
          </div>

          {/* commented temporary
          <table className="product-information-table my-2">
            <tr>
              <td>Rate:</td>
              <td> &#8377; {productDetails.regular_price}</td>
            </tr>

            <tr>
              <td>Making charges:</td>
              <td> &#8377; {productDetails.stones_amount}</td>
            </tr>

            <tr>
              <td>Metal amount:</td>
              <td>&#8377; {productDetails.metal_amount}</td>
            </tr>

            <tr>
              <td>Stone amount:</td>
              <td>&#8377; {productDetails.stones_amount}</td>
            </tr>

            <tr>
              <td>GST:</td>
              <td>&#8377; {(productDetails.regular_price / 100) * 18}</td>
            </tr>

            <tr>
              <td>Final product amount:</td>
              <td>&#8377; {productDetails.sales_price}</td>
            </tr>
          </table> */}

          <Button
            className="btn btn-block bg-black btn-submit col-12 col-md-10 col-lg-6"
            variant="contained"
            onClick={handleOpenEnquiryModal}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>ENQUIRY NOW</span>
            <EastIcon />
          </Button>

          <EnquiryModal
            open={open}
            handleClose={handleCloseEnquiryModal}
            productId={id}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
