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
    <Grid container spacing={4} className="custom-scrollbar">
      {metalData.map((data, index) => (
        <Grid
          item
          key={index}
          xs={12}
          md={3}
          sm={6}
           sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            className="jewellwery-type"
          >
            {data.metal}
          </Typography>

          <div
           className='jewelleries'
          >
            {data.metal_items.map((item, key) => (
              <div
                key={key}
                onClick={() => closeModal(data.id, item.id)}
                className='jewellery-link'
              >
                {item.item_name}
              </div>
            ))}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
