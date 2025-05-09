import React, { useState, useRef } from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function BasicMenu({
  menuTitle,
  children = [],
  isLoading = false
}) {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(timerRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timerRef.current = setTimeout(() => setIsOpen(false), 200);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    } else {
      navigate('/collection');
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          fontWeight: 600
        }}
        role="button"
      >
        {menuTitle}
      </Box>

      {isOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            mt: '0.2rem',
            backgroundColor: '#fff',
            border: '1px solid rgba(112,112,112,0.25)',
            boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
            width: { lg: '18vw', md: '25dvw', sm: '30vw', xs: '50dvw' },
            textAlign: 'left',
            zIndex: 10,
            maxHeight: '13.4rem',
            overflowY: 'auto',
            borderRadius: 0,
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { width: '8px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c4c4c4',
              borderRadius: '4px'
            }
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <CircularProgress size={20} />
              <span style={{ fontWeight: 600 }}>Loading...</span>
            </Box>
          ) : children.length > 0 ? (
            children.map((item, index) => (
              <Box
                key={index}
                component={Link}
                to={item.url}
                onClick={handleItemClick}
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title={item?.collectionName}
                className='text-truncate'
                sx={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  textDecoration: 'none',
                  color: '#672a2f',
                  textTransform: 'uppercase',
                  maxWidth: '100%',
                  '&:hover': {
                    backgroundColor: '#f7f7f7',
                    textDecoration: 'underline !important'
                  }
                }}
              >
                {item.collectionName}
              </Box>
            ))
          ) : (
            <Box sx={{ padding: '0.75rem 1rem', color: '#999' }}>
              No collections found
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
