import React, { useState } from 'react';
import DiamondIcon from '@mui/icons-material/Diamond';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, IconButton } from '@mui/material';
function FestiveAd() {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div
          className="position-relative festive-text d-flex justify-content-center align-items-center"
        >
          <DiamondIcon sx={{color:'#672A2F'}} />
          <Box className="text-success h-100 text-center px-2" sx={{ maxWidth: 'md' }}>
            <p className="festive-banner">Akshay Tritiya offer - Upto 20% Off*</p>
            <p className="festive-offer">Grab the Offer Today...!!</p>
          </Box>
          <DiamondIcon sx={{color:'#672A2F'}}  />
          <IconButton sx={{ '&:hover': { background: 'none !important', color: '#672A2F !important', }, '&.MuiButtonBase-root' : {position:"absolute"} }} className='close-button' onClick={handleClose}>
            <CancelIcon sx={{ '&:hover': { background: 'none !important', color: 'none !important' } }} size='large' />
          </IconButton>
        </div>
      )}
    </>
  );
}

export default FestiveAd;
