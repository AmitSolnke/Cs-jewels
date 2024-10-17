import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  InputAdornment,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Grid2,
  CircularProgress,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  getCheckVPA,
  getSchemeId,
  getVerifyOtp,
  PostCreateMandate,
} from "../../services/FrontApp/index.service";
import SuccessMsg from "../Common/SuccessMsg";
import ErrorList from "../Common/ErrorList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import womanHoldingCandlesDark from "../../images/categories/womanHoldingCandlesDark.png";
import CloseIcon from "@mui/icons-material/Close";

export default function Enash() {
  const [schemeId, setSchemeId] = useState("");
  const [data, setData] = useState();
  const [customerEmail, setCustomerEmail] = useState(
    data?.customer_email || ""
  );
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(120);
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [successMsg, setSuccessMsg] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [errors, setErrors] = useState({
    schemeId: "",
    email: "",
    upiId: "",
    employeeId: "",
  });
  const timeoutRef = useRef(null);

  const Loader = () => (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  const formatTime = (time) => {
    const minutes = String(Math?.floor(time / 60))?.padStart(2, "0");
    const seconds = String(time % 60)?.padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const validateSchemeId = (value) => {
    const schemeIdPattern = /^[A-Za-z0-9]+$/;

    if (value?.length > 20) {
      return "Scheme ID cannot exceed 20 characters.";
    } else if (!schemeIdPattern?.test(value)) {
      return "Scheme ID should contain only letters and numbers.";
    }
    return "";
  };

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value?.length > 50) {
      return "Email id cannot exceed 50 characters.";
    } else if (!emailPattern?.test(value)) {
      return "Email ID must be in a valid format and can only contain '@', '.', and '-'.";
    }
    return "";
  };

  const validateUpiId = (value) => {
    const upiPattern = /^[a-zA-Z0-9._-]{1,15}@[a-zA-Z0-9.-]+$/;

    if (!upiPattern?.test(value)) {
      return "Invalid UPI ID format. Ensure the username is 1-15 characters.";
    }

    const [username, domain] = value?.split("@");

    if (username.length > 15) {
      return "Username should not exceed 15 characters.";
    }

    return "";
  };

  const validateEmployeeId = (value) => {
    const employeeIdPattern = /^[A-Za-z0-9 ]*$/;
    if (value?.length > 10) {
      return "Employee id cannot exceed 10 characters.";
    } else if (!employeeIdPattern?.test(value)) {
      return "Employee ID can only contain letters, numbers, and spaces.";
    }
    return "";
  };

  const handleSchemeIdChange = (e) => {
    const value = e.target.value;
    setSchemeId(value);
    const error = validateSchemeId(value);
    setErrors((prevErrors) => ({ ...prevErrors, schemeId: error }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setCustomerEmail(value);
    const error = validateEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: error }));
  };

  const handleUpiIdChange = (e) => {
    e?.persist();
    const value = e?.target?.value;
    setUpiId(value);

    const error = validateUpiId(value);
    setErrors((prevErrors) => ({ ...prevErrors, upiId: error }));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!error) {
      setLoading(true);

      timeoutRef.current = setTimeout(async () => {
        const formData = { scheme_id: schemeId, upi_id: value };

        try {
          const result = await getCheckVPA(formData);
          setLoading(false);

          setLastMessage(result?.data?.message);

          if (result?.data?.status === true) {
            toast.success(result?.data?.message, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                backgroundColor: "#4caf50",
                color: "#fff",
                fontSize: "16px",
              },
            });
            setIsVerified(true);
          } else {
            toast.error(result?.data?.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                backgroundColor: "#df4759",
                color: "#fff",
                fontSize: "16px",
              },
            });
          }
        } catch (error) {
          setLoading(false);
          const errorMessage =
            error.response?.data?.message ||
            "An error occurred. Please try again later.";

          setErrors({ apiError: errorMessage });
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#df4759",
              color: "#fff",
              fontSize: "16px",
            },
          });
        }
      }, 3000);
    }
  };

  React?.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleEmployeeIdChange = (e) => {
    const value = e?.target?.value;
    setEmployeeId(value);

    const error = validateEmployeeId(value);
    setErrors((prevErrors) => ({ ...prevErrors, employeeId: error }));
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp?.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendClick = async () => {
    if (!schemeId) {
      setErrors({ schemeId: "Scheme ID cannot be empty." });
      return;
    }
    setShowModal(true);
    const id = { scheme_id: schemeId };
    if (clickCount <= 3) {
      setClickCount(clickCount + 1);
      try {
        const result = await getSchemeId(id);
        setShowModal(true);
        setTimer(120);
        setIsButtonDisabled(false);
        if (result?.data?.status === true) {
          toast.success(result?.data?.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#4caf50",
              color: "#fff",
              fontSize: "16px",
            },
          });
        } else {
          toast.error(result?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#df4759",
              color: "#fff",
              fontSize: "16px",
            },
          });
        }
      } catch (error) {
        if (
          error?.response &&
          error?.response?.data &&
          error?.response?.data?.message
        ) {
          setErrors({ apiError: error?.response?.data?.message });
        } else {
          setErrors({ apiError: "An error occurred. Please try again later." });
        }
      }
      setErrorMsg(
        "You have reached the maximum number of resends. Please refresh the page to try again."
      );
    } else {
    }
  };

  const handleSchemeId = async () => {
    if (!schemeId) {
      setErrors({ schemeId: "Scheme ID cannot be empty." });
      return;
    }
    const id = { scheme_id: schemeId };

    try {
      const result = await getSchemeId(id);
      setTimer(120);
      setIsButtonDisabled(false);

      if (result?.data?.status === true) {
        toast.success(result?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#4caf50",
            color: "#fff",
            fontSize: "16px",
          },
        });
        setShowModal(true);
      } else {
        toast.error(result?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#df4759",
            color: "#fff",
            fontSize: "16px",
          },
        });
      }
    } catch (error) {}
  };

  const handleVerifyOtp = async () => {
    const formData = { scheme_id: schemeId, otp: otp.join("") };

    try {
      const result = await getVerifyOtp(formData);
      setShowModal(false);

      setData(result?.data?.data);
      setShowModal(false);

      setErrors({});

      if (result?.data?.status === true) {
        toast.success(result?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#4caf50",
            color: "#fff",
            fontSize: "16px",
          },
        });
        setShowSuccessModal(true);
      } else {
        toast.error(result?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#df4759",
            color: "#fff",
            fontSize: "16px",
          },
        });
        setShowModal(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
      } else {
        setErrors({ apiError: "An error occurred. Please try again later." });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemeIdError = validateSchemeId(schemeId);
    const emailError = validateEmail(customerEmail);
    const upiError = validateUpiId(upiId);
    const employeeIdError = validateEmployeeId(employeeId);

    setErrors({
      schemeId: schemeIdError,
      email: emailError,
      upiId: upiError,
      employeeId: employeeIdError,
    });

    const form = {
      scheme_id: schemeId,
      customer_email: customerEmail,
      emi_debit_date: selectedDay,
    };

    try {
      const result = await PostCreateMandate(form);
      setSuccessMsg(result?.data?.message);

      setErrors({});
      if (result?.data?.status === true) {
        toast.success(result?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#4caf50",
            color: "#fff",
            fontSize: "16px",
          },
        });
        setIsModalOpen(true);
      } else {
        toast.error(result?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#df4759",
            color: "#fff",
            fontSize: "16px",
          },
        });
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate.setDate(currentDate.getDate() + 1));

    const formattedMinDate = tomorrow.toISOString().split("T")[0];
    setMinDate(formattedMinDate);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    setSelectedDay(formattedDate);
  };
  const handleChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleKeyDown = (index, event) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="header-content ">
      <SuccessMsg message={successMsg} />
      <ToastContainer />
      {errors.apiError && <ErrorList errors={[errors.apiError]} />}
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={7}
          xl={6}
          sx={{
            width: { xs: "100%", sm: "90%", md: "80%", lg: "70%", xl: "60%" },
            p: { xs: 2, sm: 3 },
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            E-Mandate Form
          </h3>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Scheme ID"
                  variant="outlined"
                  id="outlined-basic"
                  fullWidth
                  required
                  name="scheme_id"
                  className="text-field text-field-name-contact-us"
                  value={schemeId}
                  error={Boolean(errors?.schemeId)}
                  onChange={handleSchemeIdChange}
                  helperText={errors?.schemeId}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleSchemeId}
                  sx={{ bgcolor: "black", borderRadius: 1 }}
                >
                  GET OTP
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Scheme Name"
                  variant="outlined"
                  required
                  InputLabelProps={{
                    shrink: !!data?.scheme_name,
                  }}
                  fullWidth
                  value={data?.scheme_name}
                  disabled
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      border: "1px  #000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                  disabled
                  required
                  value={data?.customer_name}
                  InputLabelProps={{
                    shrink: !!data?.customer_name,
                  }}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      border: "1px  #000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Customer Mobile No"
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                  value={data?.customer_mobile}
                  InputLabelProps={{
                    shrink: !!data?.customer_mobile,
                  }}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      border: "1px  #000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Customer Email ID"
                  variant="outlined"
                  fullWidth
                  value={customerEmail}
                  error={Boolean(errors?.email)}
                  onChange={handleEmailChange}
                  helperText={errors?.email}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Debit Amount"
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      border: "1px  #000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label=" Scheme Start Date"
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                  value={data?.start_date}
                  InputLabelProps={{
                    shrink: !!data?.start_date,
                  }}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      border: "1px  #000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Scheme Expiry Date"
                  variant="outlined"
                  fullWidth
                  disabled
                  required
                  value={data?.end_date}
                  InputLabelProps={{
                    shrink: !!data?.end_date,
                  }}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      border: "1px  #000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="date"
                  fullWidth
                  onChange={handleDateChange}
                  label="EMI Debit Day (EMI will be debited on the selected day every
                    month till the expiry date)*"
                  InputProps={{
                    sx: {
                      color: "black",
                    },
                    name: "selectedDay",
                  }}
                  inputProps={{
                    min: minDate,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  label="UPI ID"
                  placeholder="Enter UPI ID"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {loading ? (
                          <Loader />
                        ) : isVerified ? (
                          <span className="text-success">✔️</span>
                        ) : null}
                      </InputAdornment>
                    ),
                    style: { borderRadius: 0, border: "1px  #000" },
                  }}
                  value={upiId}
                  onChange={handleUpiIdChange}
                  error={Boolean(errors?.upiId)}
                  helperText={errors?.upiId}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors?.employeeId)}
                  onChange={handleEmployeeIdChange}
                  helperText={errors?.employeeId}
                  defaultValue={data?.employee_id}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      border: "1px  #000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Employee Name"
                  variant="outlined"
                  fullWidth
                  value={data?.employee_name}
                  InputProps={{
                    style: {
                      borderRadius: 0,
                      border: "1px  #000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ bgcolor: "black" }}
                  disabled={!(isVerified && schemeId && selectedDay)}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Dialog
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setOtp(new Array(4).fill(""));
          setTimer(120);
          setIsButtonDisabled(false);
        }}
        PaperProps={{
          style: {
            borderRadius: "0",
            backgroundColor: "#f0eee5",
            width: "550px",
            maxWidth: "90%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <DialogContent
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            margin: "20px",
            textAlign: "center",
            width: "100%",
            maxWidth: "500px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" className="mt-5">
            ENTER OTP
          </Typography>
          <Typography className="mt-3">
            We have sent an OTP to the given number
          </Typography>
          <Typography>89894839483984</Typography>

          <div className="otp-inputs mt-5" style={{ display: "flex", gap: 20 }}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  width: "60px",
                  height: "60px",
                  textAlign: "center",
                }}
                inputProps={{
                  maxLength: 1,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            ))}
          </div>

          <Typography className="mt-5">
            Did not receive an OTP
            <a
              href="#"
              className={` text-decoration-underline ms-1 `}
              style={{
                color: clickCount >= 4 ? "grey" : "blue",
                cursor: clickCount >= 4 ? "not-allowed" : "pointer",
              }}
              onClick={(e) => {
                e?.preventDefault();
                handleResendClick();
              }}
            >
              Resend
            </a>
          </Typography>
          {clickCount >= 4 && (
            <Typography className="text-danger mt-2">{errorMsg}</Typography>
          )}
          <Typography className="mt-3"> {formatTime(timer)}</Typography>
          <DialogActions
            style={{
              justifyContent: "center",
              width: "100%",
              marginTop: "40px",
            }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6} md={6}>
                {" "}
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowModal(false);
                    setOtp(new Array(4).fill(""));
                    setTimer(120);
                    setIsButtonDisabled(false);
                  }}
                  style={{ borderRadius: "0", width: "100%" }}
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item xs={6} md={6}>
                {" "}
                <Button
                  variant="contained"
                  onClick={handleVerifyOtp}
                  style={{
                    borderRadius: "0",
                    width: "100%",
                  }}
                  color="primary"
                  sx={{ bgcolor: "black", borderRadius: 1 }}
                  disabled={isButtonDisabled}
                >
                  VERIFY OTP
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        PaperProps={{
          style: {
            borderRadius: "0",
            backgroundColor: "#fff",
            width: "450px",
            maxWidth: "90%",
            textAlign: "center",
          },
        }}
      >
        <DialogContent style={{ padding: "20px" }}>
          <CheckCircleOutlineIcon
            style={{ fontSize: "80px", color: "green" }}
          />
          <Typography
            variant="h6"
            style={{ marginTop: "20px", color: "green" }}
          >
            OTP Verified Successfully!
          </Typography>
          <Button
            onClick={() => setShowSuccessModal(false)}
            variant="contained"
            style={{ marginTop: "20px", borderRadius: 0 }}
            color="primary"
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            padding: "0px",

            backgroundColor: "#f0eee5",

            width: "100%",
            overflow: "hidden",
            maxWidth: "1000px",
          },
        }}
      >
        <DialogContent style={{ overflow: "hidden", padding: "0px" }}>
          <img
            src={womanHoldingCandlesDark}
            alt="Success Illustration"
            style={{
              maxWidth: "100%",
              padding: "0px",
              height: "600px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "5%",
              padding: "5px",
              left: "50%",
              width: "470px",
              height: "540px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                color: "#000",
                size: "20px",
              }}
            >
              <CloseIcon />
            </IconButton>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "150px",
              }}
            >
              <CircularProgress size={120} color="#5a3e3e"></CircularProgress>
              <Typography style={{ fontSize: "35px" }}>
                E-Mandate process
              </Typography>
              <Typography style={{ fontSize: "35px" }}>
                completed successfully!
              </Typography>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
