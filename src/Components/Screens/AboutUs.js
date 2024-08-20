import React from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import aboutUsTitleImage from "../../images/aboutUsTitleImage.jpeg";
import ourSpecality from "../../images/ourSpecality.jpeg";
import imageSliderHeaderIconRight from "../../images/icons/Group40.svg";
import aboutUsFullScreenBottomImage from "../../images/aboutUsFullScreenBottomImage.jpeg";
import aboutUsFullScreenBottomImageMobileView from "../../images/aboutUsFullScreenBottomImageMobileView.jpeg";
import useWindowWidthAndHeight from "../../utilities/CustomHooks";
import ReadMoreText from "../ReadMoreText";
import BlogSectionWithSideImage from "../BlogSectionWithSideImage";
import digitalSpace from "../../images/digitalSpace.jpeg";
import TreasuredStoriesBackground from "../../images/TreasuredStoriesBackground.png";
import AwardsAndRecognition from "../AwardsAndRecognition";
import SocietyContributionImage from "../../images/about_us.jpg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AboutUs() {
  const windoDimensions = useWindowWidthAndHeight();
  return (
    <div className="col-12 about-us">
      <div
        className="head-text-about-us"
        style={{
          backgroundImage: `url(${aboutUsTitleImage})`,
          backgroundSize: "cover",
        }}
      >
        {/* <p>
          Crafting Trust, Adorning Generations: Legacy Carved in Gold, Since
          1827
        </p> */}
      </div>
      <Box className="box-about-us" sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={2}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid item xs={10} md={8}>
            <ReadMoreText
              // useReadMore={true}
              // limit={350}
              headerText={
                " Crafting Trust, Adorning Generations: 197 Years of Timeless Elegance"
              }
            >
              Welcome to Chandukaka Saraf Jewels - India's Premier Jeweller
              Since 1827. Step into a world where tradition meets elegance. For
              almost 200 years, we've been creating stunning jewellery and
              earning the trust of customers across India. Our journey began in
              1827 when Shri Chandulal Shah opened our first store in Baramati.
              His dedication to quality and honest business set the stage for
              our long-standing success. With nearly two centuries of
              experience, we've become a household name in Western Indian
              jewellery. Recognized as the 'Most Trusted Jewellery Brand of
              Maharashtra' our family-owned business takes pride in its rich
              heritage, passing down expertise and values through generations.
              We're not just about beautiful jewellery – we're about trust,
              ethics, and making our customers happy. At Chandukaka Saraf
              Jewels, we love blending old-world craftsmanship with fresh,
              modern designs. Our goal is to create jewellery that adds sparkle
              to life's special moments. Whether you're celebrating a milestone
              or treating yourself, our jewellery tells a story – one that's
              been in the making since 1827. Come explore our collection and be
              part of our continuing legacy. At Chandukaka Saraf Jewels, you're
              not just a customer – you're family.
            </ReadMoreText>
          </Grid>
        </Grid>
      </Box>
      <Box className="box-about-us" sx={{ flexGrow: 1 }}>
        <BlogSectionWithSideImage
          headerText={" Celebrating Excellence: Crafting Timeless Treasures"}
          descriptionText={
            "Renowned for our exclusive jewellery collections, we epitomize a tradition of excellence that spans generations. Pioneers in the industry, we were the first jeweller in India to introduce the revolutionary karatmeter, ensuring unparalleled transparency and purity in every creation. Our approach seamlessly blends contemporary aesthetics with timeless craftsmanship, resulting in a fusion of styles that captivates the discerning eye.. This extensive range includes jewellery crafted from gold, silver, platinum, diamonds, gemstones, and pearls.Our jewellery reflects our distinctive touch, combining innovative designs with traditional craftsmanship to create pieces that are both timeless and contemporary."
          }
          Item={Item}
          imageSrc={ourSpecality}
          isImageFirst={true}
          mobileViewImageFirst={true}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>

          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
          <Grid
            className="our-specialities-container about-us-full-screen-description"
            item
            xs={10}
            md={10}
          ></Grid>
          <Grid item xs={1} md={1}>
            <Item className="empty-container-section">xs=6 md=4</Item>
          </Grid>
        </Grid>
      </Box>
      <Box
        className="large-image-slider-container treasured-stories-background"
        sx={{ flexGrow: 1 }}
        style={{ backgroundImage: `url(${TreasuredStoriesBackground})` }}
      >
        <AwardsAndRecognition Item={Item} />
      </Box>
      <Box className="box-about-us about-us-last-element" sx={{ flexGrow: 1 }}>
        <BlogSectionWithSideImage
          headerText={"Making a Difference: Building a Better Future"}
          descriptionText={
            <>
              "We are proud to contribute significantly to society through our
              philanthropic initiative, the Sou. Kusum & Shri. Jindatta Shah
              Welfare Foundation. This foundation is dedicated to advancing
              education, particularly by empowering girls with access to quality
              schooling. We also promote social hygiene and environmental
              cleanliness, fostering a healthier community environment.As part
              of our corporate social responsibility (CSR) efforts, we provide
              generous support to a diverse range of organizations in need. This
              commitment underscores our dedication to societal improvement and
              our desire to make a meaningful impact on countless lives. By
              investing in these areas, we aim to foster positive change and
              inspire others to join us in building a more equitable world.In
              addition, CS Jewels has proactively supported sacred animal
              communities. In 2020, we established the Dayoday Goshala in
              Baramati, which provides shelter and sustenance to over 250 cows
              year-round. This initiative highlights our commitment to animal
              welfare and support. Learn more about this project at,"
              <a
                href="https://dayoday.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dayoday Goshala
              </a>
              .
            </>
          }
          Item={Item}
          imageSrc={SocietyContributionImage}
          isImageFirst={true}
          mobileViewImageFirst={true}
        />
      </Box>
    </div>
  );
}
