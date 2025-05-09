import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductList from '../../Common/ProductList';
import { getCollectionDetails } from '../../../services/FrontApp/index.service';
import { useNavigate } from 'react-router-dom';
import CollectionList from './CollectionList';

const CollectionCataloguePage = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [banner, setBanner] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getCollectionDetails();
      setCollections(data?.data);
      let banner;
      if (!isMobile) {
        banner = data?.banner_image.find(
          (item) => item.image_for?.toUpperCase() === 'COLLECTION_FOR_DESKTOP'
        );
      } else {
        banner = data?.banner_image.find(
          (item) => item.image_for?.toUpperCase() === 'COLLECTION_FOR_MOBILE'
        );
      }

      setBanner(banner?.image_path);
    } catch (error) {
      setCollections([]);
      setBanner('');
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
      <Box marginY={'3rem'}>
        <CollectionList collections={collections} isLoading={isLoading} />
      </Box>
    </Stack>
  );
};

export default CollectionCataloguePage;
