import { styled } from '@mui/material';

export const StyledDataTableRow = styled('tr')(({ theme }) => ({
  fontSize: '1rem',
  [theme.breakpoints.down(768)]: {
    fontSize: '0.8rem'
  }
}));
export const StyledDataTableColumn = styled('td')(({ theme }) => ({
  fontSize: '1rem',
  [theme.breakpoints.down(768)]: {
    fontSize: '0.8rem'
  },
  maxWidth: '5rem'
}));
