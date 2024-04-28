import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { getCartItems } from "../../../services/FrontApp/index.service";

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
    <>
      <Card className="cart-item p-3" sx={{ border: "none" }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div className="product-image">
              <CardMedia
                component="img"
                alt={item.image_name}
                image={item.image_path}
                height="81"
                width="81"
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
                Quantity: {quantity}
              </Typography>
            </div>
          </Grid>

          <Grid container item xs={4} className="d-flex justify-content-center align-items-center">
            <Typography variant="body2" color="text.secondary">
              <b style={{ fontSize: '16px', fontWeight: 'bolder' }}> &#8377; {item.sales_price}</b>
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Divider style={{ backgroundColor: "#666666" }} />
    </>
  );
}

export const OrderLayoutShoppingBag = () => {
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
      console.log(error)
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
    <div className="shopping-bag-wrapper-section">
      <div className="shopping-bag-section">
        <div className="shopping-bag p-4">
          <div className="shopping-bag-header d-flex justify-content-between">
            <h4>YOUR SHOPPING BAG</h4>
            <Link to="#">EDIT BAG</Link>
          </div>
          <Divider style={{ backgroundColor: "#666666" }} />
          <div className="cart-items-wrapper">
            {items.map((item, key) => {
              return (
                <div key={key}>
                  <CartItem id={item.id} item={item} refreshCount={refreshCount} setRefreshCount={setRefreshCount} />
                </div>
              );
            })}
            <div className="w-100 mt-4 order-continue-to-checkout">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
