import React, { useState, useEffect } from "react";
import imageSliderHeaderIconRight from '../images/icons/Group40.svg';
import imageSliderHeaderIconLeft from '../images/icons/Group45.svg';
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Grid from '@mui/material/Grid';
import useWindowWidthAndHeight from '../utilities/CustomHooks';
import { getTestimonial } from '../services/FrontApp/index.service';
import { useSnapCarousel } from 'react-snap-carousel';
import ReviewStars from "./Common/ReviewStars";

const TestimonialComponent = ({ data }) => {
  return (
    <div className="testimonial-wrapper">
      <img src={data.image_path} alt="img" className="client-img" />
      <div className="feedback-wrapper">
        <p dangerouslySetInnerHTML={{ __html: data.description }} />
        <ReviewStars review={data.rating} width={20} height={20} />
        <div className="name-wrapper">
          <hr />
          <small className="client-name"> {data.author} </small>
        </div>
      </div>
    </div>
  )
}

export default function Testimonial() {
  const {
    scrollRef, next, prev, pages, activePageIndex, goTo
  } = useSnapCarousel();
  const windoDimensions = useWindowWidthAndHeight();

  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const result = await getTestimonial();
      setData(result.data.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="testimonial-section">
      <Grid className="large-image-slider-test-area text-area-explore" item xs={9} md={6}>
        {windoDimensions[0] > 768 ?
          <div className="image-slider-header text-only-grid-header">
            <img src={imageSliderHeaderIconLeft} alt="React Logo" className="left-logo" />
            {' '} Treasured Stories {' '}
            <img src={imageSliderHeaderIconRight} alt="React Logo" className="right-logo" />
          </div>
          : <div className="image-slider-header text-only-grid-header image-slider-header-explore">
            <div>
              Explore Our Store
            </div>
            <div>
              <img src={imageSliderHeaderIconLeft} alt="React Logo"  className="left-logo" />
              {'  '}
              Locations
              {' '}
              <img src={imageSliderHeaderIconRight} alt="React Logo"  className="right-logo"/>
            </div>
          </div>
        }
        <div className="image-slider-description text-only-grid text-only-grid-explore-description">
          In their own words, our customers share their personal experiences
        </div>
      </Grid>
      {data.length > 0 ? (
        <ul
          className={`testimonial-slider-component`}
          ref={scrollRef}
        >
          {data.map((item) => (
            <div className="testimonial-block" key={item.id.toString()}>
              <TestimonialComponent data={item} />
            </div>
          ))}
        </ul>
      ) : ''}

      {windoDimensions[0] >= 768 && (
        <div className='navigation-icon'>
          <button disabled={activePageIndex == 0} className="arrow-icon-generic round-border" type="button" onClick={prev}>
            <WestIcon />
          </button>
          <button disabled={activePageIndex == pages.length - 1} className="arrow-icon-generic round-border" type="button" onClick={next}>
            <EastIcon />
          </button>
        </div>
      )}
      {windoDimensions[0] < 768 && <ol style={{ display: 'flex', justifyContent: "center", paddingLeft: "0", marginTop: 24, marginBottom: 0 }}>
        {pages.map((_, i) => (
          <button key={i} className='image-scroll-navigation'
            style={i === activePageIndex ? { opacity: 0.5 } : {}}
            onClick={() => goTo(i)}
          >
          </button>
        ))}
      </ol>}
    </div>
  )
}