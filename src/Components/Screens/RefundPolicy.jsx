import React from "react";
import { Box, Divider, Grid } from "@mui/material";

function RefundPolicy() {
  return (
    <div className="terms-and-condition">
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
            <div className="privacy-policy-header-text">
              ONLINE RETURN POLICY
            </div>
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
              ONLINE CANCELLATION POLICY
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
      <Box className="privacy-policy-container" sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={4}>
            <div className="empty-container-section">xs=6 md=4</div>
          </Grid>
          <Grid item xs={10} md={4}>
            <div className="privacy-policy-header-text text-uppercase">
              Scheme Cancellation Policy
            </div>
            <div className="privacy-policy-normal-text">
              <ol className="ps-3">
                <li>
                  Customer will get full refund of the principal amount
                  deposited in the scheme by visiting nearest branch and after
                  submission of original Passbook with valid Id proof.
                </li>

                <li className="privacy-policy-normal-text">
                  The amount will be paid only through online transfer to
                  customer’s personal bank account only.
                </li>
              </ol>
            </div>
            <Divider className="divider-privacy-policy" />
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
