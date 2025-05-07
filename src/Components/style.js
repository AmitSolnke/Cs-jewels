import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const DropdownWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showDropdown',
})(({ theme, showDropdown }) => ({
  opacity: showDropdown ? 1 : 0,
  transform: showDropdown ? 'translateY(0)' : 'translateY(-10px)',
  transition: showDropdown
    ? 'opacity 0.4s ease-in, transform 0.4s ease-in'
    : 'none',
  pointerEvents: showDropdown ? 'auto' : 'none',
  visibility: showDropdown ? 'visible' : 'hidden',
  position: 'absolute',
  top: '78%',
  backgroundColor: theme.palette.background.paper,
  borderTop: `0.5px solid ${theme.palette.divider}`,
  zIndex: 999999999999999,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  width: '100dvw',

  [theme.breakpoints.up('md')]: {
    width: '100dvw',
  },
  [theme.breakpoints.up('lg')]: {
    width: '99.9dvw',
  },
  [theme.breakpoints.up('sm')]: {
    top: '78%',
  },
  [theme.breakpoints.up('sm')]: {
    left: '-3.3%',
  },
  [theme.breakpoints.up('md')]: {
    left: '-3%',
  },
  [theme.breakpoints.up('lg')]: {
    left: '-4%',
    width:'99dvw'
  },
  [theme.breakpoints.up(1260)]: {
    left: '-7%',
  },
}));
