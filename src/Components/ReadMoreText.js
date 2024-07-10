import React, { useState } from 'react'

export default function ReadMoreText(props) {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => { setIsReadMore(!isReadMore) };
    return (
        <>
            <div className="about-us-description-read-more">
                {props.useReadMore && isReadMore ? props.children.slice(0, props.limit): props.children}{isReadMore && ".." }
            </div>
            {props.useReadMore && <div className="about-us-button-read-more">
                <button onClick={toggleReadMore} type="button" className="carousel-explore-now-btn">
                    {isReadMore ? 'READ MORE' : ' READ LESS'}
                </button>
            </div>}
        </>
    )
}
