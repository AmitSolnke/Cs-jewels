import React from "react";
import ReviewStars from "./ReviewStars";

export default function ProductReviewCard () {
    return (
        <div className="product-review-card">
            <small className="date">04 Dec 2022</small>
            <ReviewStars review={4} width={20} height={20} />
            <h2 className="customer-name">Smita Jain</h2>
            <p className="review-content">
                Absolutely delighted with my experience! The attention to design aspect is evident in the stunning piece I received, perfectly encapsulating the trendy jewellery I adore. Can’t wait to shop here again!
            </p>
        </div>
    )
}