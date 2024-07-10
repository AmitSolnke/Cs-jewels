import React, { useState, useEffect } from "react";
import Sidebar from "../../Common/Sidebar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { AddressForm } from "./AddressForm";
import { getAllAddAddress } from "../../../services/profile";

export const AddressBook = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const result = await getAllAddAddress();
      setData(result.data.data)
    } catch (error) {
      setData([])
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState(null);

  const handleOpenForm = () => {
    setShowAddressForm(true);
  };

  const handleCloseForm = () => {
    setAddressData(null);
    setShowAddressForm(false);
  };

  const handleEditClick = (address) => {
    setAddressData({ ...address });
    handleOpenForm();
  };

  const handleRemoveClick = (id) => {
    console.log(id)
  };

  return (
    <div className="address-book-container p-3 col-12 col-md-7 col-lg-8">
      {!showAddressForm ? (
        <div className="col-12 col-md-10 col-lg-8">
          <h5>ADDRESS BOOK</h5>

          <div className="new-address-btn-wrapper p-3 my-4 bg-white">
            <Button
              className="btn btn-block bg-black btn-submit col-12 col-md-10 col-lg-6"
              variant="contained"
              type="submit"
              onClick={handleOpenForm}
            >
              ADD NEW ADDRESS &nbsp;
              <EastIcon />
            </Button>
          </div>
          <div className="saved-address-cards-container p-3 bg-white">
            <h5>SAVED ADDRESS</h5>

            <div className="cards-container">
              {data.map((address) => (
                <Card
                  key={address.id}
                  sx={{ minWidth: 100 }}
                  variant="outlined"
                  className="mt-3 p-2"
                >
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {address.first_name + " " + address.last_name}
                    </Typography>

                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {address.flat_no}, {address.street_name},
                    </Typography>

                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {address.city},  {address.country}, {address.pincode}.
                    </Typography>

                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      className="outlined-black"
                      onClick={() => handleEditClick(address)}
                    >
                      EDIT &nbsp;
                      <EastIcon />
                    </Button>

                    <Button
                      variant="outlined"
                      className="outlined-black"
                      onClick={() => handleRemoveClick(address.id)}
                    >
                      REMOVE &nbsp;
                      <EastIcon />
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <AddressForm
          handleCloseForm={handleCloseForm}
          addressData={addressData}
        />
      )}
    </div>
  );
};
