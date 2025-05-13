import React from 'react';
import Slider from 'react-slick';
import '../../scss/Components/Screens/_csPromises.scss';

import DeductionIcon from '../../images/USP/DeductionIcon';
import HallMarkIcon from '../../images/USP/HallMarkIcon';

import DiamondsIcon from '../../images/USP/DiamondsIcon';
import PurityIcon from '../../images/USP/PurityIcon';
import DebitCardIcon from '../../images/USP/DebitCardIcon';
import MeltingIcon from '../../images/USP/MeltingIcon';
import AstrologyIcon from '../../images/USP/AstrologyIcon';
import BIShallmark from '../../images/BISHallmark.webp';
import GoldKeratometer from '../../images/gold&silver-keratometer.webp';

const CsPromises = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const promises = [
    {
      imgComponent: <DeductionIcon />,
      text: 'NO-DEDUCTION<br/> EXCHANGE'
    },
    {
      imgSrc: BIShallmark,
      text: 'BIS HALLMARKED<br/> JEWELLERY'
    },
    {
      imgComponent: <DiamondsIcon />,
      text: 'CERTIFIED DIAMONDS &<br/>GEMSTONE'
    },
    {
      imgComponent: <PurityIcon />,
      text: 'SILVER RATE AS <br/>PER PURITY'
    },
    {
      imgComponent: <DebitCardIcon />,
      text: 'NO CARD FEES'
    },
    {
      imgComponent: <MeltingIcon />,
      text: 'DIRECT DEPOSIT AFTER MELTING'
    },
    {
      imgSrc: GoldKeratometer,
      text: 'GOLD AND SILVER KARATOMETER'
    },
    {
      imgComponent: <AstrologyIcon />,
      text: 'FREE ASTROLOGY CONSULTATION'
    }
  ];

  return (
    <div className="promises-section text-light">
      <div className="text-center mt-4">
        <h2 className="heading-font m-0">CSJ Promises</h2>
        <p className="m-0 heading-text">
          We promise exceptional craftsmanship, timeless designs, and a
          commitment to making every moment special.
        </p>
      </div>
      <div className="promises-container mb-3">
        <Slider {...settings}>
          {promises.map((promise, index) => (
            <div className="promise-slide text-center" key={index}>
              <div className="promises-img">
                {promise.imgComponent ? (
                  promise.imgComponent
                ) : (
                  <img
                    className="w-100"
                    src={promise.imgSrc}
                    alt=""
                    loading="lazy"
                  />
                )}
              </div>
              <p
                className="content-text"
                dangerouslySetInnerHTML={{ __html: promise.text }}
              ></p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CsPromises;
