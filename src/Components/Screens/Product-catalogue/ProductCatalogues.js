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

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    priceRange: "",
    metalType: "",
    sizeWise: "",
    sortBy: "",
  });

  const handleFilterChange = (filterName, value) => {
    console.log(filters);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

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

      <div className="filter-dropdowns d-flex container">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-dropdown">CATEGORY</InputLabel>
          <Select
            labelId="category-dropdown"
            id="demo-simple-select-standard"
            label="CATEGORY"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <MenuItem value="cat1">Category 1</MenuItem>
            <MenuItem value="cat2">Category 2</MenuItem>
            <MenuItem value="cat3">Category 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-gender">GENDER</InputLabel>
          <Select
            labelId="category-gender"
            id="demo-simple-select-standard"
            label="GENDER"
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
          >
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="male">Male</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-price-range">PRICE RANGE</InputLabel>
          <Select
            labelId="category-price-range"
            id="demo-simple-select-standard"
            label="PRICE RANGE"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          >
            <MenuItem value="priceRange1">PRICE RANGE</MenuItem>
            <MenuItem value="priceRange2">PRICE RANGE</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-metal-type"> METAL TYPE </InputLabel>
          <Select
            labelId="category-metal-type"
            id="demo-simple-select-standard"
            label="METAL TYPE"
            value={filters.metalType}
            onChange={(e) => handleFilterChange("metalType", e.target.value)}
          >
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="silver">Silver</MenuItem>
            <MenuItem value="platinum">Platinum</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-metal-type"> SIZEWISE </InputLabel>
          <Select
            labelId="category-metal-type"
            id="demo-simple-select-standard"
            label="SIZEWISE"
            value={filters.sizeWise}
            onChange={(e) => handleFilterChange("sizeWise", e.target.value)}
          >
            <MenuItem value="size1">SIZEWISE</MenuItem>
            <MenuItem value="size2">SIZEWISE</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, marginLeft: "auto" }}
        >
          <InputLabel id="category-sort-by"> SORT BY </InputLabel>
          <Select
            labelId="category-sort-by"
            id="demo-simple-select-standard"
            label="SORT BY"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <MenuItem value="sortBy1">SORT BY</MenuItem>
            <MenuItem value="sortBy2">SORT BY</MenuItem>
          </Select>
        </FormControl>
      </div>

      <hr />

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
