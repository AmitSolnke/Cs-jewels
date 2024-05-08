import React from "react";
import { Box, Divider, Grid } from '@mui/material'

export default function PrivacyPolicy() {
  return (
    <div className='about-us'>
      <Box className="privacy-policy-container" sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={4}>
            <div className="empty-container-section">xs=6 md=4</div>
          </Grid>
          <Grid item xs={10} md={4}>
            <div className="privacy-policy-main-header-text">
              Privacy Policy
            </div>
            <div className="privacy-policy-normal-text">
              We respect your privacy. Our privacy policy below is meant to help you understand what information we collect about you and how we use it.
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
              INFORMATION COLLECTED
            </div>
            <div className="privacy-policy-normal-text">
              At times, you may decide to provide us with your personal information. We receive and store all the information provided by the customer. Personal information includes name, surname, billing address or email address. In addition to your contact information, we may collect information about your purchases, shipping address, gender, occupation, birthday, marital status, anniversary, interests, phone number or other contact information, and credit card information. We may combine the information you provide to us over time and we may combine such information with information that is publicly available, collected through data collection devices, and information that we receive from our partners, affiliates and other third parties.
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
              USES OF YOUR INFORMATION
            </div>
            <div className="privacy-policy-normal-text">
              When you place an order on the website and enter your name and details, you will become a recognised user, and we will send a cookie to your computer. A cookie is a small file that may be placed on your computer's hard disk for record-keeping purposes. Cookies do not contain any information that can personally identify you. They help us to recognise you when you visit the website and make use of the service so that the service can be tailored to your needs.

              By using cookies, we can make your online experience more efficient. For example, cookies allow you to store your chosen items in your shopping basket, without losing them between visits.This  makes your checkout process faster and smoother.

              We will also use cookies for the compilation of certain statistics (which do not identify you personally) related to our customers’ use of the website. Such information may include the number of visits, average time spent, and other statistics relating to the website.
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
              DISCLOSURE: CONFIDENTIALITY OF YOUR INFORMATION
            </div>
            <div className="privacy-policy-normal-text">
              We will never release your personal details to any outside company for mailing or marketing purposes. Payments on the website are processed by a third party, which adheres to the privacy policy that is set out here. We have a non-disclosure agreement with this third party, and they are certified by all the major card issuers to hold details securely.
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
  )
}