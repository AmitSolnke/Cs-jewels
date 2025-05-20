import { Button, styled } from '@mui/material';


export const GDPButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: '51%',
    right: '21%',
    height: '2rem',
    width: '7.5rem',
    fontSize: '0.6rem',
    background: '#76242c',
    zIndex: 99,

  [theme.breakpoints.up('sm')]: {
    right: '22%',
    height: '3rem',
    width: '10.5rem',
    fontSize: '0.9rem'
  },
  [theme.breakpoints.up('md')]: {
    width: '15rem',
  },
  [theme.breakpoints.down(450)]: {
    right: '20%',
    width: 'auto',
    height: 'auto',
  }
}));