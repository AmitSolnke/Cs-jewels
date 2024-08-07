import React from "react";
import { Grid } from "@mui/material";
import useWindowWidthAndHeight from "../utilities/CustomHooks";

import GJTCIExcellenceAward2014 from "../images/GJTCIExcellenceAward2014.png";
import LokmatCorporateExcellenceAward2017 from "../images/LokmatCorporateExcellenceAward2017.png";
import imageSliderHeaderIconLeft from "../images/icons/Group45.svg";
import imageSliderHeaderIconRight from "../images/icons/Group40.svg";
import BestSilverDesignerJewellery2016 from "../images/BestSilverDesignerJewellery2016.png";

const AwardsAndItsLogo = [
  {
    imageUrl: GJTCIExcellenceAward2014,
    imageSecription: "GJTCI Excellence Award",
  },
  {
    imageUrl: LokmatCorporateExcellenceAward2017,
    imageSecription: "Lokmat Corporate Excellence Award",
  },
  {
    imageUrl: BestSilverDesignerJewellery2016,
    imageSecription: "Best Silver Designer Jewellery",
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
      <Grid item xs={1} md={2}>
        <Item className="empty-container-section">xs=6 md=4</Item>
      </Grid>
      {windoDimensions[0] <= 768 ? (
        AwardsAndItsLogo.map((element) => (
          <>
            <Grid item xs={3} md={3}>
              <Item className="empty-container-section">xs=6 md=4</Item>
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
              className="about-us-awards-header-container-for-titles"
            >
              <div className="about-us-awards-header-image">
                <img src={element.imageUrl} alt="React Logo" />
              </div>
              <div className="about-us-awards-header-title">
                {element.imageSecription}
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <Item className="empty-container-section">xs=6 md=4</Item>
            </Grid>
          </>
        ))
      ) : (
        <>
          <Grid item xs={1} md={3}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          {AwardsAndItsLogo.map((element) => (
            <Grid
              item
              xs={12}
              md={2}
              className="about-us-awards-header-container-for-titles"
            >
              <div className="about-us-awards-header-image">
                <img src={element.imageUrl} alt="React Logo" />
              </div>
              <div className="about-us-awards-header-title">
                {element.imageSecription}
              </div>
            </Grid>
          ))}
          <Grid item xs={1} md={3}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
        </>
      )}
    </Grid>
  );
}
