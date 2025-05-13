import { Grid, Skeleton, Box, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerWrapper from './ContainerWrapper';
import NoProductsFound from './NotFound';

const ProductList = ({ products, isLoading = false }) => {
  const navigate = useNavigate();

  const skeletonArray = Array.from({ length: 12 });

  return (
    <ContainerWrapper>
      <Grid
        container
        rowGap={3}
        columnGap={{xs:1.3,sm:1.1,lg:1.2}}
        className="p-3"
        sx={{
          padding: '0px !important',
          marginInline: 'auto',
          width: '100%',
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
        ) : products?.length > 0 ? (
          products.map((product, key) => (
            <Grid
              item
              key={key}
              lg={3.93}
              md={3.9}
              sm={5.9}
              xs={5.8}
              style={{
                cursor: 'pointer',
                border: '1px solid #847f7f',
                borderRadius: '15px',
                overflow: 'hidden',
                borderRadius: '8px',
                paddingTop: 0,
                paddingLeft: 0
              }}
              className="product-item-card"
              onClick={() => navigate('/product-details/' + product.product_id)}
            >
              <img
                src={product.image_path}
                alt={product.product_name || 'product Image'}
                className="image"
                style={{ width: '100%', borderRadius: '8px' }}
                loading="lazy"
              />
              <div className="text">{product.name}</div>
            </Grid>
          ))
        ) : (
        <NoProductsFound/>
        )}
      </Grid>
    </ContainerWrapper>
  );
};

export default ProductList;
