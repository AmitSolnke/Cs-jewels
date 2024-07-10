import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/system";
import {
  Badge,
  Typography,
  IconButton,
  Divider,
  Card,
  CardMedia,
  Box,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import shoppingBagLogo from "../../images/icons/shopping-bag.svg";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EastIcon from "@mui/icons-material/East";
import { getCartItems, addToCart, removeProductFromCat } from "../../services/FrontApp/index.service";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: "20vw !important", // Customizable width
  height: "100%", // Full-screen height
  "& .MuiDrawer-paper": {
    width: "450px !important", // Customizable width
    height: "100%", // Full-screen height
    marginTop: '0'
  },
  "@media screen and (max-width: 425px)": {
    width: "90vw !important",
    "& .MuiDrawer-paper": {
      width: "90vw !important",
      marginTop: '0'
    },
  },
}));

export const CartItem = ({ id, item, setRefreshCount, refreshCount }) => {
  const quantity = item.quantity;

  const handleRemove = async () => {
    await removeProductFromCat(id)
    setRefreshCount(refreshCount + 1)
  };

  const handleIncreaseQuantity = async () => {
    const data = {
      product_master_id: item.product_id,
      quantity: 1
    }
    await addToCart(data)
    setRefreshCount(refreshCount + 1)
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      const data = {
        product_master_id: item.product_id,
        quantity: - 1
      }
      await addToCart(data)
      setRefreshCount(refreshCount + 1)
    }
  };

  return (
    <Card className="cart-item p-4" sx={{ border: "none" }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <div className="product-image">
            <CardMedia
              component="img"
              alt={item.image_name}
              image={item.image_path}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="product-information">
            <Typography variant="h6" component="div">
              {item.product_name}
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              color="text.secondary"
            >
              {item.metal_type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: &#8377; {item.sales_price}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={4}>
          <Box className="card-actions" display="flex" alignItems="center">
            <IconButton
              onClick={handleRemove}
              aria-label="remove"
            >
              <CloseIcon />
            </IconButton>
            <Box
              className="quantity-handler"
              display="flex"
              alignItems="center"
            >
              <IconButton
                onClick={handleDecreaseQuantity}
                aria-label="remove quantity"
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{quantity}</Typography>
              <IconButton
                onClick={handleIncreaseQuantity}
                aria-label="add quantity"
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export const ShoppingBag = ({ open, handleDrawer }) => {
  const [refreshCount, setRefreshCount] = useState(0)
  const [items, setItems] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)

  const getData = async () => {
    try {
      const result = await getCartItems()
      let totalPrice = 0;
      for (let i = 0; i < result.data.data.length; i++) {
        totalPrice += result.data.data[i].sales_price * result.data.data[i].quantity;
      }
      setSubTotal(totalPrice)
      setTotal(totalPrice)
      setItems(result.data.data)
    } catch (error) {
      setItems([])
    }
  }

  useEffect(() => {
    getData()
  }, [refreshCount, open])

  const toggleDrawer = () => {
    handleDrawer();
  };

  return (
    <div className="shopping-bag p-4" style={{display: 'none', zIndex: '200'}}>
      <StyledDrawer
        anchor="right"
        className="MuiDrawer.paper"
        open={open}
        onClose={toggleDrawer}
      >
        <div className="shopping-bag-header d-flex justify-content-between p-3">
          <div>
            <Badge badgeContent={items.length} color="primary">
              <img
                src={shoppingBagLogo}
                style={{ height: "20px", width: "20px" }}
              />
            </Badge>
          </div>

          <h4>YOUR SHOPPING BAG</h4>

          <IconButton aria-label="close" onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </div>

        <Divider style={{ backgroundColor: "#666666" }} />
        <div className="cart-items-wrapper">
          {items.map((item, index) => {
            return (
              <div key={index}>
                <CartItem id={item.id} item={item} refreshCount={refreshCount} setRefreshCount={setRefreshCount} />
                <Divider style={{ backgroundColor: "#666666" }} />
              </div>
            );
          })}
        </div>

        <Paper elevation={4} className="w-100 continue-to-checkout p-4">
          <div className="apply-code-wrapper">
            <input
              type="text"
              className="w-100 apply-code-input"
              placeholder="Enter coupon code"
            />

            <Button
              variant="outlined"
              className="outlined-black btn-apply-code"
            >
              APPLY CODE &nbsp;
              <EastIcon />
            </Button>
          </div>

          <div className="totals">
            <div className="subtotal total-info">
              <span>subtotal</span>
              <span className="text-bold">&#8377; {subTotal}</span>
            </div>

            <div className="shipping-charges total-info">
              <span>Shipping charges</span>
              <span>calculated at next step.</span>
            </div>

            <div className="total total-info">
              <span className="text-bold">Total</span>
              <span className="text-bold">&#8377; {total}</span>
            </div>
          </div>

          <Button
            className="btn btn-block bg-black btn-submit btn-checkout"
            fullWidth
            variant="contained"
            type="submit"
          >
            CONTINUE TO CHECKOUT &nbsp;
            <EastIcon />
          </Button>
        </Paper>
      </StyledDrawer>
    </div>
  );
};
