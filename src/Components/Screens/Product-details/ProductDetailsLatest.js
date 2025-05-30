import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box, Button, Grid } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import EnquiryModal from "./EnquiryModal";
import { getProductDetails } from "../../../services/FrontApp/index.service";
import SliderImage from "react-zoom-slider";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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
  const mediaItems = [
    ...productDetails.images.map((img) => ({
      type: "image",
      original: img.image_path,
      thumbnail: img.image_path,
    })),
    ...(productDetails.videos || []).map((vid) => ({
      type: "video",
      original: vid.image_path,
      thumbnail: vid.thumbnail || vid.image_path,
    })),
    // ...(productDetails.products || []).map((product) => ({
    //   type: "products",
    //   original: product.image_path,
    //   thumbnail: product.thumbnail || product.image_path,
    // })),
  ];
  const productImage = productDetails?.products?.map((product) => product.image_path)

  const sliderData =
    mediaItems && mediaItems.length > 0
      ? mediaItems
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

  const sliderSettings = {
    customPaging: function (i) {
      return (
        <a>
          {mediaItems[i]?.type === "video" ? (
            <div
              className="video-thumb"
              style={{
                width: "60px",
                height: "45px",
                borderRadius: "5px",
                backgroundImage: `url(${productImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
                opacity: 0.8, // To dim the background image slightly
              }}
            >
              <PlayCircleOutlineIcon
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#672A2F",
                  fontSize: "24px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "2px",
                }}
              />
            </div>
          ) : (
            <img
              src={mediaItems[i]?.thumbnail}
              className='image-thumb'
              style={{
                width: "60px",
                height: "45px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              alt={`Thumbnail ${i + 1}`}
            />
          )}
        </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dotsClass: "slick-dots slick-thumb",
    autoplay: false,
    waitForAnimate: false,
    fade: true,
    adaptiveHeight: true,
    infinite: true,
    // responsive: [
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       dots: true,
    //       arrows: false,
    //     },
    //   },
    // ],
  };

  return (
    <Box className="product-details-latest">
      <Grid
        container
        spacing={1}
        className="p-3 grid-container"
        style={{ background: "#fff" }}
      >
        <Grid item sm={6}>
          <div className="">
            {/* product images gallery */}
            <div className="d-none product-gallery d-md-block">
              {/* <ImageGallery
                items={imageItems}
                showNav={false}
                showPlayButton={false}
                showFul
                lscreenButton={false}
              /> */}

              {mediaItems?.length > 0 && (
                <Slider {...sliderSettings}>
                  {mediaItems.map((media, index) => (
                    <div key={index}>
                      {media.type === "image" ? (
                        <SideBySideMagnifier
                          imageSrc={media.original}
                          imageAlt={`Product Image ${index + 1}`}
                          alwaysInPlace={true}
                          zoomContainerBorder="1px solid #ccc"
                          className="custom-magnifier"
                          fillAvailableSpace={false}
                        />
                      ) : media.type === "video" ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          className="custom-magnifier"
                          // title={`Product Video ${index + 1}`}
                          poster={media.thumbnail}
                        >
                          <source src={media.original} type={`video/${media.original.split('.').pop()?.toLowerCase() || 'mp4'}`} />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </div>
                  ))}
                </Slider>
              )}

            </div>

            <div className="d-block product-gallery d-md-none">
              <ImageGallery
                items={mediaItems}
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                showBullets={true}
                showThumbnails={false}
                renderItem={(item) => (
                  item.type === 'video' ? (
                    <div className="image-gallery-image">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                        poster={typeof item.thumbnail === 'string' ? item.thumbnail : undefined}
                      >
                        <source src={item.original} type={`video/${item.original.split('.').pop()?.toLowerCase() || 'mp4'}`} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <img
                      src={item.original}
                      alt="product media"
                      style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                      className="image-gallery-image"
                    />
                  ))}
              />
            </div>
          </div>
        </Grid>

        <Grid
          item
          sm={6}
          style={{ paddingLeft: "1rem" }}
          className="product-details-wrapper"
        >
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

          <div className=" m-2 product-details">
            <div className="product-details-title-link">PRODUCT DETAILS</div>
            <div>Gross weight: {productDetails.gross_wt}g</div>
            <div>Net weight: {productDetails.net_wt}g</div>
            <div>Purity: {productDetails.purity}</div>
            {productDetails.stones_details.map((stone, index) => (
              <div>
                Stone {index + 1} weight: {stone.net_wt}g
              </div>
            ))}
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
            className="btn btn-block bg-black btn-submit col-12 col-md-10 col-lg-6 mx-2"
            variant="contained"
            onClick={handleOpenEnquiryModal}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span className="button-enquire">ENQUIRE</span>
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
