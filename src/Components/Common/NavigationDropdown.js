import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../hooks";

export const NavigationDropdown = ({ metalData, setShowDropdown }) => {
  const navigate = useNavigate();
  const page = 1;

  const closeModal = (metalId, itemId) => {
    navigate(`/product-catalogues?page=${page}&metal=${metalId}&item_type=${itemId}`);
    setShowDropdown(false);
  };

  useScrollToTop();

  return (
    <Grid container spacing={4} sx={{ width: "100%" ,height:'90dvh',overflowY:'scroll',paddingY:'1rem'}} className="custom-scrollbar">
      {metalData.map((data, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "17px",
              letterSpacing: "1.95px",
              textTransform: "uppercase",
              color: "#333",
              textAlign: "left",
              fontFamily: `'Afacad Flux', serif`,
            }}
          >
            {data.metal}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, auto)",
              columnGap: "2rem",
              rowGap: "0.6rem",
              fontSize: "16px",
              fontFamily: `'Afacad Flux', serif`,
              letterSpacing: "1.3px",
              color: "#333",
            }}
          >
            {data.metal_items.map((item, key) => (
              <Box
                key={key}
                onClick={() => closeModal(data.id, item.id)}
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                  textAlign:'left'
                }}
              >
                {item.item_name}
              </Box>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
