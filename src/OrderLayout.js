import React, { useState, useEffect } from "react";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Grid,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import siteLogo from "./images/icons/logo.svg";
import { getCartItems } from "./services/FrontApp/index.service";

import { ExpansionCartView } from "./ExpansionCartView";
import { OrderLayoutShoppingBag } from "./Components/Screens/Checkout/OrderLayoutShoppingBag";

const OrderLayout = () => {
  const navigate = useNavigate()
  const getData = async () => {
    try {
      const result = await getCartItems()
      if(result.data.data.length <= 0) {
        navigate(`/`)
      }
    } catch (error) {
      navigate(`/`)
    }
  }

  useEffect(() => {
      getData()
  }, [])


  return (
    // <div className="order-layout d-flex justify-content-center">
      <Grid container  className="order-main-wrapper" spacing={3}>
        <Grid item xs={12} md={6} className="form-section p-5">
          <div className="form-section-wrapper">
            <div className="checkout-header">
              <img src={siteLogo} alt="" />
            </div>

            <ExpansionCartView />

            <Breadcrumbs
              className="my-5"
              separator={
                <NavigateNextIcon sx={{ color: "#000" }} fontSize="small" />
              }
              aria-label="breadcrumb"
            >
              <NavLink
                to="/order/check-out/details"
                className="breadcrumb-link"
              >
                YOUR DETAILS
              </NavLink>
              <NavLink
                to="/order/check-out/delivery"
                className="breadcrumb-link"
              >
                DELIVERY
              </NavLink>
              <NavLink
                className="breadcrumb-link"
              >
                PAYMENT
              </NavLink>
            </Breadcrumbs>
            <div className="outlet-wrapper">
              <Outlet />
            </div>
          </div>
        </Grid>

        <Grid item md={6} className="order-layout-shopping-bag-grid">
         <OrderLayoutShoppingBag />
        </Grid>
      </Grid>
    // </div>
  );
};

export default OrderLayout;