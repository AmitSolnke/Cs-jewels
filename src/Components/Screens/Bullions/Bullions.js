import React, { useEffect, useState } from "react";
import productDashBoardImage from "../../../images/productDashBoardImage.png";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import fillWhiteLeftIcon from "../../../images/icons/fillWhiteLeftIcon.svg";
import fillWhiteRightIcon from "../../../images/icons/fillWhiteRightIcon.svg";
import ProductBreadcrumb from "../../ProductBreadcrumb";
import ClearFilterIcon from "../../../images/icons/ClearFilterIcon.svg";
import ProductCard from "../../ProductCard";
import { Paginator } from "../../Common/Paginator";
import { getProducts } from "../../../services/FrontApp/index.service";
import { BullionsFilter } from "./BullionsFilter";
import { SortMenu } from "./SortMenu";
import { FilterMenu } from "./FilterMenu";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
var removeByAttr = function (arr, attr, value) {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

const typeValues = [
  {
    id: 1,
    name: "Coins",
  },
  {
    id: 2,
    name: "Bars",
  },
  {
    id: 3,
    name: "Vedhani",
  },
];

export default function Bullions() {
  const [bullionsFilterOpen, setBullionsFilterOpen] = useState(false);
  const [bullionsFilterValue, setBullionsFilterValue] = useState(-1);
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  const handleOpenBullionsFilter = () => {
    setBullionsFilterOpen(true);
  };

  const handleCloseBullionsFilter = () => {
    setBullionsFilterValue(-1);
    setBullionsFilterOpen(false);
  };

  const handleOpenFilterMenu = () => {
    setOpenFilterMenu(true);
    setOpenSortMenu(false);
    handleOpenBullionsFilter();
  };

  const handleOpenSortMenu = () => {
    setOpenSortMenu(true);
    setOpenFilterMenu(false);
    handleOpenBullionsFilter();
  };

  const handleApplyFilter = () => {
    // Todo : Apply filter logic
    handleCloseBullionsFilter();
  }

  const navigationData = [
    {
      text: "Home",
      path: "",
    },
    {
      text: "Bullion",
      path: "bullion",
    },
    {
      text: "Silver",
      path: "silver",
    },
  ];
  const [typeNameSelected, setTypeName] = React.useState([
    {
      id: 1,
      name: "Coins",
    },
  ]);
  const [filterData, setFilterData] = useState({
    limit: 12,
    page: 1,
    sort_by: "",
  });
  const [refrashCount, setRefrashCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const { data } = await getProducts(filterData);
    setProducts(data.data.data);
    setTotalPages(data.data.last_page);
  };

  useEffect(() => {
    getData();
  }, [refrashCount]);

  const handleChange = ({ target }) => {
    filterData[target.name] = target.value;
    const temp = Object.assign({}, filterData);
    setFilterData(temp);
    setRefrashCount(refrashCount + 1);
  };

  const handleChangePage = (event, newPage) => {
    filterData["page"] = newPage;
    const temp = Object.assign({}, filterData);
    setFilterData(temp);
    setRefrashCount(refrashCount + 1);
  };

  const handleDeleteFilterData = (event) => {
    var tempArray = typeNameSelected;
    tempArray = removeByAttr(tempArray, "id", event);
    setTypeName(tempArray);
    console.info(tempArray);
  };
  return (
    <div className="about-us">
      <div className="col-12">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={12}
              className="product-dash-board-header-image-container"
              style={{ backgroundImage: `url(${productDashBoardImage})` }}
            >
              <div className="breadcrumb-container-productpage">
                <ProductBreadcrumb navigationData={navigationData} />
              </div>
              <div className="product-dash-board-image-header-text-container">
                <div className="product-dash-board-header text-only-grid-header">
                  <img src={fillWhiteLeftIcon} alt="React Logo" />
                  {"  "}
                  Bullion <img src={fillWhiteRightIcon} alt="React Logo" />
                </div>
                <div className="product-dash-board-description">
                  Discover the timeless beauty and enduring value of bullion, a
                  symbol of luxury that transcends generations.
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>

      <Paper
        className="mobile-filter-section"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: "9999",
        }}
      >
        <BottomNavigation
          showLabels
          value={bullionsFilterValue}
          onChange={(event, newValue) => {
            setBullionsFilterValue(newValue);
          }}
        >
          {bullionsFilterValue == -1 && <BottomNavigationAction label="Filter" onClick={handleOpenFilterMenu} />}
          {bullionsFilterValue == -1 && <BottomNavigationAction label="Sort" onClick={handleOpenSortMenu} />}

          {bullionsFilterValue == 0 && <BottomNavigationAction label="CLOSE" onClick={handleCloseBullionsFilter} />}
          {bullionsFilterValue == 0 && <BottomNavigationAction label="APPLY" onClick={handleApplyFilter} />}
          {bullionsFilterValue == 1 && <BottomNavigationAction label="CLEAR" onClick={handleCloseBullionsFilter} />}
          {bullionsFilterValue == 1 && <BottomNavigationAction label="APPLY" onClick={handleApplyFilter} />}

        </BottomNavigation>

        <BullionsFilter
          isOpen={bullionsFilterOpen}
          onClose={handleCloseBullionsFilter}
          style={{ borderLeft: "2px solid" }}
        >
          {openSortMenu ? <SortMenu onClose={handleCloseBullionsFilter} /> : <FilterMenu />}
        </BullionsFilter>
      </Paper>

      <div className="filter-section">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={1} md={1}>
              <Item className="empty-container-section">xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select
                defaultValue={1}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                displayEmpty
                value={typeNameSelected}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => "TYPE"}
              >
                {typeValues.map((variant) => (
                  <MenuItem key={variant.id} value={variant}>
                    <Checkbox
                      checked={
                        typeNameSelected.findIndex(
                          (item) => item.id === variant.id
                        ) >= 0
                      }
                    />
                    <ListItemText primary={variant.name} />
                  </MenuItem>
                ))}
              </Select>
              <Select
                defaultValue={1}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                displayEmpty
                value={typeNameSelected}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => "METAL"}
              >
                {typeValues.map((variant) => (
                  <MenuItem key={variant.id} value={variant}>
                    <Checkbox
                      checked={
                        typeNameSelected.findIndex(
                          (item) => item.id === variant.id
                        ) >= 0
                      }
                    />
                    <ListItemText primary={variant.name} />
                  </MenuItem>
                ))}
              </Select>
              <Select
                defaultValue={1}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                displayEmpty
                value={typeNameSelected}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => "WEIGHT"}
              >
                {typeValues.map((variant) => (
                  <MenuItem key={variant.id} value={variant}>
                    <Checkbox
                      checked={
                        typeNameSelected.findIndex(
                          (item) => item.id === variant.id
                        ) >= 0
                      }
                    />
                    <ListItemText primary={variant.name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid className="product-page-sort-by-container" item xs={1} md={6}>
              <Select
                defaultValue={1}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                renderValue={(selected) => "SORT BY"}
              >
                <MenuItem value={1}>Price - low to high</MenuItem>
                <MenuItem value={2}>Price - high to low</MenuItem>
                <MenuItem value={3}>Popularity</MenuItem>
                <MenuItem value={3}>Newly added</MenuItem>
                <MenuItem value={3}>Bestsellers</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1} md={1}>
              <Item className="empty-container-section">xs=6 md=4</Item>
            </Grid>
            <Grid item xs={1} md={12}>
              <Divider className="product-page-divider" variant="middle" />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={1} md={1}>
              <Item className="empty-container-section">xs=6 md=4</Item>
            </Grid>
            <Grid item xs={1} md={10}>
              {typeNameSelected.map((element) => (
                <Chip
                  className="product-page-chip"
                  key={element.id}
                  onDelete={() => handleDeleteFilterData(element.id)}
                  label={element.name}
                  deleteIcon={<img src={ClearFilterIcon} />}
                />
              ))}
              <Button className="product-page-clear-all-button">
                CLEAR ALL
              </Button>
            </Grid>
            <Grid item xs={1} md={1}>
              <Item className="empty-container-section">xs=6 md=4</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid spacing={1} container className="product-grid-container">
          <Grid className="product-list-grid-section" item xs={12} md={10}>
            {products.map((product, index) => (
              <ProductCard
                productImage={product.image_path}
                productName={product.product_name}
                productPrice={product.sales_price}
                id={product.product_id}
                key={index}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
      <Paginator
        currentPage={filterData.page}
        totalPage={totalPages}
        handleChangePage={handleChangePage}
      />
    </div>
  );
}
