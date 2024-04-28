import React, {useState, useEffect} from "react";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const NavigationDropdown = ({metalData, setShowDropdown}) => {

  const closeModal = () => {
    setShowDropdown(false)
  }
  
  return (
    <Box>
      <Grid>
        <div className="navigation-dropdown-wrapper p-4">
          <div className="jewellery-links">
            {metalData.map((data, index) => {
              return (
                <div className="catergory-section" key={index}>
                  <Link
                    variant="h5"
                    color="initial"
                    className="jewellwery-type mb-4"
                    to={`/bullions?metal=${data.metal}`}
                    onClick={closeModal}
                  >
                    {data.metal}
                  </Link>
                  <div className="jewelleries">
                    {data.metal_items.map((item, key) => (
                      <div className="" key={key}>
                        <Link className="jewellery-link" to={`/bullions?metal=${data.id}&item_type=${item.item_name}`} onClick={closeModal}>
                          {item.item_name}
                        </Link>
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
