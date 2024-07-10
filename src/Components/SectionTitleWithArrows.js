import React from 'react'
import imageSliderHeaderIconRight from '../images/icons/Group40.svg';
import imageSliderHeaderIconLeft from '../images/icons/Group45.svg';

export default function SectionTitleWithArrows({arrowSides, textMessage}) {
    return (<>
        { arrowSides == "Both"? 
            <div className="image-slider-header">
                <img src={imageSliderHeaderIconLeft} alt="React Logo"  className="left-logo" />
                {'  '}
                {textMessage}
                {' '}
                <img src={imageSliderHeaderIconRight} alt="React Logo"  className="right-logo" />
            </div>: 
            <div className="image-slider-header">
                {textMessage}
                {' '}
                <img src={imageSliderHeaderIconRight} alt="React Logo"  className="right-logo" />
            </div>
        }</>)
    
}
