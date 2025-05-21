/** @format */

import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Stack } from '@mui/material';
import { useSnapCarousel } from 'react-snap-carousel';

import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import useWindowWidthAndHeight from '../utilities/CustomHooks';
import imageSliderHeaderIconRight from '../images/icons/Group40.svg';
import imageSliderHeaderIconLeft from '../images/icons/Group45.svg';
import { getTestimonial } from '../services/FrontApp/index.service';
import ReviewStars from './Common/ReviewStars';
import TESTIMONIAL_BG_WEB from '../images/testimonial.png';
import TESTIMONIAL_BG_MOBILE from '../images/testimonial1.png';
import { parseHtmlContent } from '../utilities/CustomFunction';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ContainerWrapper from './Common/ContainerWrapper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const TestimonialComponent = ({ data }) => {
  return (
    <div className="testimonial-wrapper">
      <img src={data.image_path} alt="img" className="client-img" loading="lazy"/>
      <div className="feedback-wrapper">
        {/* <p dangerouslySetInnerHTML={{ __html: data.description }} /> */}
        <p>{parseHtmlContent(data.description)}</p>
        <ReviewStars review={data.rating} width={20} height={20} />
        <div className="name-wrapper">
          <hr />
          <small className="client-name"> {data.author} </small>
        </div>
      </div>
    </div>
  );
};

export default function Testimonial() {
  const { scrollRef, next, prev, pages, activePageIndex, goTo } =
    useSnapCarousel();
  // console.log(activePageIndex,"activePageIndex")
  const windoDimensions = useWindowWidthAndHeight();

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const result = await getTestimonial();
      setData(result.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      className="testimonial-section m-0"
      sx={{
        backgroundImage: {
          xs: `url(${TESTIMONIAL_BG_MOBILE})`,
          lg: `url(${TESTIMONIAL_BG_WEB})`
        },
        flexGrow: 1,
        paddingY:'0 !important'
      }}
    >
      <ContainerWrapper>
        <Stack container spacing={1}>
          <Box className="large-image-slider-test-area text-area-explore" item>
            <div className="image-slider-header">Treasured Stories</div>
          </Box>
          <Box>
            <div className="image-slider-description text-only-grid text-only-grid-explore-description">
              Our customers share their personal experiences with CS Jewels,
              showcasing how our jewellery goes beyond beauty to create
              unforgettable memories that last a lifetime.
            </div>
          </Box>
        </Stack>
      </ContainerWrapper>
      {data.length > 0 ? (
        <ul className={`testimonial-slider-component my-4`} ref={scrollRef}>
          {data.map((item) => (
            <div className="testimonial-block" key={item.id.toString()}>
              <TestimonialComponent data={item} />
            </div>
          ))}
        </ul>
      ) : (
        ''
      )}
      {console.log(activePageIndex, 'activePageIndex')}

      {windoDimensions[0] >= 1265 && (
        <div className="navigation-icon">
          <button
            active={activePageIndex == 0}
            disabled={activePageIndex === 0}
            // disabled={activePageIndex == pages.length - 1}
            className="arrow-icon-generic round-border"
            type="button"
            onClick={prev}
          >
            <WestIcon />
          </button>
          <button
            disabled={activePageIndex == pages.length - 1}
            className="arrow-icon-generic round-border"
            type="button"
            onClick={next}
          >
            <EastIcon />
          </button>
        </div>
      )}
      {windoDimensions[0] < 768 && (
        <ol
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: '0'
            // marginTop: 24,
            // marginBottom: 0,
          }}
        >
          {pages.map((_, i) => (
            <button
              key={i}
              className="image-scroll-navigation"
              style={i === activePageIndex ? { opacity: 2 } : {}}
              onClick={() => goTo(i)}
            ></button>
          ))}
        </ol>
      )}
    </Box>
  );
}
