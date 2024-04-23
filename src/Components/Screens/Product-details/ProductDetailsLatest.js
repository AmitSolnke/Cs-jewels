import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const ProductDetailsLatest = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState({
        product_name: '',
        metal_description: '',
        metal_amount: '',
        item_description: '',
        purity: '',
        description: '',
        sales_price: 0,
        gross_wt: 0
    })

    return (

        <div className='container'>
            <div className="">
                {/* product images gallery */}
                
            </div>
        </div>
    )
}
