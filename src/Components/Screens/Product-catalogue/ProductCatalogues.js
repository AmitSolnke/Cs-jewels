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
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { BullionsFilter } from "../Bullions/BullionsFilter";
import { FilterMenu } from "../Bullions/FilterMenu";
import { SortMenu } from "../Bullions/SortMenu";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  getMetals,
  getMetalItems,
  getProductCategory,
  getProducts,
  getMetalTypeById,
  getItemById,
} from "../../../services/FrontApp/index.service";
import { Paginator } from "../../Common/Paginator";

export const ProductCatalogues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bullionsFilterOpen, setBullionsFilterOpen] = useState(false);
  const [bullionsFilterValue, setBullionsFilterValue] = useState(-1);
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const [banner, setBanner] = useState("");
  const [searchParams] = useSearchParams();
  const [metal, setMetal] = useState({
    id: "",
    name: "",
  });
  const [itemType, setItemType] = useState({
    id: "",
    name: "",
  });
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [metals, setMetals] = useState([]);
  const [items, setItems] = useState([]);

  const [chipData, setChipData] = useState([]);

  const sizes = ["5", "10", "15", "20", "25"];

  const [filters, setFilters] = useState({
    "type[0]": "",
    "metal_type[0]": "",
    item_master_id: "",
    sort_by: "",
    size: "",
    gender: "",
    page: 1,
    limit: 12,
  });

  const handleChangePage = (event, newPage) => {
    filters["page"] = newPage;
    const temp = Object.assign({}, filters);
    setFilters(temp);
    setRefreshCount(refreshCount + 1);
    navigate(
      `/product-catalogues?page=${newPage}&type[0]=${filters["type[0]"]}&metal=${filters["metal_type[0]"]}&item_type=${filters["item_master_id"]}&gender=${filters["gender"]}&sort_by=${filters["sort_by"]}`
    );
  };

  const getFiltersData = async () => {
    try {
      const result = await getProductCategory();
      setCategories(result.data.data);
      const metalResult = await getMetals();
      setMetals(metalResult.data.data);
      getMetalTypeById();
    } catch (error) {
      setMetals([]);
      setCategories([]);
    }
  };

  useEffect(() => {
    getFiltersData();
  }, []);

  const getData = async () => {
    try {
      const requestParams = new FormData();
      const metalId = searchParams.get("metal")
        ? searchParams.get("metal")
        : "";
      const itemTypeId = searchParams.get("item_type")
        ? searchParams.get("item_type")
        : "";
      const gender = searchParams.get("gender")
        ? searchParams.get("gender")
        : "";
      const sort_by = searchParams.get("sort_by")
        ? searchParams.get("sort_by")
        : "";
      const type = searchParams.get("type[0]")
        ? searchParams.get("type[0]")
        : "";
      if (type) {
        requestParams.append("type[0]", type);
      }
      if (metalId) {
        requestParams.append("metal_type[0]", metalId);
      }
      if (sort_by) {
        requestParams.append("sort_by", sort_by);
      }
      if (itemTypeId) {
        requestParams.append("item_master_id", itemTypeId);
      }
      if (filters["size"]) {
        requestParams.append("size", filters["size"]);
      }
      if (gender) {
        requestParams.append("gender", gender);
      }
      if (filters.page) {
        requestParams.append("page", filters["page"]);
      }
      if (filters.limit) {
        requestParams.append("limit", filters["limit"]);
      }

      const { data } = await getProducts(requestParams);
      // if (data.data.data) {
      setProducts(data?.data?.data);
      // let bannerImg = data?.product_list_banner?.[0]?.image_path?.replace(
      //   "//",
      //   "/"
      // );
      // bannerImg = bannerImg?.replace("http:/", "http://");
      let bannerImg = data?.product_list_banner?.[0]?.image_path;

      setBanner(bannerImg);
      // } else {
      //   setProducts([]);
      // }
      setTotalPages(data.data.last_page);
      setProductCount(data.data.total);
    } catch (error) {
      setProducts([]);
      setTotalPages(0);
      setProductCount(0);
    }
  };
  useEffect(() => {
    setParamsData();
    setTimeout(getData, 1000);
  }, [location.search]);

  const handleFilterChange = (filterName, value) => {
    if (filterName == "type[0]" && value) {
      navigate(
        `/product-catalogues?type[0]=${value}&metal=${filters["metal_type[0]"]}&item_type=${filters["item_master_id"]}&gender=${filters["gender"]}&sort_by=${filters["sort_by"]}`
      );
    }
    if (filterName == "metal_type[0]" && value) {
      navigate(
        `/product-catalogues?type[0]=${filters["type[0]"]}&metal=${value}&item_type=${filters["item_master_id"]}&gender=${filters["gender"]}&sort_by=${filters["sort_by"]}`
      );
    }
    if (filterName == "item_master_id" && value) {
      navigate(
        `/product-catalogues?type[0]=${filters["type[0]"]}&metal=${filters["metal_type[0]"]}&item_type=${value}&gender=${filters["gender"]}&sort_by=${filters["sort_by"]}`
      );
    }
    if (filterName == "sort_by" && value) {
      navigate(
        `/product-catalogues?type[0]=${filters["type[0]"]}&metal=${filters["metal_type[0]"]}&item_type=${filters["item_master_id"]}&gender=${filters["gender"]}&sort_by=${value}`
      );
    }
    if (filterName == "gender" && value) {
      navigate(
        `/product-catalogues?type[0]=${filters["type[0]"]}&metal=${filters["metal_type[0]"]}&item_type=${filters["item_master_id"]}&gender=${value}&sort_by=${filters["sort_by"]}`
      );
    }
    setRefreshCount(refreshCount + 1);
  };

  const clearAll = () => {
    setChipData([]);
    navigate(`/product-catalogues`);
    setRefreshCount(refreshCount + 1);
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
  };

  const handleChipDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    if (chipToDelete == "All") {
      navigate(`/product-catalogues`);
    } else {
      if (chipToDelete == "Category") {
        navigate(
          `/product-catalogues?metal=${filters["metal_type[0]"]}&item_type=${filters["item_master_id"]}&gender=${filters["gender"]}&sort_by=${filters["sort_by"]}`
        );
      } else if (chipToDelete == "Metal Type") {
        navigate(
          `/product-catalogues?type[0]=${filters["type[0]"]}&item_type=${filters["item_master_id"]}&gender=${filters["gender"]}&sort_by=${filters["sort_by"]}`
        );
      } else if (chipToDelete == "Item Type") {
        navigate(
          `/product-catalogues?type[0]=${filters["type[0]"]}&metal=${filters["metal_type[0]"]}&gender=${filters["gender"]}&sort_by=${filters["sort_by"]}`
        );
      } else if (chipToDelete == "Sorted By") {
        navigate(
          `/product-catalogues?type[0]=${filters["type[0]"]}&metal=${filters["metal_type[0]"]}&item_type=${filters["item_master_id"]}&gender=${filters["gender"]}`
        );
      } else if (chipToDelete == "Gender") {
        navigate(
          `/product-catalogues?type[0]=${filters["type[0]"]}&metal=${filters["metal_type[0]"]}&item_type=${filters["item_master_id"]}&sort_by=${filters["sort_by"]}`
        );
      }
    }
    setRefreshCount(refreshCount + 1);
  };

  const setParamsData = async () => {
    const metalId = searchParams.get("metal") ? searchParams.get("metal") : "";
    const itemTypeId = searchParams.get("item_type")
      ? searchParams.get("item_type")
      : "";
    const gender = searchParams.get("gender") ? searchParams.get("gender") : "";
    const sort_by = searchParams.get("sort_by")
      ? searchParams.get("sort_by")
      : "";
    const type = searchParams.get("type[0]") ? searchParams.get("type[0]") : "";
    const page = searchParams?.get("page");

    let temp_chip = [];
    let count = 0;
    if (type) {
      temp_chip = [...temp_chip, "Category"];
      count++;
    }
    if (metalId) {
      temp_chip = [...temp_chip, "Metal Type"];
      count++;
    }
    if (itemTypeId) {
      temp_chip = [...temp_chip, "Item Type"];
      count++;
    }
    if (gender) {
      temp_chip = [...temp_chip, "Gender"];
      count++;
    }
    if (sort_by) {
      temp_chip = [...temp_chip, "Sorted By"];
      count++;
    }
    if (count == 5) {
      temp_chip = ["ALL"];
    }
    setChipData(temp_chip);
    setFilters({
      "type[0]": type,
      "metal_type[0]": metalId,
      item_master_id: itemTypeId,
      sort_by: sort_by,
      gender: gender,
      page: page,
      limit: 12,
    });
    try {
      if (metalId) {
        let result = await getMetalTypeById(metalId);
        setMetal({
          id: metalId,
          name: result.data.data,
        });

        result = await getMetalItems(metalId);
        setItems(result.data.data);
      } else {
        setMetal({
          id: "",
          name: "",
        });
        setItems([]);
      }
      if (itemTypeId) {
        let result = await getItemById(itemTypeId);
        setItemType({
          id: itemTypeId,
          name: result.data.data,
        });
      } else {
        setItemType({
          id: "",
          name: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-catalogues">
      <div className="product-catalogue-banner">
        <img src={banner} alt="Banner image" />
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
          {bullionsFilterValue == -1 && (
            <BottomNavigationAction
              label="Filter"
              onClick={handleOpenFilterMenu}
            />
          )}
          {bullionsFilterValue == -1 && (
            <BottomNavigationAction label="Sort" onClick={handleOpenSortMenu} />
          )}

          {bullionsFilterValue == 0 && (
            <BottomNavigationAction
              label="CLOSE"
              onClick={handleCloseBullionsFilter}
            />
          )}
          {bullionsFilterValue == 0 && (
            <BottomNavigationAction label="APPLY" onClick={handleApplyFilter} />
          )}
          {bullionsFilterValue == 1 && (
            <BottomNavigationAction
              label="CLEAR"
              onClick={handleCloseBullionsFilter}
            />
          )}
          {bullionsFilterValue == 1 && (
            <BottomNavigationAction label="APPLY" onClick={handleApplyFilter} />
          )}
        </BottomNavigation>

        <BullionsFilter
          isOpen={bullionsFilterOpen}
          onClose={handleCloseBullionsFilter}
          style={{ borderLeft: "2px solid" }}
        >
          {openSortMenu ? (
            <SortMenu onClose={handleCloseBullionsFilter} />
          ) : (
            <FilterMenu />
          )}
        </BullionsFilter>
      </Paper>
      <div className="d-none d-md-block">
        <div className="filter-dropdowns d-flex container"></div>
        <hr />
      </div>

      <Box>
        <Grid container spacing={1} className="p-3 product-item-wrapper">
          {products?.map((product, key) => {
            return (
              <Grid
                item
                key={key}
                md={4}
                style={{ cursor: "pointer" }}
                className="product-item-card"
                onClick={() =>
                  navigate("/product-details/" + product.product_id)
                }
              >
                {/* <Card variant="outlined"> */}
                <img
                  src={product.image_path}
                  alt="product image"
                  className="image"
                />
                <div className="text"></div>
                {/* </Card> */}
              </Grid>
            );
          })}
        </Grid>
        <div>
          {products?.length <= 0 ? (
            <div className="no-data"> Products not found</div>
          ) : (
            ""
          )}
        </div>
      </Box>
      {products?.length > 0 ? (
        <Paginator
          currentPage={filters.page}
          totalPage={totalPages}
          handleChangePage={handleChangePage}
        />
      ) : (
        ""
      )}
    </div>
  );
};
