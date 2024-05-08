import React from 'react'
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import aboutUsTitleImage from "../../images/aboutUsTitleImage.png";
import ourSpecality from "../../images/ourSpecality.png";
import imageSliderHeaderIconRight from '../../images/icons/Group40.svg';
import aboutUsFullScreenBottomImage from '../../images/aboutUsFullScreenBottomImage.png';
import aboutUsFullScreenBottomImageMobileView from "../../images/aboutUsFullScreenBottomImageMobileView.png";
import useWindowWidthAndHeight from '../../utilities/CustomHooks';
import ReadMoreText from '../ReadMoreText';
import BlogSectionWithSideImage from '../BlogSectionWithSideImage';
import digitalSpace from '../../images/digitalSpace.png';
import TreasuredStoriesBackground from '../../images/TreasuredStoriesBackground.png';
import AwardsAndRecognition from '../AwardsAndRecognition';
import SocietyContributionImage from "../../images/about_us.jpg";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AboutUs() {
    const windoDimensions = useWindowWidthAndHeight();
    return (
        <div className='col-12 about-us'>
            <div className="head-text-about-us" style={{ backgroundImage: `url(${aboutUsTitleImage})` }}>
                <p> Legacy of indestructible tradition & customer trust for 196 years and counting </p>
            </div>
            <Box className="box-about-us" sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={1} md={2}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={10} md={8}>
                        <ReadMoreText useReadMore={true} limit={350} >
                            Chandukaka Saraf Jewels Pvt. Ltd. is one of the leading jewellerys in western India, carrying the fervour of crafting jewellery for more than 196 years. As an organization, we have been imparting trust among customers with a legacy of ethical business since 1827. Our foundation was laid by Honourable Shri Chandulal Shah in the prestigious city of Baramati in the 19th century, whose unsullied dedication was instrumental in attaining the initial reputation
                        </ReadMoreText>
                    </Grid>
                    <Grid item xs={1} md={2}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                </Grid>
            </Box>
            <Box className="box-about-us" sx={{ flexGrow: 1 }}>
                <BlogSectionWithSideImage
                    headerText={"Our Specialities"}
                    descriptionText={"Chanduakaka Saraf has truly set itself apart with a range of specialities that cater to the discerning tastes of their customers. Renowned for our jewellery designs in pure gold, we exemplify craftsmanship and excellence. We also hold the distinction of being the first jewellerys in India to introduce the use of a carat meter, ensuring utmost transparency and purity in our offerings. Our unique approach blends modern aesthetics seamlessly with traditional gold designs, resulting in an exquisite fusion of styles that appeal to a wide audience. Our distinctive touch can be seen in the incorporation of abstract motifs alongside traditional ones, creating pieces that are both classic and contemporary."}
                    Item={Item}
                    imageSrc={ourSpecality}
                    isImageFirst={true}
                    mobileViewImageFirst={true}
                />
            </Box>
            <Box className="box-about-us" sx={{ flexGrow: 1 }}>
                <BlogSectionWithSideImage
                    headerText={"Sprawling Wings on Digital Space"}
                    descriptionText={" We strongly believe in progressing as per customer penchant & preference and always try to breach the walls of limitations, so at this pace, we have spread our wings through eCommerce towards a new sky of the online shopping world to reach out to people with a vision of focusing on resolution of purity, where we have a vast range of jewellery products offering reliable quality through providing free, secure, and insured home delivery in all over India, while the expertise of serving offline has already brought us an award of ‘Most Trusted Jewellery of Maharashtra’."}
                    Item={Item}
                    imageSrc={digitalSpace}
                    isImageFirst={false}
                    mobileViewImageFirst={true}
                />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={10} md={10}>
                        <div className="bottom-full-image-about-us-container">
                            <img src={windoDimensions[0] <= 768 ? aboutUsFullScreenBottomImageMobileView : aboutUsFullScreenBottomImage} alt="rightArrowIcon" />
                        </div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                    <Grid className='our-specialities-container about-us-full-screen-description' item xs={10} md={10}>
                        <div className="our-specialities-header">
                            Changing Phase & Offering
                            {' '}
                            <img src={imageSliderHeaderIconRight} alt="React Logo" />
                        </div>
                        <div className="our-specialities-description">
                            <ReadMoreText useReadMore={true} limit={350} >
                                After establishing strong pillars of foundation and growing huge support from customers, it compelled us to open more jewellery retail outlets. As we are approaching the new milestone of completing a successful 196 years in the business, our clean approach helped us to extend 18 branches in Maharashtra. We have a rich heritage of serving customers; therefore, we match the pace with the trends. At present, our spacious showrooms provide a great ambience to customers’ shopping experience with the widest range of jewellery products varying from Gold, Silver, Platinum, Forming and Gemstones to Pearls, which adds value to our services. Our main focus has always remained on purity. We offer genuine BIS Hallmark certified gold products with a purity of 18, 22, 23, 23.5, & 24 karats, i.e., 99.5, whereas in India, these ornaments are being sold with a purity of 22 karats. Competing with our creative designs has also played a major role in recognising us as a symbol of purity and boosting our growth in the retail market.
                            </ReadMoreText>
                        </div>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                </Grid>
            </Box>
            <Box className="large-image-slider-container treasured-stories-background" sx={{ flexGrow: 1 }} style={{ backgroundImage: `url(${TreasuredStoriesBackground})` }}>
                <AwardsAndRecognition Item={Item} />
            </Box>
            <Box className="box-about-us about-us-last-element" sx={{ flexGrow: 1 }}>
                <BlogSectionWithSideImage
                    headerText={"Contributing to Society"}
                    descriptionText={"We are making remarkable social contributions through our philanthropic arm, the 'Sou. Kusum & Shri. Jindatta Shah Welfare Foundation.' This foundation is dedicated to promoting education, with a special focus on empowering girls with access to quality schooling. Moreover, we actively engage in initiatives that enhance social hygiene and cleanliness, thereby creating a healthier environment for the entire community. Additionally, we generously support various needy organizations as part of our corporate social responsibility (CSR) activities, demonstrating our commitment to the betterment of society and leaving a lasting impact on the lives of many. </br> The leadership at CS Jewels headed by Dir Siddharth Shah always intended to extensively protect the sacred animal communities. Hence in 2020, CS Jewels opened up Dayoday Goshala in Baramati. Today, it has saved and sustained over 100 cows in its society, by providing it with fodder and shelter throughout the year."}
                    Item={Item}
                    imageSrc={SocietyContributionImage}
                    isImageFirst={true}
                    mobileViewImageFirst={true}
                    useReadMore={true}
                />
            </Box>
        </div>
    )
}
