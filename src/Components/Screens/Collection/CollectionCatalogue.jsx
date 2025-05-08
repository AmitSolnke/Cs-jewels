import { Box, Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductList from '../../Common/ProductList';
import { getCollectionDetails } from '../../../services/FrontApp/index.service';
import { useNavigate } from 'react-router-dom';
import CollectionList from './CollectionList';

const CollectionCataloguePage = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [banner, setBanner] = useState('');

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getCollectionDetails();
      setCollections(data?.data?.data);
    } catch (error) {
      setCollections([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Stack gap={2} className="product-catalogues" sx={{ marginY: '2rem' }}>
      <div className="product-catalogue-banner">
        {isLoading ? (
          <Skeleton variant="rectangular" width={'100%'} height={'100vh'} />
        ) : (
          <img src={banner} alt="Banner image" />
        )}
      </div>
      <Box>
        <CollectionList collections={collections} isLoading={isLoading} />
      </Box>
    </Stack>
  );
};

export default CollectionCataloguePage;
