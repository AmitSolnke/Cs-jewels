import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Box, Button, Grid, Stack } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import EnquiryModal from './EnquiryModal';
import { getProductDetails } from '../../../services/FrontApp/index.service';
import SliderImage from 'react-zoom-slider';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import ForwardIcon from '@mui/icons-material/Forward';
import 'slick-carousel/slick/slick-theme.css';
import ProductDetailsTabs from './ProductDetailsTabs';
import { styled } from '@mui/material/styles';


const AnimatedIcon = styled(EastIcon)(({ theme }) => ({
  transition: 'transform 0.3s ease',
}));

export const ProductDetailsLatest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    product_name: '',
    metal_description: '',
    metal_amount: '',
    item_description: '',
    purity: '',
    description: '',
    sales_price: 0,
    gross_wt: 0,
    stones_details: [],
    images: []
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
  const imageItems = productDetails?.images?.map((image) => ({
    original: image.image_path,
    thumbnail: image.image_path
  }));
  const sliderData =
    imageItems && imageItems.length > 0
      ? imageItems
        .filter((item) => item && item.original) // Filter out invalid items
        .map((item) => ({
          image: item.original, // Use `original` field for the `image`
          description: '' // Add descriptions if needed, or leave empty
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
          <img
            src={imageItems?.[i]?.original}
            alt={`Thumbnail ${i + 1}`}
            style={{
              width: '60px',
              height: '45px',
              // objectFit: "cover",
              borderRadius: '5px'
            }}
          />
        </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dotsClass: 'slick-dots slick-thumb',
    autoplay: false,
    waitForAnimate: false,
    fade: true,
    adaptiveHeight: true,
    infinite: true
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

  const [active, setActive] = useState('general details');
  const [content, setContent] = useState('');

  const handleProductDetailsTab = (product) => {
    if (active.toLowerCase() === 'metal details') {
      setContent(
        <>
          <Box>
            <span className="fw-bolder"> Gross weight</span>:{product?.gross_wt}
            g
          </Box>
          <Box>
            <span className="fw-bolder"> Net weight</span> :{product?.net_wt}g
          </Box>
          <Box>
            <span className="fw-bolder"> Purity</span> : {product?.purity}K
          </Box>
        </>
      );
    } else if (active.toLowerCase() === 'product description') {
      setContent(
        <>
          {product?.description ||
            'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
        </>
      );
    } else {
      setContent(
        <>
          <Box>
            <span className="fw-bolder"> Product Product Name</span> :{' '}
            {product?.product_name || '--'}
          </Box>
          <Box>
            <span className="fw-bolder"> Product Code </span> :{' '}
            {product?.product_code || '--'}
          </Box>
          <Box>
            <span className="fw-bolder"> Gender </span> :{' '}
            {product?.gender || '--'}
          </Box>
        </>
      );
    }
  };
  const handleActiveTab = (tab) => {
    setActive(tab);
  };

  useEffect(() => {
    handleProductDetailsTab(productDetails);
  }, [active, JSON.stringify(productDetails)]);
  return (
    <Box className="product-details-latest">
      <Grid
        container
        spacing={3}
        className="p-3 grid-container"
        style={{ background: '#fff' }}
      >
        <Grid item md={6}>
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

              {imageItems?.length > 0 && (
                <Slider {...sliderSettings}>
                  {imageItems?.map((image, index) => (
                    <div key={index}>
                      <SideBySideMagnifier
                        imageSrc={image.original}
                        imageAlt={`Product Image ${index + 1}`}
                        alwaysInPlace={true}
                        zoomContainerBorder="1px solid #ccc"
                        className="custom-magnifier"
                        // overlayBackgroundColor="rgba(0,0,0,0.3)"
                        // className="custom-magnifier"
                        fillAvailableSpace={false}
                      // transitionSpeed={0.2}
                      // overlayBackgroundColor="rgba(0,0,0,0.6)"
                      />
                    </div>
                  ))}
                </Slider>
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
          sx={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          className="product-details-wrapper pt-md-0"
          width={'100%'}
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

          <div className=" m-2 product-details w-100 pt-md-0">
            <div
              className="product-details-title-link"
              style={{
                font: 'normal normal 900 17px/19px "Afacad Flux", serif'
              }}
            >
              PRODUCT DETAILS
            </div>
            <div className="product-description my-3">
              <span style={{ color: '#666666', fontWeight: '600' }}>
                Regular Price(Starting From)
              </span>
              :
              <span style={{ color: '#000', fontWeight: '600' }}>
                {productDetails.regular_price}/-
              </span>
            </div>
            <ProductDetailsTabs productDetails={productDetails} />
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
          <Box>
            <Button
              className="btn btn-block bg-black btn-submit col-12 col-md-10 col-lg-6 mx-2"
              variant="contained"
              onClick={handleOpenEnquiryModal}
              sx={{
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  md: 'flex-start'
                },
                gap: {
                  xs: 2,
                  md: 15
                },
                marginTop: '30px',
                width: {
                  xs: '95%',
                  sm: '95%',
                  md: '38%',
                },
                '&:hover .icon': {
                  transform: 'translateX(28px)'
                },
              }}
            >
              <span className="button-enquire">ENQUIRE</span>
              <AnimatedIcon className="icon" />
            </Button>

            <EnquiryModal
              open={open}
              handleClose={handleCloseEnquiryModal}
              productId={id}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
