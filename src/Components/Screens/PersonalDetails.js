import React, { useState, useEffect } from "react";
import Sidebar from "../Common/Sidebar";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { myProfile, updateProfile } from "../../services/profile";
import ErrorList from "../Common/ErrorList";
import SuccessMsg from "../Common/SuccessMsg";

export const PersonalDetails = () => {
  const [errors, setErrors] = useState([])
  const [successMsg, setSuccesMsg] = useState('')
  const days = Array.from({ length: 31 }, (_, i) => { return { value: i + 1, label: i + 1 } });
  days.push({ value: '00', label: "Select Day" })
  const months = [
    { value: '00', label: "Select Month" },
    { value: '01', label: "January" },
    { value: '02', label: "February" },
    { value: '03', label: "March" },
    { value: '04', label: "April" },
    { value: '05', label: "May" },
    { value: '06', label: "June" },
    { value: '07', label: "July" },
    { value: '08', label: "August" },
    { value: '09', label: "September" },
    { value: '10', label: "October" },
    { value: '11', label: "November" },
    { value: '12', label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => { return { value: currentYear - i, label: currentYear - i } });
  years.push({ value: '0000', label: "Select Year" })

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    title: 'mrs',
    gender: 'm',
    email: '',
    dob: ''
  })
  const [date, setDate] = useState(1);
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState(currentYear - 20);

  const getData = async () => {
    const result = await myProfile();
    const dob = result.data.data[0].dob == null ? ['0000', '00', '00'] : result.data.data[0].dob.split("-")
    setYear(dob[0])
    setMonth(dob[1])
    setDate(dob[2])
    setData(result.data.data[0])
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
    setSuccesMsg('')
    try {
      const result = await updateProfile(data);
      setSuccesMsg(result.data.message)
    } catch (error) {
      setErrors(error.response.data.message)
    }

  };

  return (
    <div className="personal-details-container p-3 col-12 col-md-7 col-lg-8">
      <h5>PERSONAL DETAILS</h5>

      <div className="personal-details-form p-3 col-12 col-md-10 col-lg-8">
        <ErrorList errors={errors} />
        <SuccessMsg message={successMsg} />
        <form onSubmit={handleSubmit}>
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
                type="submit"
              >
                SAVE CHANGES &nbsp;
                <EastIcon />
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};
