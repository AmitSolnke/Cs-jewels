import React from "react";
import { Box, Grid, Divider,styled,Paper,Card,CardContent,CardMedia,Button,Typography } from "@mui/material";
import { Pagination } from "@mui/material";
import {  } from "@mui/material/styles";
import facebookIcon from "../../images/icons/social-media/facebook.svg";
import instagramIcon from "../../images/icons/social-media/instagram.svg";
import twitterIcon from "../../images/icons/social-media/twitter.svg";
import aboutUsTitleImage from "../../images/aboutUsTitleImage.png";
import useWindowWidthAndHeight from "../../utilities/CustomHooks";
import TreasuredStoriesBackground from "../../images/TreasuredStoriesBackground.png";
import newimages from "../../images/SocietyContribution.png";


const data = [
  {
    id: 1,
    photos: require("../../images/MaskGroup24.png"),
    text: "Are diamond a good investment tody and in the feture",
  },
  {
    id: 2,
    photos: require("../../images/MaskGroup24.png"),
    text: "Are diamond a good investment tody and in the feture",
  },
  {
    id: 3,
    photos: require("../../images/MaskGroup24.png"),
    text: "Are diamond a good investment tody and in the feture",
  },
  {
    id: 4,
    photos: require("../../images/MaskGroup24.png"),
    text: "Are diamond a good investment tody and in the feture",
  },
  {
    id: 1,
    photos: require("../../images/MaskGroup24.png"),
    text: "Are diamond a good investment tody and in the feture",
  },
  {
    id: 2,
    photos: require("../../images/MaskGroup24.png"),
    text: "Are diamond a good investment tody and in the feture",
  },
  {
    id: 3,
    photos: require("../../images/MaskGroup24.png"),
    text: "Are diamond a good investment tody and in the feture",
  },
  {
    id: 4,
    photos: require("../../images/MaskGroup24.png"),
    text: "Are diamond a good investment tody and in the feture",
  },
  // Add more data as needed
];
const NewsAndBlogs = () => {
  const [page1, setPage1] = React.useState(1);
  const handleChange1 = (event, value) => {
    setPage1(value);
  };
  
  const windoDimensions = useWindowWidthAndHeight();
  return (
    <div className="col-12 about-us">
      <div
        className="head-text-about-us"
        style={{ backgroundImage: `url(${aboutUsTitleImage})` }}
      >
        <span   >
          {" "}
         <small ><b style={{ color:"white"}}> DIAMOND RING BUYING GUIDE:TOP FIVE THINGS TO CONSIDER </b></small><br></br>
          <span style={{ color:"white"}}>READ ON</span>
        </span>
      </div>

      <div className="col-12 about-us">
        {/* ... other code ... */}

        <div className="row-news">
          <div className="column-news">
            <div className="image-container-news">
              <img src={newimages} alt="Snow" className="gallery-image-news" />
              <div className="image-text-news ">
               <span> HOW TO TAKE CARE OF OXIDIZED JEWELLERY </span>
                <p className="text-center">READ ON</p>
              </div>
            </div>
          </div>
          <div className="column-news">
            <div className="image-container-news">
              <img src={newimages} alt="Snow" className="gallery-image-news" />
              <div className="image-text-news text-center">
                HOW TO TAKE CARE OF OXIDIZED JEWELLERY
                <p className="text-center">READ ON</p>
              </div>
            </div>
          </div>
          <div className="column-news">
            <div className="image-container-news">
              <img src={newimages} alt="Snow" className="gallery-image-news" />
              <div className="image-text-news text-center">
                HOW TO TAKE CARE OF OXIDIZED JEWELLERY
                <p className="text-center">hsdv</p>
              </div>
            </div>
          </div>

          {/* Repeat similar code for other columns */}
        </div>

        {/* ... other code ... */}
      </div>

      <Box
        className=" treasured-stories-background"
        sx={{ flexGrow: 1 }}
        style={{ backgroundImage: `url(${TreasuredStoriesBackground})` }}
      >
        <div className="container p-3">
          <div className="row">
            <div className="col-6 ">
              <img
                src={newimages}
                alt="Snow"
                width={50}
                height={50}
                className="gallery-image-blog"
              />
            </div>
            <div
              className="col-6"
              style={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div>
                {" "}
                <p className="image-text-blog">NEWS ARTICLE</p>
                <span className="image-text-blog">
                  {" "}
                  <b>DIAMOND RING BUING GUIDE :TOP FIVE</b>
                </span>
                <p className="image-text-blog">
                  {" "}
                  <b>THING TO CONSIDER</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-blog p-5 "  sx={{ backgroundColor:'red'}}>
      <div className="image-container-blog">
        <img src={newimages} alt="Snow" width={50} height={50} className="gallery-image-blog" />
      </div>
      <div className="text-container-blog">
        <p className="image-text-blog">NEWS ARTICLE</p>
        <em className="image-text-blog"> <b>DIAMOND RING BUING GUIDE :TOP FIVE</b></em>
        <p className="image-text-blog"> <b>THING TO CONSIDER</b></p>

        <p className="image-text-blog"> <b>READ ON</b></p>
 
      </div>
  </div>  */}
      </Box>

      <div className="text-center mt-3">
        <p>FOLLOW @ CHANDUKAKASARAF</p>
        <img
          src={facebookIcon}
          alt="facebookIcon"
          className="social-media-icon icon-space "
        />
        <img
          src={instagramIcon}
          alt="instagramIcon"
          className="social-media-icon icon-space"
        />
        <img
          src={twitterIcon}
          alt="twitterIcon"
          className="social-media-icon icon-space"
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Divider style={{ flex: "1", marginLeft: "10px", color: "black" }} />{" "}
          {/* Line in front of the text */}
          <Box>
            <p className="mt-3">ALL ARTICLES</p>
          </Box>
          <Divider style={{ flex: "1", marginRight: "10px" }} />{" "}
          {/* Line after the text */}
        </div>
      </div>

      {/*  Follwe code start */}
      <div className="container">
        <div className="row mt-4">
          {data.map((item) => (
            <div key={item.id} className="col-3">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 240 }}
                  image={item.photos}
                  title="green iguana"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </CardContent>

                <Button size="small">READ ON</Button>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/*   pagination code  */}
      <div className="p-4">      
      <Box sx={{ margin: "auto", width: "fit-content", justifyContent: "left" }}>
        <Pagination count={10} page={page1} onChange={handleChange1} />
      </Box>
    </div>

    </div>
  );
};

export default NewsAndBlogs;
