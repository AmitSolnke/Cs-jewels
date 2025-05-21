import React, { useEffect, useState } from 'react';
import { Box, Container, Skeleton, Stack, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  getMetals,
  getMetalItems,
  getProductCategory,
  getProducts,
  getMetalTypeById,
  getItemById
} from '../../../services/FrontApp/index.service';
import { Paginator } from '../../Common/Paginator';
import ProductList from '../../Common/ProductList';
import FilterSection from './Filter-Section';
import ContainerWrapper from '../../Common/ContainerWrapper';

export const ProductCatalogues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bullionsFilterOpen, setBullionsFilterOpen] = useState(false);
  const [bullionsFilterValue, setBullionsFilterValue] = useState(-1);
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const [banner, setBanner] = useState('');
  const [searchParams] = useSearchParams();
  const [metal, setMetal] = useState({
    id: '',
    name: ''
  });
  const [itemType, setItemType] = useState({
    id: '',
    name: ''
  });
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [metals, setMetals] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [chipData, setChipData] = useState([]);

  const sizes = ['5', '10', '15', '20', '25'];

  const [filters, setFilters] = useState({
    'type[0]': '',
    'metal_type[0]': '',
    item_master_id: '',
    sort_by: '',
    size: '',
    gender: '',
    page: 1,
    limit: 12
  });
  const [filteredPayload, setFilteredPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBannerLoading, setIsBannerLoading] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const handleChangePage = (event, newPage) => {
    const pageNumber = Number(newPage);

    if (
      !filteredPayload?.metal &&
      !filteredPayload?.genders &&
      !filteredPayload?.min_price &&
      !filteredPayload?.max_price &&
      !filteredPayload?.purity &&
      !filteredPayload?.selectedCollections &&
      !filteredPayload?.sort_by
    ) {
      setPage(pageNumber);
      setFilters((prevFilters) => {
        const updatedFilters = {
          ...prevFilters,
          page: pageNumber
        };
        navigate(
          `/product-catalogues?page=${pageNumber}&type[0]=${updatedFilters['type[0]']}&metal=${updatedFilters['metal_type[0]']}&item_type=${updatedFilters['item_master_id']}`
        );

        return updatedFilters;
      });
    } else {
      filterHandler({ ...filteredPayload, page: pageNumber });
    }
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
    setLoading(true);
    try {
      const requestParams = new FormData();
      const metalId = searchParams.get('metal')
        ? searchParams.get('metal')
        : '';
      const itemTypeId = searchParams.get('item_type')
        ? searchParams.get('item_type')
        : '';
      const sort_by = searchParams.get('sort_by')
        ? searchParams.get('sort_by')
        : '';
      const type = searchParams.get('type[0]')
        ? searchParams.get('type[0]')
        : '';
      const page = searchParams.get('page') ? searchParams.get('page') : '';
      if (type) {
        requestParams.append('type[0]', type);
      }
      if (metalId) {
        requestParams.append('metal_type[0]', metalId);
      }
      if (sort_by) {
        requestParams.append('sort_by', sort_by);
      }
      if (itemTypeId) {
        requestParams.append('item_master_id', itemTypeId);
      }
      if (filters['size']) {
        requestParams.append('size', filters['size']);
      }

      if (filters.limit) {
        requestParams.append('limit', filters['limit']);
      }

      requestParams.append('page', page || 1);

      const { data } = await getProducts(requestParams);

      // if (data.data.data) {
      setProducts(data?.data?.data);
      // let bannerImg = data?.product_list_banner?.[0]?.image_path?.replace(
      //   "//",
      //   "/"
      // );
      // bannerImg = bannerImg?.replace("http:/", "http://");
      // let bannerImg = data?.product_list_banner?.[0]?.image_path
      setBanner(data?.product_list_banner[0]?.image_path);
      // } else {
      //   setProducts([]);
      // }
      setLoading(false);
      setTotalPages(data.data.last_page);
      setProductCount(data.data.total);
      setFilteredPayload(null);
      // setLoading(false)
    } catch (error) {
      console.log(error);
      // setLoading(false)
      setProducts([]);
      setTotalPages(0);
      setProductCount(0);
    } finally {
      setLoading(false);
      setIsBannerLoading(false);
      window.scrollTo({
        left: 0,
        top: isDesktop ? 500 : 0,
        behavior: 'smooth'
      });
    }
  };
  useEffect(() => {
    setParamsData();
    getData();
    setIsBannerLoading(true);
  }, [location.search]);

  const setParamsData = async () => {
    const metalId = searchParams.get('metal') ? searchParams.get('metal') : '';
    const itemTypeId = searchParams.get('item_type')
      ? searchParams.get('item_type')
      : '';
    const gender = searchParams.get('gender') ? searchParams.get('gender') : '';
    const sort_by = searchParams.get('sort_by')
      ? searchParams.get('sort_by')
      : '';
    const type = searchParams.get('type[0]') ? searchParams.get('type[0]') : '';
    const page = searchParams?.get('page');

    let temp_chip = [];
    let count = 0;
    if (type) {
      temp_chip = [...temp_chip, 'Category'];
      count++;
    }
    if (metalId) {
      temp_chip = [...temp_chip, 'Metal Type'];
      count++;
    }
    if (itemTypeId) {
      temp_chip = [...temp_chip, 'Item Type'];
      count++;
    }
    if (gender) {
      temp_chip = [...temp_chip, 'Gender'];
      count++;
    }
    if (sort_by) {
      temp_chip = [...temp_chip, 'Sorted By'];
      count++;
    }
    if (count == 5) {
      temp_chip = ['ALL'];
    }
    setChipData(temp_chip);
    setFilters({
      'type[0]': type,
      'metal_type[0]': metalId,
      item_master_id: itemTypeId,
      sort_by: sort_by,
      gender: gender,
      page: Number(page),
      limit: 12
    });
    setPage(Number(page));
    try {
      if (metalId) {
        let result = await getMetalTypeById(metalId);
        setMetal({
          id: metalId,
          name: result.data.data
        });

        result = await getMetalItems(metalId);
        setItems(result.data.data);
      } else {
        setMetal({
          id: '',
          name: ''
        });
        setItems([]);
      }
      if (itemTypeId) {
        let result = await getItemById(itemTypeId);
        setItemType({
          id: itemTypeId,
          name: result.data.data
        });
      } else {
        setItemType({
          id: '',
          name: ''
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFileredData = async (payload) => {
    try {
      setLoading(true);
      const requestParams = new FormData();
      const metalId = payload?.metal || '';
      const genders = payload?.genders || '';
      const sort_by = payload?.sort_by || '';
      const min_price = payload?.min_price ?? '';
      const max_price = payload?.max_price || '';
      const purity = payload?.purity || '';
      const selectedCollections = payload?.selectedCollections || '';
      const itemTypeId = payload?.item_type || '';
      const page = Number(payload?.page) || 1;
      if (metalId) {
        metalId?.forEach((item, ind) => {
          requestParams?.append(`metal_type[${ind}]`, item);
        });
      }
      if (itemTypeId) {
        requestParams.append('item_master_id', itemTypeId);
      }
      if (sort_by) {
        requestParams.append('sort_by', sort_by);
      }
      if (genders) {
         genders?.forEach((item, ind) => {
          requestParams?.append(`gender[${ind}]`, item);
        });
      }
      if (min_price || min_price === 0) {
        requestParams.append('min_price', min_price);
      }
      if (page) {
        requestParams.append('page', page);
      }
      if (max_price) {
        requestParams.append('max_price', max_price);
      }
      if (purity) {
        purity?.forEach((item, ind) => {
          requestParams?.append(`purity[${ind}]`, item);
        });
      }
      if (selectedCollections) {
        selectedCollections?.forEach((item, ind) => {
          requestParams?.append(`collection_master_id[${ind}]`, item);
        });
      }
      if (payload?.page) {
        setPage(payload?.page);
      }

      const { data } = await getProducts(requestParams);

      setProducts(data?.data?.data);
      setBanner(data?.product_list_banner[0]?.image_path);
      setLoading(false);
      setTotalPages(data.data.last_page);
      setProductCount(data.data.total);
    } catch (error) {
      console.log(error);
      setProducts([]);
      setTotalPages(0);
      setProductCount(0);
      setFilteredPayload(null);
    } finally {
      setLoading(false);
      setIsBannerLoading(false);
      window.scrollTo({
        left: 0,
        top: isDesktop ? 500 : 0,
        behavior: 'smooth'
      });
    }
  };

  const filterHandler = (payload) => {
    if (
      !payload ||
      (!payload?.genders &&
        !payload?.min_price &&
        !payload?.max_price &&
        !payload?.purity &&
        !payload?.selectedCollections &&
        !payload?.sort_by)
    ) {
        getData();
      setFilteredPayload(null);
      return;
    }
    payload.metal = [];
    payload.metal.push(searchParams.get('metal'));
    payload.item_type = searchParams?.get('item_type');
    getFileredData(payload);
    setFilteredPayload(payload);
  };

  return (
    <div className="product-catalogues">
      <div className="product-catalogue-banner">
        {isBannerLoading ? (
          <Skeleton variant="rectangular" width={'100%'} height={'100vh'} />
        ) : (
          <img src={banner} alt="Banner image" loading="lazy" />
        )}
      </div>
      <ContainerWrapper>
        <FilterSection
          filterHandler={filterHandler}
          filteredPayload={filteredPayload}
          isLoading={loading}
        />
      </ContainerWrapper>

      <Box>
        <ProductList products={products} isLoading={loading} />
      </Box>
      {products?.length > 0 && !loading ? (
        <Paginator
          currentPage={page}
          totalPage={totalPages}
          handleChangePage={handleChangePage}
        />
      ) : (
        ''
      )}
    </div>
  );
};
