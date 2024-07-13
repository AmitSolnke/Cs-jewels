import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../hooks";

export const NavigationDropdown = ({ metalData, setShowDropdown }) => {
  const navigate = useNavigate();

  const closeModal = (metalId, itemId) => {
    navigate(`/product-catalogues?metal=${metalId}&item_type=${itemId}`);
    setShowDropdown(false);
  };
  useScrollToTop();

  useEffect(() => {
    $(".navigation-dropdown-wrapper .menu-links").click(function (e) {
      $(".mobile-menu-overlay").css("width", "0");
    });
  });

  return (
    <Box>
      <Grid>
        <div className="navigation-dropdown-wrapper p-4">
          <div className="jewellery-links">
            {metalData.map((data, index) => {
              return (
                <div className="catergory-section" key={index}>
                  <div
                    variant="h5"
                    color="initial"
                    className="jewellwery-type mb-4 menu-links"
                    onClick={() => closeModal(data.id, 0)}
                  >
                    {data.metal}
                  </div>
                  <div className="jewelleries">
                    {data.metal_items.map((item, key) => (
                      <div className="" key={key}>
                        <div
                          className="jewellery-link menu-links"
                          onClick={() => closeModal(data.id, item.id)}
                        >
                          {item.item_name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="category-section"></div>
          </div>
          {/* <div className="bestsellers-section">
                <div>
                  <img
                    src="https://source.unsplash.com/random/300x300?jewellery=1"
                    alt=""
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <CardContent className="overlay-text">
                    <Typography variant="h5" component="div">
                      Meet our bestsellers
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SHOP NOW
                    </Typography>
                  </CardContent>
                </div>
              </div> */}
        </div>
      </Grid>
    </Box>
  );
};
