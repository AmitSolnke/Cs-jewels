import { Box, styled } from '@mui/material';

export const DropdownWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showDropdown'
})(({ theme, showDropdown }) => ({
  opacity: showDropdown ? 1 : 0,
  transform: showDropdown ? 'translateY(0)' : 'translateY(-10px)',
  transition: 'opacity 0.4s ease, transform 0.4s ease',
  pointerEvents: showDropdown ? 'auto' : 'none',
  visibility: showDropdown ? 'visible' : 'hidden',
  position: 'fixed',
  top: '137px',
  left: 0,
  width: '100vw',
  height: 'calc(100vh - 23%)',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderTop: `0.5px solid ${theme.palette.divider}`,
  zIndex: 9999999999,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  [theme.breakpoints.up(1024)]: {
    height: 'auto'
  }
}));
