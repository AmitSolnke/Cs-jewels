import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToWishlist, removeProductFromWishList } from '../services/FrontApp/index.service';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ productImage, productName, id = 0, isWishlist = false, productPrice, setRefreshCount, refreshCount }) {
  const navigate = useNavigate()
  const addToFavorite = async () => {
    try {
      await addToWishlist(id)
      setRefreshCount(refreshCount + 1)
    } catch (error) {
      console.log(error)
    }
  }
  const removeFromFavorite = async () => {
    try {
      await removeProductFromWishList(id)
      setRefreshCount(refreshCount + 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className='product-page-product-card-container' sx={{ maxWidth: 345 }}>
      <CardActionArea className='product-page-product-card-action-area'>
        <div className="image-container">
          <CardMedia
            component="img"
            className="images"
            image={productImage}
            alt="green iguana"
            onClick={() => navigate(`/product-details/${id}`)}
          />
          <div
            style={{ position: "absolute", bottom: 0, right: 0 }}
            className="favourite-button-container"
          >
            <div style={{ color: "#666666" }}>
              {isWishlist ? (<FavoriteIcon onClick={removeFromFavorite} />) : (<FavoriteBorderIcon onClick={addToFavorite} />)}
              
            </div>
          </div>
        </div>
        <CardContent>
          <div className='product-name'>
            {productName}
          </div>
          <div className='product-price'>
            ₹ {productPrice}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
