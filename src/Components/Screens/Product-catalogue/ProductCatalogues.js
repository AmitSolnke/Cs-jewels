import React, { useState } from "react";
import productBannerImage from "../../../images/banners/desktop/3.jpg";
import productImage from "../../../images/products/3.jpg";
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

export const ProductCatalogues = () => {
  const products = [
    {
      id: 1,
      image: productImage,
      name: "product category here",
    },
    {
      id: 2,
      image: productImage,
      name: "product category here",
    },
    {
      id: 3,
      image: productImage,
      name: "product category here",
    },
    {
      id: 4,
      image: productImage,
      name: "product category here",
    },
    {
      id: 5,
      image: productImage,
      name: "product category here",
    },
  ];

  const [chipData, setChipData] = useState([
    { key: 0, label: "ALL", selected: false },
    { key: 1, label: "DIAMOND RINGS", selected: false },
    { key: 2, label: "GOLD RINGS", selected: false },
    { key: 3, label: "SILVER RINGS", selected: false },
  ]);

  const handleChipDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <div className="product-catalogues">
      <div className="product-catalogue-banner">
        <img src={productBannerImage} alt="banner image" />
      </div>

      <div className="filter-dropdowns container">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-dropdown">CATEGORY</InputLabel>
          <Select
            labelId="category-dropdown"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="CATEGORY"
          >
            <MenuItem value={10}>Category 1</MenuItem>
            <MenuItem value={20}>Category 2</MenuItem>
            <MenuItem value={30}>Category 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-gender">GENDER</InputLabel>
          <Select
            labelId="category-gender"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="GENDER"
          >
            <MenuItem value={10}>Female</MenuItem>
            <MenuItem value={20}>Male</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-price-range">PRICE RANGE</InputLabel>
          <Select
            labelId="category-price-range"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="PRICE RANGE"
          >
            <MenuItem value={10}>Female</MenuItem>
            <MenuItem value={20}>Male</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-price-range">PRICE RANGE</InputLabel>
          <Select
            labelId="category-price-range"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="PRICE RANGE"
          >
            <MenuItem value={10}>PRICE RANGE</MenuItem>
            <MenuItem value={20}>PRICE RANGE</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-metal-type"> METAL TYPE </InputLabel>
          <Select
            labelId="category-metal-type"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="METAL TYPE"
          >
            <MenuItem value={10}>METAL TYPE</MenuItem>
            <MenuItem value={20}>METAL TYPE</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-metal-type"> SIZEWISE </InputLabel>
          <Select
            labelId="category-metal-type"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="SIZEWISE"
          >
            <MenuItem value={10}>SIZEWISE</MenuItem>
            <MenuItem value={20}>SIZEWISE</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-sort-by"> SORT BY </InputLabel>
          <Select
            labelId="category-sort-by"
            id="demo-simple-select-standard"
            // value={age}
            // onChange={handleChange}
            label="SORT BY"
          >
            <MenuItem value={10}>SORT BY</MenuItem>
            <MenuItem value={20}>SORT BY</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="container">
        <div className="filter-chips p-3">
          <Stack direction="row" spacing={1}>
            {chipData.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                onDelete={handleChipDelete(chip)}
                sx={{
                  borderRadius: "0px",
                  border: "1px solid #000",
                  borderColor: "#000",
                  color: chip.selected ? "#fff" : "#000",
                  backgroundColor: chip.selected ? "#000" : "#fff",
                }}
                clickable
                onClick={() => {
                  setChipData((chips) =>
                    chips.map((c) =>
                      c.key === chip.key ? { ...c, selected: !c.selected } : c
                    )
                  );
                }}
              />
            ))}
          </Stack>
        </div>

        <Box>
          <Grid container spacing={1} className="p-3">
            {products.map((product) => {
              return (
                <Grid
                  item
                  key={product.id}
                  md={4}
                  className="product-item-card"
                >
                  {/* <Card variant="outlined"> */}
                  <img
                    src={product.image}
                    alt="product image"
                    className="image"
                  />
                  <div className="text">
                    <hr />
                    <p>Product category name</p>
                  </div>
                  {/* </Card> */}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </div>
  );
};
