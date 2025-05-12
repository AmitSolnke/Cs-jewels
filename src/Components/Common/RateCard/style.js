import { Box, Stack, styled } from '@mui/material';
import RateCardImage from '../../../images/rateCard.png';
export const StyledRateTableWrapper = styled(Stack)(({ theme }) => ({
  height: '17rem',
  overflowY: 'auto',
  position: 'absolute',
  top: '-0.8rem',
  left: '-80px',
  zIndex: 3,
  backgroundColor: '#672B30',
  border: '1px solid',
  width: '24rem',
  color: 'white',
  fontWeight: 'bold',
  padding: '0.8rem',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  backgroundImage: `url(${RateCardImage})`,
  padding: '2.8rem 0.8rem',

  [theme.breakpoints.down(768)]: {
   left: '-280px',
   top: '0.4rem',
   width: '20rem',
   height: '14rem'
  }
}));

export const StyledRateTableWrapper1 = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '-0.8rem',
  left: '-60px',
  zIndex: 3,
  backgroundColor: '#672B30',
  border: '1px solid',
  width: '27rem',
  color: 'white',
  fontWeight: 'bold',
  padding: '0.8rem',

  // [theme.breakpoints.down(768)]: {
  // top: '0.7rem',
  //left: '-270px',
  //width: '19rem',
  //padding: '0.6rem'
  //},

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${RateCardImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: 2
  }
}));

export const StyledRateBox = styled(Box)(() => ({
  cursor: 'pointer',
  position: 'relative',
  width: '100%',
  zIndex: 3
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
