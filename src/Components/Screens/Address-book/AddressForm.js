import {
  Box,
  FormControl,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import React, { useState, useEffect } from "react";
import { addAddress } from "../../../services/profile";
import ErrorList from "../../Common/ErrorList";
import SuccessMsg from "../../Common/SuccessMsg";

export const AddressForm = ({ handleCloseForm }) => {
  const countries = ["India", "Indonasia", "Iran", "Irac"];
  const cities = ["Baramati", "Pune", "Nasik", "Nagpur", "Thane"];
  const [errors, setErrors] = useState([])
  const [successMsg, setSuccesMsg] = useState('')

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    flat_no: '',
    street_name: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    address_type: '',
    is_default: 0
  })

  const handleChange = ({ target }) => {
    data[target.name] = target.value
    const temp = Object.assign({}, data)
    setData(temp)
  }

  const handleClean = () => {
    setData({
      first_name: '',
      last_name: '',
      flat_no: '',
      street_name: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      address_type: '',
      is_default: 0
    })
  };

  const cancel = () => {
    handleClean()
    handleCloseForm()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([])
    setSuccesMsg('')
    try {
      const result = await addAddress(data);
      setSuccesMsg(result.data.message)
      handleClean()
    } catch (error) {
      setErrors(error.response.data.message)
    }
  };

  return (
    <div className="d-flex col-12 col-lg-8 col-xl-6">
      <div className="address-form-container p-3">
        <h5>ADDRESS BOOK</h5>

        <Box className="address-form-wrapper p-3 my-4 bg-white">
          <ErrorList errors={errors} />
          <SuccessMsg message={successMsg} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="input-first-name"
                  label="First Name"
                  variant="outlined"
                  required
                  fullWidth
                  name="first_name"
                  value={data.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="input-last-name"
                  label="Last Name"
                  variant="outlined"
                  required
                  fullWidth
                  name="last_name"
                  value={data.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-address1"
                  label="Flat no, Building name"
                  variant="outlined"
                  required
                  fullWidth
                  name="flat_no"
                  value={data.flat_no}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-address2"
                  label="Street name, Landmark"
                  variant="outlined"
                  required
                  fullWidth
                  name="street_name"
                  value={data.street_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-country">Country</InputLabel>
                  <Select
                    labelId="select-country"
                    id="country-dropdown"
                    label="Country"
                    required
                    name="country"
                    value={data.country}
                    onChange={handleChange}
                  >
                    {countries.map((d) => (
                      <MenuItem key={d} value={d}>
                        {d}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="select-city">City</InputLabel>
                  <Select
                    labelId="select-city"
                    id="city-dropdown"
                    label="City"
                    required
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                  >
                    {cities.map((d) => (
                      <MenuItem key={d} value={d}>
                        {d}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  id="input-pincode"
                  label="Pincode"
                  variant="outlined"
                  required
                  fullWidth
                  name="pincode"
                  value={data.pincode}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel id="address-type-radio-buttons-group-label">
                    Address Type
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="address-type-radio-buttons-group-label"
                    defaultValue="home"
                    name="radio-buttons-group"
                    className="radio-group"
                  >
                    <FormControlLabel
                      value="home"
                      className="radio-label"
                      control={<Radio name="address_type" value="H" checked={data.address_type == 'H'} onChange={handleChange}/>}
                      label="Home"
                    />

                    <FormControlLabel
                      value="office"
                      className="radio-label"
                      control={<Radio name="address_type" value="W" checked={data.address_type == 'W'} onChange={handleChange}/>}
                      label="Office"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={6}>
                <Button
                  onClick={cancel}
                  variant="outlined"
                  className="outlined-black"
                  fullWidth
                >
                  CANCEL &nbsp;
                  <EastIcon />
                </Button>
              </Grid>

              <Grid item xs={6} md={6}>
                <Button className="btn btn-block bg-black p-3" fullWidth type="submit">
                  ADD ADDRESS &nbsp;
                  <EastIcon />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </div>
  );
};
