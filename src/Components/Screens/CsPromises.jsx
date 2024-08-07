import React from "react";
import Slider from "react-slick";
import "../../scss/Components/Screens/_csPromises.scss";

import DeductionIcon from "../../images/USP/DeductionIcon";
import HallMarkIcon from "../../images/USP/HallMarkIcon";

import DiamondsIcon from "../../images/USP/DiamondsIcon";
import PurityIcon from "../../images/USP/PurityIcon";
import DebitCardIcon from "../../images/USP/DebitCardIcon";
import MeltingIcon from "../../images/USP/MeltingIcon";
import RateIcon from "../../images/USP/RateIcon";
import AstrologyIcon from "../../images/USP/AstrologyIcon";

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const promises = [
    {
      imgSrc: <DeductionIcon />,

      text: "NO-DEDUCTION<br/> EXCHANGE",
    },
    {
      imgSrc: <HallMarkIcon />,

      text: "BIS HALLMARKED<br/> JEWELLERY",
    },
    {
      imgSrc: <DiamondsIcon />,

      text: "CERTIFIED DIAMONDS &<br/>GEMSTONE",
    },
    {
      imgSrc: <PurityIcon />,

      text: "SILVER RATE AS <br/>PER PURITY",
    },
    {
      imgSrc: <DebitCardIcon />,

      text: "NO CARD FEES",
    },
    {
      imgSrc: <MeltingIcon />,

      text: "DIRECT DEPOSIT AFTER MELTING",
    },
    {
      imgSrc: <RateIcon />,

      text: "GOLD AND SILVER KARATOMETER",
    },
    {
      imgSrc: <AstrologyIcon />,

      text: "FREE ASTROLOGY CONSULTATION",
    },
  ];

  return (
    <div className="promises-section  text-light">
      <div className="text-center mt-3 ">
        <h2 className="heading-font m-0">CS Promises</h2>
        <p className="m-0">Incredible rationales to shop with us!</p>
      </div>
      <div className="promises-container">
        <Slider {...settings}>
          {promises.map((promise, index) => (
            <div className="promise-slide text-center " key={index}>
              <div className="promises-img ">{promise.imgSrc}</div>

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
