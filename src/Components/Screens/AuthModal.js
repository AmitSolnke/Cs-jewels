import * as React from "react";
import successCheckIcon from "../../images/icons/successful-checkbox.svg";
import {
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  DialogActions,
  Container,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import rightArrowIcon from "../../images/icons/right-arrow-white.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login, verifyOtp } from "../../services/FrontApp/index.service";
import ErrorList from "../Common/ErrorList";
import { useNavigate } from "react-router-dom";

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

const AuthModal = ({ open, handleClose }) => {
  const [showPhoneNumberScreen, setshowPhoneNumberScreen] = useState(true);
  const [errors, setErrors] = useState([])
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValues, setOtpValues] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });
  const navigate = useNavigate();

  const handleChange = (key, event) => {
    setOtpValues({ ...otpValues, [key]: event.target.value });
  };

  const handleOnPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  }

  const handleCloseButton = () => {
    if (setShowThankYou) {
      setPhoneNumber('');
      setOtpValues({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
      });
    }
    setShowOtpScreen(false);
    setShowThankYou(false);
    setshowPhoneNumberScreen(true);

    handleClose();
  };

  const handleOtpSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrors([])
      const otp = `${otpValues.otp1}${otpValues.otp2}${otpValues.otp3}${otpValues.otp4}`;
      const data = {
        mobile: phoneNumber,
        otp,
        tenant_master_id: 1,
      }
      await verifyOtp(data)
      setshowPhoneNumberScreen(false);
      setShowOtpScreen(false);
      setShowThankYou(true);
      setTimeout(() => {
        handleCloseButton();
        navigate('dashboard/myorder')
      }, 3000);
    } catch (error) {
      setErrors(error.response.data.message)
    }

    console.log("otp values", otpValues);
  };

  const inputFocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 4) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const handlePhoneNumberSubmit = async () => {
    // Todo: Add phone number submit logic
    setErrors([]);
    try {
      const data = {
        mobile: phoneNumber,
        secret_key: process.env.REACT_APP_LOGIN_SECRET_KEY,
      };
      await login(data);
      setshowPhoneNumberScreen(false);
      setShowOtpScreen(true);
    } catch (error) {
      setErrors(error.response.data.message)
    }
  };

  const countrycode = [
    {
      value: "ind",
      label: "+91",
    },
    {
      value: "EUR",
      label: "+21",
    },
  ];

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={Boxstyle}
            style={{ border: "12px solid #ede5e5", width: "30em" }}
          >
            <DialogActions>
              <IconButton aria-label="close" onClick={handleCloseButton}>
                <CloseIcon />
              </IconButton>
            </DialogActions>
            <ErrorList errors={errors} />

            {showPhoneNumberScreen && (
              <div className="container phone-number">
                <Typography
                  className="text-center text-bold"
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bolder" }}
                >
                  LOGIN/REGISTER
                </Typography>

                <Box
                  className="d-flex mt-3"
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={1} className="w-100">
                    <Grid item xs={4}>
                      <TextField fullWidth
                        id="outlined-select-currency"
                        select
                        label="Country Code*"
                        defaultValue="ind"
                      >
                        {countrycode.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={8}>
                      <TextField
                        id="outlined-number"
                        label="Mobile Number*"
                        type="number"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          maxLength: 10,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={phoneNumber}
                        onChange={handleOnPhoneNumberChange}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <div>
                  <FormGroup className="mt-2">
                    <div className="d-flex">
                      <div>
                        {" "}
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                        />
                      </div>
                      <div>
                        {" "}
                        <small>
                          "I have read and accepted the{" "}
                          <Link to="terms-and-conditions" style={{ color: " #c07b7b" }}>
                            terms and conditions
                          </Link>{" "}
                          and{" "}
                          <Link style={{ color: " #c07b7b" }} to="privacy-policy">
                            privacy and policy
                          </Link>{" "}
                        </small>
                      </div>
                    </div>
                  </FormGroup>

                  {/*button  start */}
                  <div>
                    <Button
                      className="mt-4"
                      style={{ background: "black" }}
                      variant="contained"
                      fullWidth={true}
                      type="submit"
                      onClick={handlePhoneNumberSubmit}
                    >
                      CONTINUE{" "}
                      <img
                        className="ms-2"
                        src={rightArrowIcon}
                        alt="rightArrowIcon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {showOtpScreen && (
              <div className="container otp-input-container">
                <Typography
                  className="text-center text-bold"
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bolder" }}
                >
                  VERIFY MOBILE OTP
                </Typography>
                <p className="small-text text-center">
                  Enter 4 digit verification code received on your mobile
                  number.
                </p>

                <Container maxWidth="sm">
                  <form onSubmit={handleOtpSubmit}>
                    <div className="mt-2 otpContainer">
                      {[1, 2, 3, 4].map((index) => (
                        <input
                          key={index}
                          name={`otp${index}`}
                          type="text"
                          autoComplete="off"
                          className="otpInput"
                          value={otpValues[`otp${index}`]}
                          onChange={(e) => handleChange(`otp${index}`, e)}
                          tabIndex={index}
                          maxLength="1"
                          onKeyUp={(e) => inputFocus(e)}
                        />
                      ))}
                    </div>

                    <FormGroup className="mt-2">
                      <div className="d-flex justify-content-end">
                        <Link style={{ color: "#c07b7b", marginRight: "3rem" }}>
                          RESEND OTP
                        </Link>
                      </div>
                    </FormGroup>
                    <Button
                      className="primary mt-4 bg-black"
                      style={{ background: "black" }}
                      variant="contained"
                      fullWidth={true}
                      type="submit"
                    >
                      VERIFY
                    </Button>
                  </form>
                </Container>
              </div>
            )}

            {showThankYou && (
              <div className="container">
                <div className="d-flex justify-content-center">
                  <img src={successCheckIcon} alt="successful icon" />
                </div>

                <Typography
                  className="text-center text-bold mt-3"
                  id="transition-modal-title"
                  variant="h2"
                  component="h2"
                  sx={{
                    fontSize: "36px",
                    letterSpacing: "5.4px",
                    fontWeight: "bolder",
                    textTransform: "uppercase",
                  }}
                >
                  THANK YOU!
                </Typography>

                <Typography
                  className="text-center mt-1 mb-5"
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  Code successfully verified
                </Typography>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
