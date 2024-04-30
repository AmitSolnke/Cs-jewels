import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Button
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { BullionsFilter } from "../Bullions/BullionsFilter";
import { FilterMenu } from "../Bullions/FilterMenu";
import { SortMenu } from "../Bullions/SortMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMetals, getProductCategory, getProducts } from "../../../services/FrontApp/index.service";
import { Paginator } from "../../Common/Paginator";

export const ProductCatalogues = () => {
  const navigate = useNavigate()
  const [bullionsFilterOpen, setBullionsFilterOpen] = useState(false);
  const [bullionsFilterValue, setBullionsFilterValue] = useState(-1);
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const [metal, setMetal] = useState('');
  const [itemType, setItemType] = useState('');
  const [products, setProducts] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([])
  const [metals, setMetals] = useState([])

  const [chipData, setChipData] = useState([
    { key: 0, label: "ALL", selected: false },
    { key: 1, label: "DIAMOND RINGS", selected: false },
    { key: 2, label: "GOLD RINGS", selected: false },
    { key: 3, label: "SILVER RINGS", selected: false },
  ]);

  const sizes = ["5", "10", "15", "20", "25"];

  const [filters, setFilters] = useState({
    // 'type[0]': "",
    // 'metal_type[0]': "",
    // 'min_weight': "",
    // gender: "",
    // priceRange: "",
    // metalType: "",
    // sizeWise: "",
    // sortBy: "",

    // 'limit': 10,
    // 'page': 1,
    'type[0]': 4,
    'metal_type[0]': null,
    'min_weight': null,
    'max_weight': null,
    'sort_by': null,
    'search_query': null,
    'size': null,
    'gender': null,
    'min_price': null,
    'max_price': null,
    page: 1,
    limit: 10
  });

  const handleChangePage = (event, newPage) => {
    filters["page"] = newPage;
    const temp = Object.assign({}, filters);
    setFilters(temp);
    setRefreshCount(refreshCount + 1);
  };

  const getFiltersData = async () => {
    try {
      const result = await getProductCategory();
      setCategories(result.data.data)
      const metalResult = await getMetals();
      setMetals(metalResult.data.data)
    } catch (error) {
      setCategories([]);
    }
  }

  useEffect(() => {
    getFiltersData()
  }, [])

  const getData = async () => {
    try {
      const requestParams = new FormData();
      if (filters["type[0]"]) {
        requestParams.append("type[0]", filters["type[0]"])
      }
      if (filters["metal_type[0]"]) {
        requestParams.append("metal_type[0]", filters["metal_type[0]"])
      }
      if (filters["min_weight"]) {
        requestParams.append("min_weight", filters["min_weight"])
      }
      if (filters["max_weight"]) {
        requestParams.append("max_weight", filters["max_weight"])
      }
      if (filters["sort_by"]) {
        requestParams.append("sort_by", filters["sort_by"])
      }
      if (filters["search_query"]) {
        requestParams.append("search_query", filters["search_query"])
      }
      if (filters["size"]) {
        requestParams.append("size", filters["size"])
      }
      if (filters["gender"]) {
        requestParams.append("gender", filters["gender"])
      }
      if (filters["min_price"]) {
        requestParams.append("min_price", filters["min_price"])
      }
      if (filters["max_price"]) {
        requestParams.append("max_price", filters["max_price"])
      }
      if (filters.page) {
        requestParams.append("page", filters["page"])
      }
      if (filters.limit) {
        requestParams.append("limit", filters["limit"])
      }
      const { data } = await getProducts(requestParams);
      setProducts(data.data.data);
      setTotalPages(data.data.last_page);
    } catch (error) {
      setProducts([]);
      setTotalPages(0)
    }
  };

  useEffect(() => {
    getData();
  }, [refreshCount]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));

    getData();
  };
  const handleOpenBullionsFilter = () => {
    setBullionsFilterOpen(true);
  };

  const handleOpenFilterMenu = () => {
    setOpenSortMenu(false);
    handleOpenBullionsFilter();
  };

  const handleOpenSortMenu = () => {
    handleOpenBullionsFilter();
  };

  const handleCloseBullionsFilter = () => {
    setBullionsFilterValue(-1);
    setBullionsFilterOpen(false);
  };

  const handleApplyFilter = () => {
    // Todo : Apply filter logic
    handleCloseBullionsFilter();
  }

  const handleChipDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  useEffect(() => {
    setMetal(searchParams.get('metal') ? searchParams.get('metal') : '')
    setItemType(searchParams.get('item_type') ? searchParams.get('item_type') : '')
    handleFilterChange("search_query", searchParams.get('item_type') ? searchParams.get('item_type') : '')
  }, [])

  return (
    <div className="product-catalogues">
      <div className="product-catalogue-banner">
        <div className="catalogue-header-wrapper">
          <h4>{metal} {itemType}</h4>
          <p>40+ Rings options available</p>
        </div>
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
      <div className="d-none d-md-block">
        <div className="filter-dropdowns d-flex container">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category-dropdown">CATEGORY</InputLabel>
            <Select
              labelId="category-dropdown"
              id="demo-simple-select-standard"
              label="CATEGORY"
              value={filters.category}
              onChange={(e) => handleFilterChange("type[0]", e.target.value)}
            >
              {categories.map((item) => (
                <MenuItem value={item.id}>{item.category_name}</MenuItem>
              ))}
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
              <MenuItem value="0">Male</MenuItem>
              <MenuItem value="1">Female</MenuItem>
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
              <MenuItem value="priceRange1">1000 - 20000</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category-metal-type"> METAL TYPE </InputLabel>
            <Select
              labelId="category-metal-type"
              id="demo-simple-select-standard"
              label="METAL TYPE"
              value={filters.metalType}
              onChange={(e) => handleFilterChange("metal_type[0]", e.target.value)}
            >
              {metals.map((data) => (
                <MenuItem value={data.metal_type}>{data.metal_type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Todo: uncomment while integrating, giving error */}
          {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category-metal-type"> SIZEWISE </InputLabel>
            <Select
              labelId="category-metal-type"
              id="demo-simple-select-standard"
              label="SIZEWISE"
              value={filters.sizeWise}
              onChange={(e) => handleFilterChange("size", e.target.value)}
            >
              {
                sizes.map((data) => (
                  <MenuItem value={data}>{data}</MenuItem>
                ))
              }
            </Select>
          </FormControl> */}

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
              onChange={(e) => handleFilterChange("sort_by", e.target.value)}
            >
              <MenuItem value="low_to_high">Price - low to high</MenuItem>
              <MenuItem value="high_to_low">Price - high to low</MenuItem>
              <MenuItem value="is_popular">Popularity</MenuItem>
              <MenuItem value="newly_added">Newly added</MenuItem>
              <MenuItem value="bestseller">Bestsellers</MenuItem>
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
                  className="filter-chip"
                  sx={{
                    borderRadius: "0px",
                    border: "1px solid #333",
                    borderColor: "#333",
                    color: "#fff",
                    backgroundColor: "#333",
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
              <Button className='product-page-clear-all-button' >CLEAR ALL</Button>
            </Stack>
          </div>
        </div>
      </div>

      <Box>
        <Grid container spacing={1} className="p-3 product-item-wrapper">
          {products.map((product) => {
            return (
              <Grid
                item
                key={product.product_id}
                md={4}
                className="product-item-card"
                onClick={()=>navigate('/product-details/'+product.product_id)}
              >
                {/* <Card variant="outlined"> */}
                <img
                  src={product.image_path}
                  alt="product image"
                  className="image"
                />
                <div className="text">
                </div>
                {/* </Card> */}
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Paginator
        currentPage={filters.page}
        totalPage={totalPages}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};
