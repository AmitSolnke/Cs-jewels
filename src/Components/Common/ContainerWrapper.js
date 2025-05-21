import { Container } from '@mui/material';
import React from 'react';

const ContainerWrapper = ({ children, sx = {} }) => {
  return (
    <Container maxWidth="lg" sx={sx}>
      {children}
    </Container>
  );
};

export default ContainerWrapper;
