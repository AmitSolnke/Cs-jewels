import React from "react";
import { Box, Grid } from "@mui/material";

function RefundPolicy() {
  return (
    <div className="about-us">
      <Box className="privacy-policy-container" sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={4}>
            <div className="empty-container-section">xs=6 md=4</div>
          </Grid>
          <Grid item xs={10} md={4}>
            <div className="privacy-policy-main-header-text">Policy</div>
            <hr />
          </Grid>
          <Grid item xs={1} md={4}>
            <div className="empty-container-section">xs=6 md=4</div>
          </Grid>
        </Grid>
      </Box>
      <Box className="privacy-policy-container" sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={4}>
            <div className="empty-container-section">xs=6 md=4</div>
          </Grid>
          <Grid item xs={10} md={4}>
            <div className="privacy-policy-header-text">RETURN POLICY</div>
            <div className="privacy-policy-normal-text">
              We offer an easy replacement option within 10 days of the delivery
              date.
            </div>
            {/* <Divider className='divider-privacy-policy' /> */}
            <hr />
          </Grid>
          <Grid item xs={1} md={4}>
            <div className="empty-container-section">xs=6 md=4</div>
          </Grid>
        </Grid>
      </Box>
      <Box className="privacy-policy-container" sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={4}>
            <div className="empty-container-section">xs=6 md=4</div>
          </Grid>
          <Grid item xs={10} md={4}>
            <div className="privacy-policy-header-text">
              CANCELLATION POLICY
            </div>
            <div className="privacy-policy-normal-text">
              <ol className="ps-3">
                <li>Orders can be canceled only before they are shipped.</li>
                <li>Bullion orders cannot be canceled.</li>
                <li>Cancellation charges apply once an order is placed.</li>
                <li>
                  Orders will be treated as canceled if the customer fails to
                  confirm within 5 days.
                </li>
                <li>
                  To cancel an order, please email at care@csjewels.com within 2
                  days of order confirmation, including the order ID in the
                  subject line.
                </li>
              </ol>
            </div>
            {/* <Divider className='divider-privacy-policy' /> */}
            <hr />
          </Grid>
          <Grid item xs={1} md={4}>
            <div className="empty-container-section">xs=6 md=4</div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default RefundPolicy;
