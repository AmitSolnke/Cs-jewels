import { Box, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { isLoggedIn } from "../../../services/auth.service";
import { myProfile, updateProfile } from "../../../services/profile";
import ErrorList from "../../Common/ErrorList";

export const YourDetails = () => {
  const [errors, setErrors] = useState([])
  const days = Array.from({ length: 31 }, (_, i) => { return { value: i + 1,label: i + 1 } });
  days.push({value: '00', label: "Select Day"})
  const months = [
    {value: '00', label: "Select Month"},
    {value: '01', label: "January"},
    {value: '02', label: "February"},
    {value: '03', label: "March"},
    {value: '04', label: "April"},
    {value: '05', label: "May"},
    {value: '06', label: "June"},
    {value: '07', label: "July"},
    {value: '08', label: "August"},
    {value: '09', label: "September"},
    {value: '10', label: "October"},
    {value: '11', label: "November"},
    {value: '12', label: "December"},
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>  { return { value: currentYear - i,label: currentYear - i } });
  years.push({value: '0000', label: "Select Year"})
  
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    title: 'mrs',
    gender: 'm',
  })
  const [date, setDate] = useState(1);
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState(currentYear - 20);

  const getData = async () => {
    if (isLoggedIn()) {
      const result = await myProfile();
      setData({ ...result.data.data[0] })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = ({ target }) => {
    data[target.name] = target.value
    const temp = Object.assign({}, data)
    setData(temp)
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
    data['dob'] = `${event.target.value}-${month}-${year}`
    const temp = Object.assign({}, data)
    setData(temp)
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    data['dob'] = `${year}-${event.target.value}-${date}`
    const temp = Object.assign({}, data)
    setData(temp)
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
    data['dob'] = `${event.target.value}-${month}-${date}`
    const temp = Object.assign({}, data)
    setData(temp)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([])
    try {
      const result = await updateProfile(data);
      navigate("/order/check-out/delivery")
    } catch (error) {
      setErrors(error.response.data.message)
    }

  };

  return (
    <div className="your-details-wrapper">
      <Box className="your-details-box my-3">
        {!isLoggedIn() ? (
          <>
            <Typography variant="body1" color="initial">
              Already a member? <Link>LOGIN/REGISTER</Link> or continue as a
              guest
            </Typography>
            <AuthModal
              open={open}
              handleClose={handleCloseDialog} />
          </>
        ) : ''}
        <form>
          <ErrorList errors={errors} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-title">Title</InputLabel>
                <Select
                  labelId="select-title"
                  id="title-dropdown"
                  label="Title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                >
                  <MenuItem value={null}>Select Title</MenuItem>
                  <MenuItem value="mrs">Mrs</MenuItem>
                  <MenuItem value="mr">Mr</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                sx={{
                  border: "none",
                  outline: "none",
                }}
              >
                <InputLabel id="select-gender">Gender</InputLabel>
                <Select
                  labelId="select-gender"
                  id="gender-dropdown"
                  label="Gender"
                  value={data.gender}
                  name="gender"
                  sx={{
                    border: "none",
                    outline: "none",
                  }}
                  onChange={handleChange}
                >
                  <MenuItem value={null}>Select Gender</MenuItem>
                  <MenuItem value="f">Female</MenuItem>
                  <MenuItem value="m">Male</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="First Name"
                name="first_name"
                variant="outlined"
                sx={{ color: "#fff" }}
                required
                fullWidth
                value={data.first_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Last Name"
                name="last_name"
                variant="outlined"
                required
                fullWidth
                value={data.last_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                value={data.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Mobile Number"
                name="mobile"
                variant="outlined"
                required
                fullWidth
                value={data.mobile}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-date">Day</InputLabel>
                <Select
                  value={date}
                  labelId="select-date"
                  id="day-dropdown"
                  label="Day"
                  required
                  onChange={handleDateChange}
                >
                  {days.map((d) => (
                    <MenuItem key={d} value={d.value}>
                      {d.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-month">Month</InputLabel>
                <Select
                  labelId="select-month"
                  id="months-dropdown"
                  label="Month"
                  required
                  value={month}
                  onChange={handleMonthChange}
                >
                  {months.map((m, index) => (
                    <MenuItem key={index} value={m.value}>
                      {m.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-year">Year</InputLabel>
                <Select
                  labelId="select-year"
                  id="year-dropdown"
                  label="Year"
                  required
                  value={year}
                  onChange={handleYearChange}
                >
                  {years.map((y) => (
                    <MenuItem key={y} value={y.value}>
                      {y.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                className="btn btn-block bg-black btn-submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
              >
                CONTINUE TO DELIVERY &nbsp;
                <EastIcon />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

    </div>
  );
};
