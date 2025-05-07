import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function BasicMenu({
  menuTitle,
  children = [],
  isLoading = false
}) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open =
    Boolean(anchorEl) && (isLoading || (children && children.length > 0));

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToCollection = () => {
    navigate('/collection');
  };

  return (
    <div>
      <Box
        role="button"
        id="basic-button"
        onMouseEnter={isMobile ? undefined : handleOpen}
        onClick={isMobile ? handleOpen : navigateToCollection}
        sx={{ cursor: 'pointer', zIndex: '3 !important', position: 'relative' }}
      >
        {menuTitle}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        sx={{
          marginTop: '0.6rem',
          marginLeft: '-0.6rem',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer'
        }}
        slotProps={{
          paper: {
            sx: {
              zIndex: -1,
              textDecoration: 'none',
              color: 'inherit',
              width: { lg: '18%', md: '17%', sm: '25%', xs: '50%' },
              maxHeight: '13.4rem',
              overflowY: 'auto',
              borderRadius: 0,
              border: '1px solid rgba(112, 112, 112, 0.25)',
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
              scrollbarWidth: 'thin',
              scrollbarColor: '#672B30 #f1f1f1',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: '#f5f5f5'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c4c4c4',
                borderRadius: '4px',
                border: '2px solid #f5f5f5'
              }
            }
          }
        }}
        MenuListProps={{
          autoFocusItem: false,
          'aria-labelledby': 'basic-button'
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem',
              width: '100%',
              gap: '0.3rem'
            }}
          >
            <span style={{ fontWeight: '600', fontSize: '1rem' }}>
              Loading...
            </span>
            <CircularProgress size={24} color="primary" />
          </Box>
        ) : children && children.length > 0 ? (
          children.map((item, index) => (
            <Link
              to={item.url}
              key={index}
              style={{
                textDecoration: 'none',
                color: '#672a2f',
                width: '100%',
                display: 'block',
                textTransform: 'uppercase'
              }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  borderRadius: 0,
                  '&:hover, &.Mui-focusVisible': {
                    textDecoration: 'underline'
                  },
                  '& a:focus-visible': {
                    outline: 'none'
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title={item?.collectionName}
                >
                  {item?.collectionName}
                </Box>
              </MenuItem>
            </Link>
          ))
        ) : (
          <MenuItem disabled sx={{ borderRadius: 0 }}>
            No collections found
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
