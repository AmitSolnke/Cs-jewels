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
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
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
  const [errors, setErrors] = useState([])
  const [data, setData] = useState({
    name: '',
    mobile_no: '',
    product_id: productId,
  })

  const handleChange = ({ target }) => {
    data[target.name] = target.value
    const temp = Object.assign({}, data)
    setData(temp)
  }

  const [showEnquiryScreen, setShowEnquiryScreen] = useState(true);
  const [showThankYouScreen, setShowThankYouScreen] = useState(false);

  const handleCloseButton = () => {
    setShowThankYouScreen(false);
    setShowEnquiryScreen(true);
    handleClose();
  };

  const handleGetUpdates = async (event) => {
    event.preventDefault();
    setErrors([])
    try {
      await enquireProduct(data);
      setShowEnquiryScreen(false);
      setShowThankYouScreen(true);
    } catch (error) {
      setErrors(error.response.data.message)
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
            sx={Boxstyle}
            style={{ border: "12px solid #ede5e5", width: "50em" }}
          >
            <div className="side-product-image-wrapper" style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: "1" }}>
                <img
                  src={productImage}
                  className="side-product-image"
                  alt=""
                />
              </div>
              <ErrorList errors={errors} />
              <div className="dialog-main" style={{ flex: "1" }}>
                <DialogActions>
                  <IconButton aria-label="close" onClick={handleCloseButton}>
                    <CloseIcon />
                  </IconButton>
                </DialogActions>
                {showEnquiryScreen && (
                  <div className="container enquiry-form">
                    <Typography
                      variant="h3"
                      className="form-title"
                      gutterBottom
                    >
                      Thank you for inquiring with us.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="form-subtitle"
                      gutterBottom
                    >
                      Soon we will reach out to you!!
                    </Typography>
                    <TextField
                      label="Name"
                      className="mb-2"
                      fullWidth
                      required
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Phone Number"
                      className="mb-4"
                      fullWidth
                      required
                      name="mobile_no"
                      value={data.mobile_no}
                      onChange={handleChange}
                    />
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
