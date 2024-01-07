import React, { useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Divider,
  Fade,
  Grid,
  Typography,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import productImage from "../../../images/productImage.png";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";

const ConfirmationDialog = ({ onConfirm, open, handleClose }) => {

  const handleYesClick = () => {
    // Todo: Handle remove from the wishlist logic here
    onConfirm(true);
    handleClose();
  };

  const handleNoClick = () => {
    console.log("User clicked No!");
    onConfirm(false);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box className="box-style" style={{ border: "12px solid #ede5e5" }}>
          <DialogActions>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <DialogContentText
              className="text-center"
              sx={{ fontSize: "18px", color: "#666666" }}
            >
              Are you sure you want to remove the following product from the
              wishlist?
            </DialogContentText>

            <div className="product-information p-3">
              <Divider
                variant="fullWidth"
                style={{ backgroundColor: "#666666" }}
              />
              <Grid container className="container p-3" sx={{ width: "80%" }}>
                <Grid item xs={6}>
                  <img
                    src={productImage}
                    style={{ height: "81px", width: "81px" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#333333",
                      fontWeight: "900",
                      letterSpacing: "1.2px",
                    }}
                  >
                    Product name
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#333333",
                      fontWeight: "700",
                      letterSpacing: "1.2px",
                    }}
                  >
                    &#8377; 1200.00
                  </Typography>
                </Grid>
              </Grid>
              <Divider
                variant="fullWidth"
                style={{ backgroundColor: "#666666" }}
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Grid
              container
              spacing={3}
              sx={
                {
                  justifyContent: 'center',
                  mb: 4
                }
              }
            >
              <Grid item xs={6} md={3}>
                <Button
                  onClick={handleNoClick}
                  variant="outlined"
                  className="btn btn-block outlined-black"
                  fullWidth
                >
                  Cancel
                  <EastIcon />
                </Button>
              </Grid>

              <Grid item xs={6} md={3}>
                <Button
                  className="btn btn-block bg-black"
                  fullWidth
                  onClick={handleYesClick}
                >
                  Yes &nbsp;
                  <EastIcon />
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmationDialog;
