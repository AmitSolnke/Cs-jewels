import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import rightArrowIconWhite from '../../images/icons/right-arrow-white.svg';
import CarouselHome from '../CarouselHome';
import ImageSliderHome from '../ImageSliderHome';
import imageSliderHeaderIconRight from '../../images/icons/Group40.svg';
import imageSliderHeaderIconLeft from '../../images/icons/Group45.svg';
import CardImageNormal from '../../images/MaskGroup8.png';
import CardImageLarge from '../../images/MaskGroup24.png';
import CardImageNoPadding from '../../images/MaskGroup18.png';
import useWindowWidthAndHeight from '../../utilities/CustomHooks';
import rightArrowIcon from '../../images/icons/right-arrow.svg';
import Testimonial from '../Testimonial';
import prod1 from '../../images/products/1.jpg';
import prod2 from '../../images/products/2.jpg';
import prod3 from '../../images/products/3.jpg';
import prod4 from '../../images/products/4.jpg';
import catImg1 from '../../images/categories/bangles.jpg'
import catImg2 from '../../images/categories/dimoand_neckless.jpg'
import catImg3 from '../../images/categories/earrings.jpg'
import catImg4 from '../../images/categories/earrings_2.jpg'
import catImg5 from '../../images/categories/neckless_1.jpg'
import catImg6 from '../../images/categories/neckless_2.jpg'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const prodImages = [prod1, prod2, prod3, prod4];
const offerImages = [CardImageLarge, CardImageLarge, CardImageLarge, CardImageLarge];
const shineImages = [CardImageNoPadding, CardImageNoPadding, CardImageNoPadding, CardImageNoPadding];
const catImgs = [catImg1, catImg2, catImg3, catImg4, catImg5, catImg6];

function Home() {
  const windoDimensions = useWindowWidthAndHeight();
  return (
    <div className='col-12'>
      <div>
        <CarouselHome />
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid item xs={11} md={11}>
            <div className="image-slider-header">
              Dazzling Favorites
              {' '}
              <img src={imageSliderHeaderIconRight} alt="React Logo" />
            </div>
          </Grid>
          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid item xs={10} md={10}>
            <div className="image-slider-description">
              Adorn yourself with the latest trends
              – Explore our curated selection of trending jewelry styles that capture
              the essence of modern allure.
            </div>
          </Grid>
          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid className='extra-empty-container' item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid className='favourite-image-slider' item xs={10} md={11}>
            <ImageSliderHome width={295} height={355} CardImage={CardImageNormal} padding={30} CardImageType={"Favourites"} className="favorite-slider" imagesArray={prodImages} />
          </Grid>
        </Grid>
      </Box>
      <Box className="large-image-slider-container" sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} className="w-100">
          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid item xs={11} md={4} className="large-image-slider-test-area exclusive-offer-test-section p-0" >
            <div className="image-slider-header">
              Shine bright with our exclusive offers
              {' '}
              <img src={imageSliderHeaderIconRight} alt="React Logo" />
            </div>
            <div className="big-image-slider-description image-slider-description">
              Sparkling Deals Await: Unwrap Irresistible Offers on Captivating Jewellery Pieces.
            </div>
            {windoDimensions[0] > 768 && <div className="big-image-slider-description image-slider-description">
              <button type="button" className="carousel-explore-now-btn">
                VIEW ALL
                {' '}
                <img src={rightArrowIcon} alt="rightArrowIcon" />
              </button>
            </div>}
          </Grid>
          <Grid className='extra-empty-container-exclusive-offers' item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid item xs={11} md={7} className="p-0 w-100">
            <ImageSliderHome width={550} height={550} CardImage={CardImageLarge} padding={40} CardImageType={"Offers"} className="offer-slider" imagesArray={offerImages} />
          </Grid>
          <Grid className='extra-empty-container-exclusive-offers w-100' item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          {windoDimensions[0] <= 768 && <Grid item xs={11} md={7}>
            <div className="big-image-slider-description image-slider-description carousel-view-all-btn">
              <button type="button" className="carousel-explore-now-btn">
                VIEW ALL
                {' '}
                <img src={rightArrowIcon} alt="rightArrowIcon" />
              </button>
            </div>
          </Grid>}
        </Grid>
      </Box>
      <Box className="large-image-slider-container discover-image-slider-container" sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} className="w-100">
          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid className="large-image-slider-test-area" item xs={11} md={11}>
            <div className="image-slider-header">
              Discover Your Shine
              {' '}
              <img src={imageSliderHeaderIconRight} alt="React Logo" />
            </div>
            <div className="big-image-slider-description image-slider-description">
              From timeless classics to modern marvels, find your style in our curated categories.
            </div>
          </Grid>
          <Grid item xs={12} md={12} className="p-0">
            <ImageSliderHome width={450} height={600} CardImage={CardImageNoPadding} padding={0} CardImageType={"Discover"} imagesArray={catImgs} />
          </Grid>
        </Grid>
      </Box>
      <Box className="large-image-slider-container" sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={1} md={3}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid className="large-image-slider-test-area text-area-explore" item xs={9} md={6}>
            {windoDimensions[0] > 768 ?
              <div className="image-slider-header text-only-grid-header">
                <img src={imageSliderHeaderIconLeft} alt="React Logo" />
                {'  '}
                Explore Our Store Locations
                {' '}
                <img src={imageSliderHeaderIconRight} alt="React Logo" />
              </div>
              : <div className="image-slider-header text-only-grid-header image-slider-header-explore">
                <div>
                  Explore Our Store
                </div>
                <div>
                  <img src={imageSliderHeaderIconLeft} alt="React Logo" />
                  {'  '}
                  Locations
                  {' '}
                  <img src={imageSliderHeaderIconRight} alt="React Logo" />
                </div>
              </div>
            }
            <div className="image-slider-description text-only-grid text-only-grid-explore-description">
              Discover the allure of our jewelry collection in person – Locate your nearest store for a touch of elegance.
            </div>
            <div className="image-slider-description text-only-grid text-only-grid-explore-description">
              <button type="button" className="carousel-locate-store-btn">
                LOCATE STORES
                {' '}
                <img src={rightArrowIcon} alt="rightArrowIcon" />
              </button>
            </div>
          </Grid>
          <Grid item xs={1} md={3}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
        </Grid>
      </Box>
      <Testimonial />
    </div>
  );
}

export default Home;
