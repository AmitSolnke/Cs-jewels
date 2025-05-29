import { Box, Stack, Typography, Button, useMediaQuery } from "@mui/material";
import {
  CSJEWELS_Light,
  MobRitiCollectionBanner,
  RitiCollectionBanner,
  RitiCollectionCoverBanner,
  RitiLogo,
} from "../../../images/imageConstants";
import { Link } from "react-router-dom";
import VideoPlayer from "../../Common/VideoPlayer";
import logo from "../../../images/icons/CSJ_Logo_Brand_color_Eng_final.webp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";

const participationSteps = [
  {
    id: 1,
    step: (
      <>
        Follow{" "}
        <a
          href="https://www.instagram.com/csjewelsofficial/"
          style={{ textDecoration: "none", fontWeight: 600 }}
        >
          @csjewelsofficial
        </a>{" "}
        and{" "}
        <span style={{ color: "#0d6efd", fontWeight: 600 }}>
          @csmusicoriginals
        </span>{" "}
        on Instagram.
      </>
    ),
  },
  {
    id: 2,
    step: (
      <>
        Shoot your reel with the <strong>hook step</strong> shown below on{" "}
        <strong>Sadicha Padar</strong> song.
      </>
    ),
  },
  {
    id: 3,
    step: (
      <>
        Use traditional or fusion outfits to reflect your{" "}
        <strong>personal style</strong> and the song’s vibe.
      </>
    ),
  },
  {
    id: 4,
    step: (
      <>
        Post on your Instagram, tag{" "}
        <a
          href="https://www.instagram.com/csjewelsofficial/"
          style={{ textDecoration: "none", fontWeight: 600 }}
        >
          @csjewelsofficial
        </a>{" "}
        &{" "}
        <span style={{ color: "#0d6efd", fontWeight: 600 }}>
          @csmusicoriginals
        </span>{" "}
        and use{" "}
        <span style={{ color: "#0d6efd", fontWeight: 600 }}>
          #SadichaPadarChallenge
        </span>{" "}
        hashtag.
      </>
    ),
  },
  {
    id: 5,
    step: (
      <>
        <strong>Every look has a story.</strong> Share yours in the caption —
        tell us about your outfit and what inspired it.
      </>
    ),
  },
];

const compaignTAC = [
  {
    id: 1,
    condition: (
      <>
        <strong>Eligibility Criteria:</strong> Open to all participants aged 18
        years and above.
      </>
    ),
  },
  {
    id: 2,
    condition: (
      <>
        <strong>Contest Period:</strong> 30th May to 11th June 2025.
      </>
    ),
  },
  {
    id: 3,
    condition: (
      <>
        <strong>Content Guidelines:</strong> Entries must use the official
        Sadicha Padar audio and include the hashtag{" "}
        <span style={{ color: "#0d6efd", fontWeight: 600 }}>
          #SadichaPadarChallenge
        </span>
      </>
    ),
  },
  {
    id: 4,
    condition: (
      <>
        <strong>Judging Criteria:</strong> Based on creativity and engagement.
      </>
    ),
  },
  {
    id: 5,
    condition: (
      <>
        <strong>Winner Announcement Date:</strong> 16th June 2025.
      </>
    ),
  },
  {
    id: 6,
    condition: (
      <>
        <strong>Disclaimer:</strong> All rights reserved by Chandukaka Saraf
        Jewels, Pune.
      </>
    ),
  },
];

const RitiJewellery = () => {
  const isMobile = useMediaQuery("(max-width:450px)");
  const pdfURL =
    "https://drive.google.com/uc?export=download&id=14Wn-KblBBTYlPg6aOs8faFjXbKjFNej9";

  return (
    <>
      <Stack
        gap={4}
        className="ritijewellery"
        sx={{
          width: "100%",
          height: "100%",
          paddingBottom: "3rem",
          backgroundColor: "#fff8f2",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <img
            src={isMobile ? MobRitiCollectionBanner : RitiCollectionBanner}
            alt="RitiCollectionBanner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Stack gap={4} sx={{ width: "100%", px: { md: "15rem", xs: "1rem" } }}>
          <Stack gap={2}>
            <Typography
              variant="h4"
              fontWeight={700}
              textAlign="start"
              fontFamily={'"Vidaloka", serif'}
            >
              About the Challenge
            </Typography>
            <Typography
              variant="body1"
              lineHeight={1.8}
              sx={{ fontFamily: "'Poppins', 'Arial, sans-serif'" }}
            >
              The{" "}
              <span style={{ color: "#0d6efd", fontWeight: 600 }}>
                #SadichaPadarChallenge
              </span>{" "}
              celebrates the elegance of timeless traditions through the soulful{" "}
              <strong>Sadicha Padar</strong> song by CS Music. In collaboration
              with the <strong>Riti Collection</strong> by{" "}
              <strong>Chandukaka Saraf Jewels</strong>, this campaign honors
              culture, heritage, and the bride’s emotional journey — inviting
              you to express it through dance and stand a chance to win a{" "}
              <strong>beautiful piece</strong> from the collection.
            </Typography>
          </Stack>

          <Stack gap={2}>
            <Typography
              variant="h4"
              fontWeight={700}
              textAlign="start"
              fontFamily={'"Vidaloka", serif'}
            >
              How to Participate
            </Typography>
            <Stack component="ul" gap={1} pl={"1.5rem"}>
              {participationSteps.map((item) => (
                <li key={item.id}>
                  <Typography
                    variant="body1"
                    lineHeight={1.7}
                    sx={{ fontFamily: "'Poppins', 'Arial, sans-serif'" }}
                  >
                    {item.step}
                  </Typography>
                </li>
              ))}
            </Stack>
          </Stack>

          <Stack gap={2}>
            <Typography
              variant="h4"
              fontWeight={700}
              textAlign={"start"}
              fontFamily={'"Vidaloka", serif'}
            >
              Hook Step Video
            </Typography>
            <Stack gap={"1rem"}>
              <VideoPlayer />
              <Stack textAlign="center" gap={"0.3rem"}>
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#662a2e",
                      fontFamily: '"Poppins", serif',
                      textTransform: "none",
                      height: { md: "2.5rem", xs: "auto" },
                      padding: "0.7rem 1.5rem",
                      "&:hover": {
                        backgroundColor: "#5b2429",
                      },
                    }}
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/reels/audio/511362965366790?igsh=MWRwOTR5enQ5dGNicA==",
                        "_blank"
                      )
                    }
                  >
                    Use this Audio 🎵
                  </Button>
                </Box>
              </Stack>
            </Stack>

            <Stack gap={2}>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign={"start"}
                fontFamily={'"Vidaloka", serif'}
              >
                Prizes
              </Typography>
              <Typography
                variant="body1"
                lineHeight={1.8}
                sx={{ fontFamily: "'Poppins', 'Arial, sans-serif'" }}
              >
                Top 2 Winners will receive{" "}
                <strong>exclusive Riti Jewellery pieces</strong> from the Riti
                collection and get <strong>featured on our social media</strong>{" "}
                pages.
              </Typography>
            </Stack>
            <Stack gap={2}>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="start"
                fontFamily={'"Vidaloka", serif'}
              >
                Terms & Conditions
              </Typography>
              <Stack component="ul" gap={1} pl={"1.5rem"}>
                {compaignTAC.map((item) => (
                  <li key={item.id}>
                    <Typography
                      variant="body1"
                      lineHeight={1.8}
                      sx={{ fontFamily: "'Poppins', 'Arial, sans-serif'" }}
                    >
                      {item.condition}
                    </Typography>
                  </li>
                ))}
              </Stack>
            </Stack>

            <Box position={"relative"}>
              <img
                src={RitiCollectionCoverBanner}
                alt="RitiCollectionCoverBanner"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                component={"a"}
                href="https://www.instagram.com/csjewelsofficial/"
                sx={{
                  position: "absolute",
                  bottom: { xs: "12%", lg: "13%" },
                  left: "35%",
                  height: { xs: "1rem", lg: "2rem", xl: "3rem" },
                  width: { xs: "6rem", sm: "10rem", lg: "15rem", xl: "20rem" },
                }}
              ></Box>
            </Box>

            <a
              href={pdfURL}
              download
              style={{
                textDecoration: "none",
                width: "fit-content",
                marginInline: "auto",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#662a2e",
                  fontFamily: '"Poppins", serif',
                  textTransform: "none",
                  height: { sm: "3rem", xs: "auto" },
                  padding: "0.7rem 1.5rem",
                  display: "flex",
                  gap: "0.3rem",
                  "&:hover": {
                    backgroundColor: "#5b2429",
                  },
                }}
              >
                <span
                  style={{
                    textTransform: "capitalize",
                    fontFamily: '"Poppins", serif',
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  Download Riti Collection
                </span>
                <img
                  src={RitiLogo}
                  alt="Riti Logo"
                  style={{
                    width: "2.2rem",
                    height: "2.2rem",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                />
              </Button>
            </a>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={{ sm: "row" }}
        justifyContent={"space-between"}
        padding={{ xs: "1rem", sm: "2rem" }}
        gap={{ xs: "1rem" }}
        my={"1rem"}
        style={{
          boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#F1EFFF",
          color: "#333333",
        }}
      >
        <div className="logo" style={{ textAlign: "center" }}>
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="site-logo image text-center"
            />
          </Link>
        </div>
        <div className="social-media-wrapper d-block text-center text-md-start">
          <h6 style={{ fontFamily: "'Poppins', 'Arial, sans-serif'" }}>
            Follow us on
          </h6>
          <div className="d-flex gap-3 justify-content-center justify-content-md-start">
            <a
              href="https://www.facebook.com/csjewel1827"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon
                sx={{
                  color: "#662a2e",
                }}
                fontSize="large"
              />
            </a>

            <a
              href="https://www.instagram.com/csjewelsofficial/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon
                color="primary"
                fontSize="large"
                sx={{
                  color: "#662a2e",
                }}
              />
            </a>
            <a
              href="https://www.youtube.com/@csjewels1827"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon
                color="primary"
                fontSize="large"
                sx={{
                  color: "#662a2e",
                }}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/chandukaka-saraf-jewels/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon
                color="primary"
                fontSize="large"
                sx={{
                  color: "#662a2e",
                }}
              />
            </a>
            <a
              href="https://pin.it/5AOLorOQj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PinterestIcon
                color="primary"
                fontSize="large"
                sx={{
                  color: "#662a2e",
                }}
              />
            </a>
          </div>
        </div>
      </Stack>
    </>
  );
};

export default RitiJewellery;
