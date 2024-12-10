import React from 'react'

export default function SectionTitleWithArrows({arrowSides, textMessage}) {
    return (<>
        { arrowSides == "Both"? 
            <div className="image-slider-header">
                {textMessage}
            </div>: 
            <div className="image-slider-header">
                {textMessage}
            </div>
        }</>)
    
}
