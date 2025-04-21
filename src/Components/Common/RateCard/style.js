import { Box, Stack, styled } from '@mui/material';

export const StyledRateTableWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '-100px',
  zIndex: 3,
  backgroundColor: '#672B30 !important',
  border: '1px solid',
  width: '25rem',
  color: 'white !important',
  fontWeight: 'bold !important',

  padding: '0.8rem',
  '& table': {
    backgroundColor: '#672B30 !important',
    color: 'white !important'
  },

  '& table tbody': {
    backgroundColor: '#672B30 !important',
    color: 'white !important'
  },

  '& table td': {
    backgroundColor: '#672B30 !important',
    color: 'white !important',
    textTransform:'none !important',
  },
  [theme.breakpoints.down(768)]: {
    left: '-270px',
    width: '20rem',
    padding: '0.6rem'
  },
  [theme.breakpoints.down(400)]: {
    left: '-270px',
    padding: '0.6rem'
  }
}));

export const StyledRateBox = styled(Box)(() => ({
  cursor: 'pointer',
  position: 'relative',
  width: '100%',
  zIndex: 999
}));

export const StyledBorderBox = styled(Box)(() => ({
  padding: '0.3rem',
  background: 'linear-gradient(#C3942F, #FDE98C, #C3942F)',
  display: 'inline-block',
  width: '100%'
}));
export const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: '#672B30',
  color: 'white',
  padding: '0.5rem',
  gap: '0.5rem',
  fontSize: '1rem',
  [theme.breakpoints.down(768)]: {
    fontSize: '0.8rem'
  }
}));

export const StyledAnimatedBox = styled(Box)(({ show }) => ({
  opacity: show ? 1 : 0,
  transform: show ? 'translateY(0)' : 'translateY(-10px)',
  visibility: show ? 'visible' : 'hidden',
  transition: 'all 0.5s ease-in-out'
}));
export const RateCardDateWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.3rem'
}));

export const RateCardText = styled('p')(({ theme }) => ({
  [theme.breakpoints.down(768)]: {
    display: 'none'
  }
}));

export const StyledTable = styled(Box)(({ theme }) => ({
  maxHeight: '13.4rem',
  overflowY: 'auto',

  borderRadius: '6.85px',
  border: '1px solid #fff',

  scrollbarWidth: 'thin',
  scrollbarColor: '#672B30 #f1f1f1',
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#672B30',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1'
  }
}));
