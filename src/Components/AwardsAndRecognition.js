import React from "react";
import { Grid } from "@mui/material";
import useWindowWidthAndHeight from "../utilities/CustomHooks";

import GJTCIExcellenceAward2014 from "../images/GJTCIExcellenceAward2014.png";
import LokmatCorporateExcellenceAward2017 from "../images/LokmatCorporateExcellenceAward2017.png";
import imageSliderHeaderIconLeft from "../images/icons/Group45.svg";
import imageSliderHeaderIconRight from "../images/icons/Group40.svg";
import BestSilverDesignerJewellery2016 from "../images/BestSilverDesignerJewellery2016.png";
import BestBusinessWomenAwards from "../images/BestBusinessWomenAwards.png";
import GemOfTheYearAward from "../images/Awards.png";
import YoungAcheversAward from "../images/YoungAcheversAward.png";
import TrustedJewellers from "../images/TrustedJewellers.png";
const AwardsAndItsLogo = [
  {
    imageUrl: GJTCIExcellenceAward2014,
    imageSecription: "GJTCI Excellence Award ",
  },
  {
    imageUrl: BestSilverDesignerJewellery2016,
    imageSecription: "Best Silver Designer Award",
  },
  {
    imageUrl: LokmatCorporateExcellenceAward2017,
    imageSecription: "Lokmat Corporate Excellence Award",
  },

  {
    imageUrl: BestBusinessWomenAwards,
    imageSecription: "Best Female Business Woman Award",
  },
  {
    imageUrl: GemOfTheYearAward,
    imageSecription: "Gem of the Year(West)Award",
  },
  {
    imageUrl: YoungAcheversAward,
    imageSecription: "2020",
  },
  {
    imageUrl: TrustedJewellers,
    imageSecription: "2015",
  },
];

export default function AwardsAndRecognition({ Item }) {
  const windoDimensions = useWindowWidthAndHeight();
  return (
    <Grid container spacing={1}>
      <Grid item xs={1} md={2}>
        <Item className="empty-container-section">xs=6 md=4</Item>
      </Grid>
      <Grid item xs={10} md={8} className="about-us-awards-header-container">
        <div className="about-us-awards-header">
          <img
            src={imageSliderHeaderIconLeft}
            alt="React Logo"
            className="left-logo"
          />
          {"  "}
          Award-Winning Craftsmanship: Excellence Recognized{" "}
          <img
            src={imageSliderHeaderIconRight}
            alt="React Logo"
            className="right-logo"
          />
        </div>
        <div className="about-us-awards-description">
          We are honored to be recognized as a premier jeweller in India. Our
          dedication to excellence and innovation has earned us prestigious
          awards within the jewellery industry. These accolades motivate us to
          consistently redefine standards in craftsmanship and design. We deeply
          appreciate the trust and support of our esteemed customers, whose
          patronage has been instrumental in our success.
        </div>
      </Grid>

      <div className="container">
        <div className="row  justify-content-center">
          {AwardsAndItsLogo.slice(0, 5).map((element, index) => (
            <div key={index} className="col-12 col-lg-2 col-md-4">
              <div className="card-container">
                <img
                  src={element.imageUrl}
                  alt={element.imageSecription}
                  className="card-image"
                />
                <p>{element.imageSecription}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-4">
          {AwardsAndItsLogo.slice(5, 7).map((element, index) => (
            <div key={index} className="col-12 col-lg-2 col-md-4">
              <div className="card-container">
                <img
                  src={element.imageUrl}
                  alt={element.imageSecription}
                  className="card-image"
                />
                <p>{element.imageSecription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Grid>
  );
}
