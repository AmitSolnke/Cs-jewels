import React, { useState } from "react";
import {
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  IconButton,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import successCheckIcon from "../../../images/icons/successful-checkbox.svg";
import productImage from "../../../images/MaskGroup18.png";
import { enquireProduct } from "../../../services/FrontApp/index.service";
import ErrorList from "../../Common/ErrorList";

const Boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EnquiryModal = ({ open, handleClose, productId }) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    mobile_no: "",
    city: "",
    pincode: "",
    product_id: productId,
  });
  const [showEnquiryScreen, setShowEnquiryScreen] = useState(true);
  const [showThankYouScreen, setShowThankYouScreen] = useState(false);

  const validate = (field, value) => {
    const newErrors = { ...errors };
    if (field === "name" && !value) {
      newErrors.name = "Name is required";
    } else if (field === "name") {
      delete newErrors.name;
    }
    if (field === "mobile_no") {
      if (!value) {
        newErrors.mobile_no = "Phone Number is required";
      } else if (!/^\d{10}$/.test(value)) {
        newErrors.mobile_no = "Phone Number must be 10 digits";
      } else {
        delete newErrors.mobile_no;
      }
    }
    if (field === "city" && !value) {
      if (!value) {
        newErrors.city = "City is required";
      } else if (field === "city") {
        delete newErrors.city;
      }
    }
    if (field === "pincode" && value) {
      if (!/^\d{6}$/.test(value)) {
        newErrors.pincode = "Pincode must be a 6-digit number";
      } else {
        delete newErrors.pincode;
      }
    }

    return newErrors;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const temp = { ...data, [name]: value };
    setData(temp);
    const validationErrors = validate(name, value);
    setErrors(validationErrors);
  };

  const handleCloseButton = () => {
    setShowThankYouScreen(false);
    setShowEnquiryScreen(true);
    setErrors({});
    setData({
      name: "",
      mobile_no: "",
      city: "",
      pincode: "",
      product_id: productId,
    });
    handleClose();
  };

  const handleGetUpdates = async (event) => {
    event.preventDefault();
    const validationErrors = validate("name", data.name);
    const mobileErrors = validate("mobile_no", data.mobile_no);
    const cityErrors = validate("city", data.city);
    const pincodeErrors = validate("pincode", data.pincode);
    const allErrors = {
      ...validationErrors,
      ...mobileErrors,
      ...cityErrors,
      ...pincodeErrors,
    };
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }
    setErrors({});
    try {
      await enquireProduct(data);
      setShowEnquiryScreen(false);
      setShowThankYouScreen(true);
    } catch (error) {
      setErrors({ form: error.response.data.message });
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        className="enquiry-modal"
      >
        <Fade in={open}>
          <Box
            className="box-container"
            sx={{...Boxstyle, border: "12px solid #ede5e5", width: "50rem",height:{xs:"100%",sm:'auto'}}}
          >
            <div
              className="side-product-image-wrapper"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div style={{ flex: "1" }}>
                <img src={productImage} className="side-product-image" alt="" loading="lazy"/>
              </div>
              <div className="dialog-main" style={{ flex: "1" }}>
                <DialogActions>
                  <IconButton aria-label="close" onClick={handleCloseButton}>
                    <CloseIcon />
                  </IconButton>
                </DialogActions>
                {showEnquiryScreen && (
                  <div
                    className="container enquiry-form"
                  >
                    <Typography
                      variant="h3"
                      className="form-title"
                      gutterBottom
                    >
                      Thank you for inquiring with us.
                    </Typography>
                    {errors.form && <ErrorList errors={[errors.form]} />}
                    <Typography
                      variant="subtitle1"
                      className="form-subtitle"
                      gutterBottom
                    >
                      Soon we will reach out to you!!
                    </Typography>
                    <Box    sx={{
                      overflowY: "scroll",
                      height: '15rem',
                      margin:'0.2rem 0'
                    }}>
                    <TextField
                      label="Name"
                      className="mb-4"
                      fullWidth
                      required
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                    <TextField
                      label="Phone Number"
                      className="mb-4"
                      fullWidth
                      required
                      name="mobile_no"
                      value={data.mobile_no}
                      onChange={handleChange}
                      error={!!errors.mobile_no}
                      helperText={errors.mobile_no}
                    />
                    <TextField
                      label="City"
                      className="mb-4"
                      fullWidth
                      required
                      name="city"
                      value={data.city}
                      onChange={handleChange}
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                    <TextField
                      label="Pin Code"
                      className="mb-4"
                      fullWidth
                      name="pincode"
                      value={data.pincode}
                      onChange={handleChange}
                      error={!!errors.pincode}
                      helperText={errors.pincode}
                    />
                    </Box>
                    <Button
                      className="btn btn-block bg-black btn-submit col-12 col-md-10 col-lg-6"
                      variant="contained"
                      fullWidth
                      onClick={handleGetUpdates}
                    >
                      <span>GET UPDATES</span>
                      &nbsp;&nbsp;
                      <EastIcon />
                    </Button>
                  </div>
                )}
                {showThankYouScreen && (
                  <div className="container text-center">
                    <img
                      src={successCheckIcon}
                      style={{ width: "123px", height: "123px" }}
                      alt="Tick Mark"
                      loading="lazy"
                    />
                    <Typography
                      variant="h3"
                      className="form-title"
                      gutterBottom
                    >
                      Inquiry submitted successfully
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="form-subtitle"
                      gutterBottom
                    >
                      Our team member will contact you in 24-48 hours
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EnquiryModal;
