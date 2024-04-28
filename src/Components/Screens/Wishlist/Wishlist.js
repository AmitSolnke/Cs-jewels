import React, { useEffect, useState } from "react";
import headerLeftIcon from "../../../images/icons/Group45.svg";
import headerRightIcon from "../../../images/icons/Group40.svg";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ConfirmationDialog from "./ConfirmationDialog";
import { Link } from "react-router-dom";
import { Paginator } from "../../Common/Paginator";
import { getWishlist, addToCart } from "../../../services/FrontApp/index.service";

export const ProductCard = ({ product = null, refrashCount, setRefrashCount }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    setRefrashCount(refrashCount + 1)
    setIsDialogOpen(false);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    console.log("dialog opened");
    setIsDialogOpen(true);
  };

  const handleAddToCart = async () => {
    const data = {
      product_master_id: product.id,
      quantity: 1
    }
    await addToCart(data)
  }

  return (
    <Card variant="outlined" className="product-card">
      <div className="image-container">
        <CardMedia
          component="img"
          image={product.images.length > 0 ? product.images[0].image_path : ''}
          alt={product.images.length > 0 ? product.images[0].image_name : ''}
        />
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <IconButton onClick={handleOpenDialog}>
            <CloseIcon />
          </IconButton>
        </div>
        <ConfirmationDialog
          onConfirm={handleConfirm}
          open={isDialogOpen}
          product={product}
          handleClose={handleClose}
        />
      </div>
      <CardContent>
        <Typography className="product-name">{product.product_name}</Typography>
        <Typography color="text.secondary" className="product-price">
          &#8377; {product.sales_price}
        </Typography>

        <Link to="#" onClick={handleAddToCart} className="add-to-cart-link">
          ADD TO CART
        </Link>
      </CardContent>
    </Card>
  );
};

export const Wishlist = () => {
  const [data, setData] = useState([])
  const [refrashCount, setRefrashCount] = useState(0)

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // todo: refactor above logic for static implementation

  const getData = async () => {
    try {
      const result = await getWishlist();
      setData(result.data.data)
    } catch (error) {
      setData([])
    }
  }

  useEffect(() => {
    getData()
  }, [refrashCount])

  return (
    <div className="wishlist">
      <Box sx={{ flexGrow: 1 }} className="text-center mt-5">
        <div className="section-title">
          <img src={headerLeftIcon} alt="" />
          <h2>Your wishlist</h2>
          <img src={headerRightIcon} alt="" />
        </div>

        <small>
          Unlock your desires and keep track of your favourite jewellery items
          in our wishlist , <br /> making your wishes a reality.
        </small>
      </Box>

      <div className="wishlist-items-container container">
        <Box>
          <Grid container className="mb-4" spacing={3}>
            {data.map((data) => (data.product_master_id != 0 ?
              (
              <Grid key={data.id} item xs={6} sm={6} md={3} lg={3}>
                <ProductCard product={data.product} refrashCount={refrashCount} setRefrashCount={setRefrashCount}/>
              </Grid>
            ) : ''))}
          </Grid>

        </Box>
        <Paginator currentPage={currentPage} itemsPerPage={itemsPerPage} productsLength={data.length} handleChangePage={handleChangePage} />
      </div>
    </div>
  );
};
