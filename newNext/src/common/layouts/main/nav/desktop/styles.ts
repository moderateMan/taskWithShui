import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import { NavItemProps } from '../types';

// ----------------------------------------------------------------------

type StyledNavItemProps = Omit<NavItemProps, 'item'>;

export const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open' && prop !== 'subItem',
})<StyledNavItemProps>(({ active, open, subItem, theme }) => {
  const underlineStyle = {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 2,
    left: 0,
    bottom: -2,
    backgroundColor: 'black',
  };
  const underlineActiveStyle = {
    ...underlineStyle,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
  };
  const underlineAnimationStyle = {
    transition: 'width 0.3s ease',
    width: '100%',
  };

  return {
    ...theme.typography.body2,
    color: 'black',
    fontWeight: '600',
    padding: 0,
    height: '100%',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
    '&::before': underlineStyle,
    '&:hover': {
      opacity: 0.8,
      backgroundColor: 'transparent',
      '&::before': underlineAnimationStyle,
    },
    // Sub item
    ...(subItem && {
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
    }),
    // Active
    ...(active && {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightBold,
      '&::before': underlineActiveStyle,
    }),
    // Active sub item
    ...(active &&
      subItem && {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightSemiBold,
        '&::before': {
          ...underlineActiveStyle,
          color: theme.palette.primary.main,
        },
      }),
    // Open
    ...(open && {
      opacity: 0.48,
      '&::before': underlineActiveStyle,
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledMenu = styled(Paper)(({ theme }) => ({
  top: 62,
  width: '100%',
  borderRadius: 0,
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  boxShadow: theme.customShadows.dialog,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.h6,
  padding: 0,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
}));
