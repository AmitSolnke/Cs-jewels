import { Grid, Skeleton, Box, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerWrapper from '../../Common/ContainerWrapper';
import NoProductsFound from '../../Common/NotFound';

const CollectionList = ({ collections, isLoading = false }) => {
  const navigate = useNavigate();
  const skeletonArray = Array.from({ length: 12 });

  return (
    <ContainerWrapper>
      <Grid
        container
        rowGap={3}
        columnGap={{ xs: 1.3, sm: 1.1, lg: 1.2 }}
        className="p-3"
        sx={{
          padding: '0px !important',
          marginInline: 'auto',
          width: '100%'
        }}
      >
        {isLoading ? (
          skeletonArray.map((_, index) => (
            <Grid
              item
              key={index}
              lg={3.93}
              md={3.9}
              sm={5.9}
              xs={5.8}
              className="product-item-card border-0"
              sx={{
                borderRadius: '8px',
                paddingTop: 0,
                paddingLeft: 0
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '1640 / 1049',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 0 }}
                />
              </Box>
            </Grid>
          ))
        ) : collections?.length > 0 ? (
          collections.map((collection, key) => (
            <Grid
              item
              key={key}
              lg={3.93}
              md={3.9}
              sm={5.9}
              xs={5.8}
              onClick={() => {
                navigate(`/collection?collectionId=${collection.id}&page=1`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="product-item-card"
              sx={{
                cursor: 'pointer',
                border: '1px solid #847f7f',
                borderRadius: '8px',
                overflow: 'hidden',
                paddingTop: '0 !important',
                paddingLeft: '0 !important'
              }}
            >
              <img
                src={collection.image_path1}
                alt={collection.collection_name || 'Collection Image'}
                style={{ width: '100%', height: '100%', borderRadius: '8px' }}
              />

              <div className="text">{collection.name}</div>
            </Grid>
          ))
        ) : (
          <NoProductsFound />
        )}
      </Grid>
    </ContainerWrapper>
  );
};

export default CollectionList;
