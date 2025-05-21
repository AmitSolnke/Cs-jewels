import { Box, Button, Container, Stack, Typography } from "@mui/material";
import {
  BookYourGold,
  GoldenEra,
  InvestingInGold,
  MoreFeatures,
} from "../../../images/SchemeImages";
import { handleDownload } from "../../../utilities/handleDownload";
import {  ImageButton } from "./style";

const GoldenEraScheme = () => {
  return (
      <Stack gap={2} sx={{ width: "100%", height: "100%" , my: 2 }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <img
            src={GoldenEra}
            alt="GoldenEra"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box>
          <Stack gap={2}>
            <Box marginInline={"auto"}>
              <Typography
                fontWeight={600}
                fontSize={{ xs: "1rem", sm: "2rem" }}
              >
                More Gold, More Gains-GES!
              </Typography>
            </Box>
            <img
              src={InvestingInGold}
              alt="InvestingInGold"
              style={{ width: "100%", height: "100%" }}
            />
            <Box marginInline={"auto"}>
              <Button
                variant="contained"
                onClick={() =>
                  handleDownload("/Brouchures/GoldenEra.pdf", "GoldenEra.pdf")
                }
                sx={{
                  backgroundColor: "#672A2F",
                  "&:hover": {
                    backgroundColor: "#5b2429",
                  },
                }}
              >
                Download Brochure
              </Button>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ width: "100%", height: "100%" }}>
          <img
            src={MoreFeatures}
            alt="MoreFeatures"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
          <img
            src={BookYourGold}
            alt="BookYourGold"
            style={{ width: "100%", height: "100%" }}
          />
          <ImageButton role="button" onClick={() => window.location.href = 'tel:+917969991827'}/>
        </Box>
      </Stack>
  );
};

export default GoldenEraScheme;
