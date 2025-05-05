import { Box, Fade, Stack } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import React, { useEffect, useState } from 'react';

const tabs = ['general details', 'metal details', 'product description'];

const ProductDetailsTabs = ({ productDetails }) => {
  const [active, setActive] = useState('general details');
  const [content, setContent] = useState(null);

  const handleActiveTab = (tab) => setActive(tab);

  const renderContent = () => {
    if (active === 'metal details') {
      return (
        <>
          <Box>
            <span className="fw-bolder">Gross weight</span>:{' '}
            {productDetails?.gross_wt}g
          </Box>
          <Box>
            <span className="fw-bolder">Net weight</span>:{' '}
            {productDetails?.net_wt}g
          </Box>
          <Box>
            <span className="fw-bolder">Purity</span>: {productDetails?.purity}K
          </Box>
        </>
      );
    }

    if (active === 'product description') {
      return <>{productDetails?.description || '--'}</>;
    }

    return (
      <>
        <Box>
          <span className="fw-bolder">Product Name</span>:{' '}
          {productDetails?.product_name || '--'}
        </Box>
        <Box>
          <span className="fw-bolder">Product Code</span>:{' '}
          {productDetails?.product_code || '--'}
        </Box>
        <Box>
          <span className="fw-bolder">Gender</span>:{' '}
          {productDetails?.gender || '--'}
        </Box>
      </>
    );
  };

  useEffect(() => {
    setContent(renderContent());
  }, [active, JSON.stringify(productDetails)]);

  return (
    <Stack sx={{ p: '0 !important' }} width="94%">
      <Stack
        direction="row"
        width="100%"
        sx={{
          border: '1px solid #000 !important',
          p: '0 !important',
          overflow: 'hidden'
        }}
      >
        {/* Sidebar Tabs */}

        <Stack
          width="40%"
          sx={{
            p: '0 !important',
            borderRight: '1px solid #000 !important',
            overflow: 'hidden'
          }}
        >
          {tabs.map((tab) => (
            <Box
              key={tab}
              role="button"
              onClick={() => handleActiveTab(tab)}
              sx={{
                backgroundColor: active === tab ? '#672A2F' : 'transparent',
                color: active === tab ? '#fff !important' : '#000 !important',
                p: '0.67rem !important',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'capitalize',
                fontSize: '0.8rem',
                borderRadius: 'none',
                borderBottom: '1px solid #672A2F',
                '&:last-child': {
                  borderBottom: 'none'
                }
              }}
            >
              <span>{tab}</span>
              {active === tab && <ForwardIcon />}
            </Box>
          ))}
        </Stack>
        <Fade in={true} timeout={500} key={active}>
          <Stack
            gap={1}
            width="60%"
            className="text-wrap"
            sx={{
              height: { xs: '9rem', md: '9rem' },
              overflow: 'auto',
              p: '0.7rem',
              fontSize: '0.8rem'
            }}
          >
            {content}
          </Stack>
        </Fade>
      </Stack>
    </Stack>
  );
};

export default ProductDetailsTabs;
