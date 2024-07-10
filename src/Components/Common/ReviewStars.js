import React from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ReviewStars ({ review = 0, height = 15, width = 16  }) {
    return (
        <div className="review-stars">
            {review > 0 ? <StarIcon sx={{ height, width, color: '#FCC153' }}/> : <StarBorderIcon sx={{ height, width }}/> }
            {review > 1 ? <StarIcon sx={{ height, width, color: '#FCC153' }}/> : <StarBorderIcon sx={{ height, width }}/> }
            {review > 2 ? <StarIcon sx={{ height, width, color: '#FCC153' }}/> : <StarBorderIcon sx={{ height, width }}/> }
            {review > 3 ? <StarIcon sx={{ height, width, color: '#FCC153' }}/> : <StarBorderIcon sx={{ height, width }}/> }
            {review > 4 ? <StarIcon sx={{ height, width, color: '#FCC153' }}/> : <StarBorderIcon sx={{ height, width }}/> }
        </div>
    )
}