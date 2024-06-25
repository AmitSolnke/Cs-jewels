import React from 'react'
import useWindowWidthAndHeight from '../utilities/CustomHooks';
import { Grid } from '@mui/material';
import imageSliderHeaderIconRight from '../images/icons/Group40.svg';
import ReadMoreText from './ReadMoreText';

export default function BlogSectionWithSideImage({headerText,descriptionText, Item,imageSrc, isImageFirst=true, mobileViewImageFirst, useReadMore=false}) {
    const windoDimensions = useWindowWidthAndHeight();
    return (
        <Grid container spacing={2}>
            <Grid item xs={1} md={1}>
                <Item className="empty-container-section">xs=6 md=4</Item>
            </Grid>
            {(windoDimensions[0] <= 768 ?mobileViewImageFirst : isImageFirst ) ? 
            <Grid className='our-specialities-image-container' item xs={10} md={5}>
                <div className="about-us-description-read-more our-specialities-image ">
                    <img src={imageSrc} />
                </div>
            </Grid> 
            :
            <Grid className='our-specialities-container' item xs={10} md={5}>
                <div className="our-specialities-header">
                    {headerText}
                    {' '}
                    <img src={imageSliderHeaderIconRight} alt="React Logo"  className="right-logo" />
                </div>
                <div className="our-specialities-description">
                    <ReadMoreText useReadMore={windoDimensions[0] <= 768 ? true : false} limit={350} >
                    {descriptionText}
                    </ReadMoreText>
                </div>
            </Grid>
            }
            
            {windoDimensions[0] <= 768 &&
                (<>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <Item className="empty-container-section">xs=6 md=4</Item>
                    </Grid>
                </>)
            }
            {(windoDimensions[0] <= 768 ?mobileViewImageFirst : isImageFirst ) ? 
            <Grid className='our-specialities-container' item xs={10} md={5}>
                <div className="our-specialities-header">
                    {headerText}
                    {' '}
                    <img src={imageSliderHeaderIconRight} alt="React Logo" />
                </div>
                <div className="our-specialities-description">
                    <ReadMoreText useReadMore={useReadMore || windoDimensions[0] <= 768 ? true : false} limit={350} >
                       {descriptionText}
                    </ReadMoreText>
                </div>
            </Grid>:
            <Grid className='our-specialities-image-container' item xs={10} md={5}>
                <div className="about-us-description-read-more our-specialities-image ">
                    <img src={imageSrc} />
                </div>
            </Grid> 
            }
            <Grid item xs={1} md={1}>
                <Item className="empty-container-section">xs=6 md=4</Item>
            </Grid>
        </Grid>
    )
}
