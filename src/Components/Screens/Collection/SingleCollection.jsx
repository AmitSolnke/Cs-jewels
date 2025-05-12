import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductList from '../../Common/ProductList';
import { getProducts } from '../../../services/FrontApp/index.service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Paginator } from '../../Common/Paginator';

const SingleCollection = ({ collectionMasterId, page = 1 }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [banner, setBanner] = useState('');

  const getData = async () => {
    try {
      const requestParams = new FormData();

      if (collectionMasterId) {
        requestParams.append('collection_master_id', collectionMasterId);
      }

      requestParams.append('page', Number(page) || 1);
      requestParams.append('limit', 12);
      setIsLoading(true);
      const { data } = await getProducts(requestParams);

      setTotalPages(data?.data?.last_page);
      setProducts(data?.data?.data);
      setBanner(
        (!isMobile
          ? data?.collection_list_banner[0]?.image_path
          : data?.collection_list_banner[0]?.mobile_image_path) ||
          data?.collection_list_banner?.[0]?.image_path ||
          data?.collection_list_banner?.[0]?.mobile_image_path
      );
    } catch (error) {
      setProducts([]);
      setBanner('');
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangePage = (event, newPage) => {
    const pageNumber = Number(newPage) || 1;

    navigate(
      `/collection?collectionId=${collectionMasterId}&page=${pageNumber}`
    );
  };

  useEffect(() => {
    getData();
  }, [collectionMasterId, page]);
  return (
    <Stack gap={2} className="product-catalogues" sx={{ my: '1rem' }}>
      <div className="product-catalogue-banner">
        {isLoading ? (
          <Skeleton variant="rectangular" width={'100%'} height={'100vh'} />
        ) : (
          <img src={banner} alt="Banner image" />
        )}
      </div>
      <Box marginY={'3rem'}>
        <ProductList products={products} isLoading={isLoading} />
      </Box>
      {products?.length > 0 && !isLoading ? (
        <Paginator
          currentPage={page}
          totalPage={totalPages}
          handleChangePage={handleChangePage}
        />
      ) : (
        ''
      )}
    </Stack>
  );
};

export default SingleCollection;
