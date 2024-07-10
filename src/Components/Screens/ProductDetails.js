import React, { useState, useEffect } from "react";
import { Grid, CardMedia, Box, IconButton, Typography, Tab } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ReviewStars from "../Common/ReviewStars";
import EastIcon from '@mui/icons-material/East';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { TabPanel, TabContext, TabList } from '@mui/lab';
import sectionHeaderIcons from '../../images/icons/Group40.svg';
import ProductReviewCard from "../Common/ProductReviewCard";
import ProductCard from "../ProductCard";
import { getProducts, getProductDetails } from "../../services/FrontApp/index.service";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetails() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('description')
    const [youMayAlsoLikeProducts, setYouMayAlsoLikeProducts] = useState([])
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

    const getData = async () => {
        const result = await getProducts()
        setYouMayAlsoLikeProducts(result.data.data.data)
    }

    const getProductData = async () => {
        const result = await getProductDetails({product_id: id})
        setProductDetails(result.data.data)
    }

    useEffect(() => {
        getProductData()
        getData()
    }, [])

    const [product, setProduct] = useState({
        images: [
            {
                image_path: 'http://13.127.176.195/CSJewels/public/uploads/1/Product/coin1.jpg',
                image_name: 'coin3',
            },
            {
                image_path: 'http://13.127.176.195/CSJewels/public/uploads/1/Product/coin1.jpg',
                image_name: 'coin3',
            },
            {
                image_path: 'http://13.127.176.195/CSJewels/public/uploads/1/Product/coin1.jpg',
                image_name: 'coin3',
            }
        ]
    })

    const handleDecreaseQuantity = () => {
        setQuantity(quantity - 1)
    }

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleTabChange = (e, value) => {
        setSelectedTab(value)
    }
    return (
        <div className='product-details-container'>
            <Grid className='product-details-main'>
                <div className='product-images-container' xs={12} md={5}>
                    <div className="image-container">
                        {product.images.map((image, indx) => (
                            <CardMedia
                                key={indx}
                                component="img"
                                image={image.image_path}
                                alt={image.image_name}
                                className="product-image"
                            />
                        ))}
                    </div>
                </div>
                <div className='product-info-container p-3' xs={12} md={5}>
                    <div className="product-name-wrapper">
                        <div className="product-name">
                            {productDetails.product_name}
                        </div>
                        <div className="logo">
                            <FavoriteBorderIcon />
                            <ShareOutlinedIcon />
                        </div>
                    </div>
                    <div className="review-section">
                        <ReviewStars review={3} />
                        <div className="review-count">7 reviews</div>
                        <button className="review-btn">write a review</button>
                    </div>
                    <div className="weight">{productDetails.purity} | {productDetails.gross_wt} GM</div>
                    <div className="price">₹ {productDetails.sales_price}</div>
                    <p className="description">{productDetails.description}</p>
                    <hr className="devider" />
                    <div className="col-12 availability-wrapper" >
                        <div className="col-12 col-md-8">
                            <label>Check availability</label>
                            <div className="check-wrapper col-10">
                                <input
                                    type="text"
                                    className="w-100 check-input"
                                    placeholder="Enter Pincode"
                                    name="email"
                                />
                                <button type="button" className="check-btn" >
                                    Check
                                    {' '}
                                    <EastIcon className="icon" />
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <label>Quantity</label>
                            <div className="col-6 col-md-8">
                                <Box className="quantity-handler" display="flex" alignItems="center">
                                    <IconButton onClick={handleDecreaseQuantity} className="decrease" aria-label="remove quantity">
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography className="quantity" variant="body1">{quantity}</Typography>
                                    <IconButton onClick={handleIncreaseQuantity} className="increase" aria-label="add quantity" >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="shopping-btn-wrapper">
                        <button className="add-to-cart-btn">
                            ADD TO CART <EastIcon className="icon" />
                        </button>

                        <button className="buy-now-btn" onClick={() => navigate('/order/check-out')} >
                            BUY NOW <EastIcon className="icon" />
                        </button>
                    </div>
                    <hr className="devider" />
                    <TabContext value={selectedTab}  >
                        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleTabChange}
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: "#333333",
                                        color: "#333333",
                                    }
                                }}
                            >
                                <Tab className="tab-lable" label="Description" value="description" />
                                <Tab className="tab-lable" label="Metal Details" value="metal_details" />
                                <Tab className="tab-lable" label="Product Details" value="product_details" />
                            </TabList>
                        </Box>
                        <TabPanel className="tab-panel" value="description">
                            <p>{productDetails.item_description}</p>
                        </TabPanel>
                        <TabPanel className="tab-panel" value="metal_details">
                            <p>{productDetails.metal_description}</p>
                        </TabPanel>
                        <TabPanel className="tab-panel" value="product_details">
                            <p>{productDetails.item_group_description}</p>
                        </TabPanel>
                    </TabContext>
                </div>
            </Grid>
            <Box className="customers-review-section">
                <h2 className="section-header"> Customer Reviews <img src={sectionHeaderIcons} alt="Customer Reviews" /> </h2>
                <div className="avg-review-section" >
                    <div className="d-flex avg-review-wrapper">
                        <div className="avg-review">4.2</div>
                        <ReviewStars review={3} height={26} width={26} />
                    </div>
                    <button type="button" className="write-a-btn" >
                        WRITE A REVIEW<EastIcon className="icon" />
                    </button>
                </div>
                <hr className="devider" />
                <div className="product-review-wrapper">
                    <ProductReviewCard />
                    <ProductReviewCard />
                    <ProductReviewCard />
                    <ProductReviewCard />
                    <ProductReviewCard />
                    <ProductReviewCard />
                </div>
            </Box>
            <Box className="you-may-like-section">
                <h2 className="section-header"> You might also like <img src={sectionHeaderIcons} alt="Customer Reviews" /> </h2>
                <p>Elevate your style with our exquisite bullion pieces, each crafted to perfection.</p>

                <div className="product-grid-container">
                    <Grid className="product-list-grid-section" item xs={12} md={10}>
                        {youMayAlsoLikeProducts.map((product, indx) => (
                            <ProductCard
                                key={indx}
                                productImage={product.image_path}
                                productName={product.product_name}
                                productPrice={product.sales_price}
                            />
                        ))}
                    </Grid>
                </div>
            </Box>
        </div>
    )
}