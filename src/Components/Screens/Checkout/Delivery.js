import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { getAllAddAddress, myProfile } from "../../../services/profile";
import { isLoggedIn } from "../../../services/auth.service";
import { AddressBookModal } from "../../Common/AddressBookModal";
import { EditAddressBookModal } from "../../Common/EditAddressBookModal";
import { placeOrder } from "../../../services/FrontApp/order.service";
import ErrorList from "../../Common/ErrorList";

export const Delivery = () => {
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const radioStyle = {
    color: 'black',
    '&$checked': {
      color: 'black',
    },
  };

  const [selectedAddress, setSelectedAddress] = useState(0)

  const [open, setOpen] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [selectedAddressIdToEdit, setSelectedAddressIdToEdit] = useState(0);

  const handleOpenAddAddressDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenEditAddressDialog = (id) => {
    setSelectedAddressIdToEdit(id)
    setOpenEditAddress(true)
  }

  const handleCloseEditAddressDialog = () => {
    setOpenEditAddress(false)
  };
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  })

  const getProfileData = async () => {
    if (isLoggedIn()) {
      const result = await myProfile();
      setProfileData({ ...result.data.data[0] })
    }
  }

  const handleSubmit = async () => {
    setErrors([])
    try {
      const result = await placeOrder()
      const order_id = result.data.order_id

      const cashfree = Cashfree({
        mode: process.env.REACT_APP_PAYMENT_GATEWAY_MODE
      });
      let checkoutOptions = {
        paymentSessionId: result.data.payment_session_id,
        returnUrl: process.env.REACT_APP_URL + "success/payment/" + order_id,
      }
      cashfree.checkout(checkoutOptions)
    } catch (error) {
      setErrors(error.response.data.message)
    }
  }

  useEffect(() => {
    getProfileData()
    getDataAddress()
  }, [])

  const [deliveryAddress, setDeliveryAddress] = useState([])

  const getDataAddress = async () => {
    try {
      const addressesResult = await getAllAddAddress();
      setDeliveryAddress(addressesResult.data.data)
      addressesResult.data.data.forEach((address, key) => {
        if (address.is_default) {
          setSelectedAddress(key)
        }
      });
    } catch (error) {
      setDeliveryAddress([])
    }
  }

  return (
    <div>
      <Box className="delivery-wrapper">
        <ErrorList errors={errors} />
        <div className="delivery-estimate-section mb-5">
          <div className="pincode-section section-background p-3">
            <span>
              <b>Pincode:</b> 413102
            </span>

            <Link to="#">CHANGE</Link>
          </div>
          <div className="estimated-delivery p-3">
            <b>Estimated Delivery:</b>
            Receive as early as
            <span className="delivery-datetime">wednesday 27th June</span>
          </div>
        </div>

        <div className="delivery-address-section mb-5">
          <b>Delivery Address</b>
          <div className="personal-information section-background d-flex justify-content-between align-items-center p-3">
            <div className="">
              <div className="section-title">Name, email and mobile</div>
              <b>{profileData.first_name} {profileData.last_name}, {profileData.email}, {profileData.mobile}</b>
            </div>
            <div>
              <Link to="#">EDIT</Link>
            </div>
          </div>

          <div className="address-section my-2">
            <div className="section-background p-3">
              <div className="section-title">Address 1</div>
              <div className="d-flex justify-content-between align-items-center">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {deliveryAddress.map((address, key) => (
                    <div className="d-flex" key={key}>
                      <FormControlLabel
                        value="same"
                        control={<Radio style={radioStyle} checked={key == selectedAddress} />}
                        label={address.flat_no + ', ' + address.street_name + ', ' + address.city + ' - ' + address.pincode + ', ' + address.country}
                      />
                      <div>
                        <Link onClick={() => handleOpenEditAddressDialog(address.id)}>EDIT</Link>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

              </div>
            </div>
          </div>

          <span>
            + <Link onClick={handleOpenAddAddressDialog}>ADD NEW ADDRESS</Link>
          </span>
        </div>

        <div className="mb-5">
          <div className="billing-address-section">
            <b>Billing Address</b>
          </div>
          <div className="address-section">
            <div className="address section-background d-flex justify-content-between align-items-center p-3">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >

                <FormControlLabel
                  value="same"
                  control={<Radio style={radioStyle} />}
                  label="Same as delivery address"
                />
              </RadioGroup>
              <div>
                <Link to="#">EDIT</Link>
              </div>
            </div>
          </div>
          <span>
            + <Link>ADD NEW ADDRESS</Link>
          </span>
        </div>

        <Button
          className="btn btn-block bg-black btn-submit"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          CONTINUE TO DELIVERY &nbsp;
          <EastIcon />
        </Button>
      </Box>
      <AddressBookModal
        open={open}
        handleClose={handleCloseDialog}
      />
      <EditAddressBookModal
        open={openEditAddress}
        handleClose={handleCloseEditAddressDialog}
        id={selectedAddressIdToEdit}
      />
    </div>
  );
};
