import { Box, Button, styled } from "@mui/material";

export const GDPButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "51%",
  right: "21%",
  height: "2rem",
  width: "7.5rem",
  fontSize: "0.6rem",
  background: "#76242c",
  zIndex: 2,
  color: "#fff",

  [theme.breakpoints.up("sm")]: {
    right: "22%",
    height: "3rem",
    width: "10.5rem",
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "15rem",
  },
  [theme.breakpoints.down(450)]: {
    right: "20%",
    width: "auto",
    height: "auto",
  },
}));
export const GEButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "58%",
  right: "25%",
  height: "2rem",
  width: "7.5rem",
  fontSize: "0.6rem",
  background: "#76242c",
  zIndex: 2,
  color: "#fff",

  [theme.breakpoints.up("sm")]: {
    right: "25%",
    height: "3rem",
    width: "10.5rem",
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "15rem",
  },
  [theme.breakpoints.down(450)]: {
    right: "25%",
    width: "auto",
    height: "auto",
  },
}));
export const ImageButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "58%",
  right: "26%",
  height: "1rem",
  width: "6rem",
  fontSize: "0.6rem",
  zIndex: 2,
  color: "#fff",
  backgroundColor: "transparent",
  cursor: "pointer",

  [theme.breakpoints.up("sm")]: {
    right: "25%",
    height: "2rem",
    width: "9rem",
    fontSize: "0.9rem",
  },

  [theme.breakpoints.up("md")]: {
    right: "26%",
    top: "60%",
    height: "2.4rem",
    width: "12rem",
  },

  [theme.breakpoints.up("lg")]: {
    right: "26%",
    top: "60%",
    height: "2.4rem",
    width: "14rem",
  },
  [theme.breakpoints.down(450)]: {
    right: "25%",
    width: "5rem",
    height: "0.7rem",
  },
}));
export const ImageButtonGDS = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "52%",
  right: "23%",
  height: "1rem",
  width: "6rem",
  fontSize: "0.6rem",
  zIndex: 2,
  color: "#fff",
  backgroundColor: "transparent",
  cursor: "pointer",

  [theme.breakpoints.up("sm")]: {
    right: "23%",
    height: "2rem",
    width: "7rem",
    fontSize: "0.9rem",
  },

  [theme.breakpoints.up("md")]: {
    right: "23%",
    top: "54%",
    height: "2.4rem",
    width: "10rem",
  },

  [theme.breakpoints.up("lg")]: {
    right: "23%",
    top: "54%",
    height: "2.4rem",
    width: "12rem",
  },

  [theme.breakpoints.down(450)]: {
    right: "22%",
    width: "4rem",
    height: "0.7rem",
  },
}));
