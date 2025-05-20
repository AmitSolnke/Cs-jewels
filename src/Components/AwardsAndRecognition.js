import React from "react";
import { Grid } from "@mui/material";
import useWindowWidthAndHeight from "../utilities/CustomHooks";
import {
  BestBusinessWomenAwards,
  GemOfTheYearAward,
  GJTCIExcellenceAward2014,
  LokmatCorporateExcellenceAward2017,

  BestSilverDesignerJewellery2016,
  YoungAcheversAward,
  TrustedJewellers,
} from "../images/AwordImages";

const AwardsAndItsLogo = [
  {
    imageUrl: TrustedJewellers,
    imageSecription: "2015",
  },

  {
    imageUrl: BestSilverDesignerJewellery2016,
    imageSecription: "2016",
  },
  {
    imageUrl: LokmatCorporateExcellenceAward2017,
    imageSecription: "2017",
  },

  {
    imageUrl: GemOfTheYearAward,
    imageSecription: "2020",
  },
  {
    imageUrl: YoungAcheversAward,
    imageSecription: "2020",
  },
  {
    imageUrl: GJTCIExcellenceAward2014,
    imageSecription: "2014 ",
  },
  {
    imageUrl: BestBusinessWomenAwards,
    imageSecription: "2024",
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


          Award-Winning Craftsmanship: Excellence Recognized

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
          {AwardsAndItsLogo.map((element, index) => (
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
                loading="lazy"
              />
              <p className="about-us-award-details">{element.imageSecription}</p>
            </Grid>
          ))}
        </Grid>
      </div>
    </Grid>
  );
}
