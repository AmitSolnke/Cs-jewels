import { Box, Divider, Grid, List, ListItem } from '@mui/material'
import React from 'react'

export default function TermsAndCondition() {
    return (
        <div className='about-us'>
            <Box className="privacy-policy-container" sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={1} md={4}>
                        <div className="empty-container-section">xs=6 md=4</div>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <div className="privacy-policy-main-header-text">
                            TERMS & CONDITIONS
                        </div>
                        <div className="privacy-policy-normal-text">
                            We abide by the laws of the land in all our transactions. Take a look at the terms and conditions that apply when doing a transaction with us.
                        </div>
                        <Divider className='divider-privacy-policy' />
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
                            Money laundaring act
                        </div>
                        <div className="privacy-policy-normal-text">
                            As per Prevention of Money Laundering Act 2002, a copy of Aadhaar Card & PAN Card has been made mandatory for any transaction of an amount equal to or exceeding rupees two lakh, whether conducted as a single transaction or several transactions that appear to be connected.
                        </div>
                        <Divider className='divider-privacy-policy' />
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
                            To cancel order
                        </div>
                        <div className="privacy-policy-normal-text">
                            <List className='privacy-policy-list' sx={{ listStyleType: 'disc' }}>
                                <ListItem sx={{ display: 'list-item' }}>
                                    Order will be treated as CANCELLED, if the patron fails to confirm the order within 5 days.
                                </ListItem>
                                <ListItem sx={{ display: 'list-item' }}>
                                    To cancel an order, please send an email to care@csjewels.com within 2 days of the confirmation of the order. Please include the order ID in the subject line.
                                </ListItem>
                            </List>
                        </div>
                        <Divider className='divider-privacy-policy' />
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
                            Site content
                        </div>
                        <div className="privacy-policy-normal-text">
                            The site and all content and other materials including, without limitation, the Chandukaka Saraf & Sons Pvt. Ltd. Jewellerys logo, and all designs, text, graphics, pictures, selection, coordination, ‘look and feel’, information, data, software, audio files, video files, other files and the selection and arrangement thereof (collectively, the “Site Materials”) are the proprietary property of Chandukaka Saraf & Sons Pvt. Ltd. and are protected by trade dress, copyright, patent and trademark laws, and various other intellectual property rights and unfair competition laws. Products must reach us without any damage during transit. Products should be properly packaged and insured. Once we receive the product, we will refund your amount to you after deducting the shipping charges and bank transaction fees from the invoice value. The remaining amount will be refunded to the same account, which was used for making the payment.
                        </div>
                        <div className="privacy-policy-normal-text">
                            The customer agrees not to dispute the decision made by Chandukaka Saraf & Sons Pvt. Ltd. and accepts our decision regarding the returns policy. Disputes of any nature will come under Pune-India jurisdiction.
                        </div>
                        <Divider className='divider-privacy-policy' />
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
                            Information on our site
                        </div>
                        <div className="privacy-policy-normal-text">
                            At Chandukaka Saraf & Sons Pvt. Ltd., we make every attempt to ensure that our online catalog is as accurate and complete as possible. In order to give you the opportunity to view our products in great detail, some products may appear larger or smaller than their actual size in our photographs. Moreover, since every computer monitor is set differently, color and size may vary slightly.
                        </div>
                        <div className="privacy-policy-normal-text">
                            Our objective is to provide you with as much information and detail about your prospective purchase as possible so that you can see the beauty and shape of a particular item. In compliance with industry standards and BIS (Bureau of Indian Standards) regulations, Chandukaka Saraf & Sons Pvt. Ltd. states that product total weight in all purchases may vary 0.05 grams for Gold ornaments and 0.1gm for Silver ornaments from the stated weight.
                        </div>
                        <div className="privacy-policy-normal-text">
                            On our website, we may provide the measurement of our products based on our manufacturing specifications. Slight tolerances may be accounted for based on the finishing during the manufacturing.
                        </div>
                        <Divider className='divider-privacy-policy' />
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
                            Product availability and pricing
                        </div>
                        <div className="privacy-policy-normal-text">
                            If you’re interested in a piece of jewellery that is currently on back order, we will call you and update you when the item will be back in stock. Sometimes with the number of orders we receive, an item may go out of stock before we are able to post a notification on the website. If this happens, we will contact you directly to discuss possible options.
                        </div>
                        <div className="privacy-policy-normal-text">
                            Data, including prices, may be inaccurately displayed on our website due to system or typographical errors. While we make every attempt to avoid these errors, they may occur. We reserve the right to correct any and all errors when they do occur, and we do not honor inaccurate or erroneous prices. If a product’s listed price is lower than its actual price, we will, at our discretion, either contact you for instructions before shipping the product or cancel the order and notify you of such cancellation. If the order has been shipped, you agree to either return the product or pay the difference between the actual and charged prices. Our prices are also subject to change without prior notice. We apologize for any inconvenience that this may cause. If you have any questions, please do not hesitate to contact one of our customer care executives at care@csjewels.com or call us on our toll free number 1800-267-0999.
                        </div>
                        <div className="privacy-policy-normal-text privacy-policy-last-text">
                            We do not negotiate prices on our products. All our prices are final.
                        </div>
                    </Grid>
                    <Grid item xs={1} md={4}>
                        <div className="empty-container-section">xs=6 md=4</div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
