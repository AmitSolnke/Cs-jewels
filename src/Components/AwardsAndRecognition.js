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
    imageSecription: "GJTCI Excellence Award 2024 ",
  },
  {
    imageUrl: BestSilverDesignerJewellery2016,
    imageSecription: "Best Silver Designer Award 2016",
  },
  {
    imageUrl: LokmatCorporateExcellenceAward2017,
    imageSecription: "Lokmat Corporate Excellence Award 2017",
  },

  {
    imageUrl: BestBusinessWomenAwards,
    imageSecription: "Best Female Business Woman Award 2024",
  },
  {
    imageUrl: GemOfTheYearAward,
    imageSecription: "Gem of the Year(West)Award 2020",
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
        <Grid
          container
          sx={{
            justifyContent: "center",
            gap: 1,
          }}
        >
          {/* {AwardsAndItsLogo.map((element, index) => (
            <Grid
              item
              xs={12}
              sm={5.5}
              md={3.5}
              lg={2.9}
              xl={2.2}
              className="text-center"
            >
              <img
                src={element.imageUrl}
                className="img-fluid award-image"
                alt={element.imageSecription}
              />
              <p cl>{element.imageSecription}</p>
            </Grid>
          ))} */}

          {AwardsAndItsLogo?.sort((a, b) => {
            // Extract all years from the description (e.g., "Award 2018 and 2020" => [2018, 2020])
            const yearsA =
              a?.imageSecription.match(/\d{4}/g)?.map(Number) || [];
            const yearsB =
              b?.imageSecription.match(/\d{4}/g)?.map(Number) || [];

            // Sort based on the earliest year in the array
            const earliestYearA = Math?.min(...yearsA);
            const earliestYearB = Math?.min(...yearsB);

            // If no years are found, default to sorting equally (0 - 0 = 0)
            return (earliestYearA || 0) - (earliestYearB || 0);
          })?.map((element, index) => (
            <Grid
              key={index} // Always provide a unique key when using map
              item
              xs={12}
              sm={5.5}
              md={3.5}
              lg={2.9}
              xl={2.2}
              className="text-center"
            >
              <img
                src={element?.imageUrl}
                className="img-fluid award-image"
                alt={element?.imageSecription}
              />
              <p>{element?.imageSecription}</p>
            </Grid>
          ))}
        </Grid>
      </div>
    </Grid>
  );
}
