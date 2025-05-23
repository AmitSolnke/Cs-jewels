import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../../hooks';
import { DropdownWrapper } from '../style';
import { useEffect, useState } from 'react';

export const NavigationDropdown = ({ navigationData, tabName = '',mainTabNaivagtion = false }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const closeModal = (url) => {
    if (url) {
      navigate(url);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showDropdown]);

  useScrollToTop();

  const handleClick = () => {
    if (isMobile) {
      setShowDropdown((prev) => !prev);
    } else {
      if (mainTabNaivagtion) {
        navigate(tabName.toLowerCase());
      }
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowDropdown(false);
    }
  };
  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      style={{
        marginTop: isMobile ? '0rem' : '-0.2rem'
      }}
    >
      <DropdownWrapper showDropdown={showDropdown}>
        <Grid container spacing={4} className="custom-scrollbar">
          {navigationData?.map(({ title, url = '', children = [] }, index) => (
            <Grid
              item
              key={index}
              xs={12}
              md={3}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Typography
                className="jewellwery-type"
                sx={{
                  cursor: url && 'pointer'
                }}
                onClick={() => closeModal(url)}
              >
                {title}
              </Typography>

              {children?.length > 0 && (
                <div className="jewelleries">
                  {children?.map((item, key) => (
                    <div
                      key={key}
                      onClick={() => closeModal(item?.url)}
                      className="jewellery-link"
                    >
                      {item.subtitle}
                    </div>
                  ))}
                </div>
              )}
            </Grid>
          ))}
        </Grid>
      </DropdownWrapper>
      <li>{tabName}</li>
    </Box>
  );
};
