import React, { useState } from "react";
import { Box, Checkbox, Grid, TextField } from "@mui/material";
import SectionTitleWithArrows from "../SectionTitleWithArrows";
import FAQs from "../FAQs";
import rightArrowIcon from "../../images/icons/right-arrow.svg";
import useWindowWidthAndHeight from "../../utilities/CustomHooks";
import { contactUs } from "../../services/FrontApp/index.service";
import SuccessMsg from "../Common/SuccessMsg";
import ErrorList from "../Common/ErrorList";

const validateField = (name, value) => {
  switch (name) {
    case "first_name":
    case "last_name":
      return value.trim() !== "" ? "" : "This field is required";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Enter a valid email address";
    case "mobile":
      return /^[0-9]{10}$/.test(value)
        ? ""
        : "Enter a valid 10-digit mobile number";
    case "description":
      return value.trim() !== "" ? "" : "This field is required";
    case "is_checked":
      return value ? "" : "Please accept the terms and conditions";
    default:
      return "";
  }
};

export default function ContactUs() {
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    description: "",
    is_checked: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    // Validate the field
    const error = validateField(name, newValue);

    setData({
      ...data,
      [name]: newValue,
    });

    // Clear specific field error when changed
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMsg("");

    // Check for any validation errors before submitting
    const formErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Check if is_checked is checked
    if (!data.is_checked) {
      setErrors({
        ...errors,
        is_checked: "Please accept the terms and conditions",
      });
      return;
    }

    try {
      const result = await contactUs(data);
      setData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        description: "",
        is_checked: false,
      });
      setSuccessMsg(result.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ apiError: error.response.data.message });
      } else {
        setErrors({ apiError: "An error occurred. Please try again later." });
      }
    }
  };

  const windowDimensions = useWindowWidthAndHeight();

  return (
    <div className="contact-us">
      <div className="contact-us-container">
        <div className="contact-us-center">
          <SectionTitleWithArrows
            textMessage={"Need assistance?"}
            arrowSides={"Both"}
          />
          <div className="contact-us-description">
            Send an email to &nbsp;
            <div className="decoration-contact-us-underline">
              care@csjewels.com
            </div>{" "}
            &nbsp;or call us on &nbsp;{" "}
            <div className="decoration-contact-us-underline"> 07969991827 </div>
            &nbsp;anytime! We will get back to you as soon as we can!
          </div>
        </div>
        <div className="contact-us-center">
          <SuccessMsg message={successMsg} />
          {errors.apiError && <ErrorList errors={[errors.apiError]} />}
          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="text-field text-field-name-contact-us"
                  required
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="first_name"
                  value={data.first_name}
                  onChange={handleChange}
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="text-field text-field-name-contact-us"
                  required
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="last_name"
                  value={data.last_name}
                  onChange={handleChange}
                  error={Boolean(errors.last_name)}
                  helperText={errors.last_name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="text-field text-field-email-contact-us"
                  required
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="text-field text-field-email-contact-us"
                  required
                  id="outlined-basic"
                  label="Mobile"
                  variant="outlined"
                  name="mobile"
                  value={data.mobile}
                  onChange={handleChange}
                  error={Boolean(errors.mobile)}
                  helperText={errors.mobile}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  className="text-field text-field-email-contact-us"
                  required
                  id="outlined-basic"
                  label="What would you like us to assist you with?*"
                  variant="outlined"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                className="term-and-condition-section"
                sx={{ alignItems: "baseline" }}
              >
                <div className="checkbox-contact-us-page">
                  <Checkbox
                    required
                    name="is_checked"
                    checked={data.is_checked}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkbox-contact-us-page-text">
                  I have read and accepted the&nbsp;
                  <div className="decoration-contact-us-underline">
                    terms and conditions
                  </div>
                  &nbsp;and&nbsp;
                  <div className="decoration-contact-us-underline">
                    {" "}
                    privacy policy{" "}
                  </div>
                  {errors.is_checked && (
                    <span className="text-danger">{errors.is_checked}</span>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <button
                  type="button"
                  className="carousel-explore-now-btn"
                  onClick={handleSubmit}
                >
                  SUBMIT <img src={rightArrowIcon} alt="rightArrowIcon" />
                </button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div className="contact-us-center">
        <SectionTitleWithArrows textMessage={"FAQs"} arrowSides={"Both"} />
      </div>
      <FAQs />
    </div>
  );
}
