import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
export const MAX_MOBILE_WIDTH: number = 768;
export const MAX_TABLET_WIDTH: number = 1400;
export const HEADER_HEIGHT: number = 62;

import { useResponsive } from 'src/muiEazy';

let cssVarsValue: any = {};

const Container = styled((props: { children: any }) => {
  const isMobile = !useResponsive('up', 'md');
  const [vars, setVars] = React.useState<React.CSSProperties>({} as React.CSSProperties);

  const matchesUpperTablet = useMediaQuery(`(min-width: ${MAX_TABLET_WIDTH + 16}px)`);

  const setContainerAlignItems = (value: string) => {
    cssVarsValue = { ...cssVarsValue, '--container-align-items': value };
  };

  const setDesktopInputHalfWidth = (value: string) => {
    cssVarsValue = { ...cssVarsValue, '--desktop-input-half-width': value };
  };

  const setCardAreaMaxWidth = (value: string) => {
    cssVarsValue = { ...cssVarsValue, '--card-area-max-width': value };
  };

  useEffect(() => {
    isMobile ? setDesktopInputHalfWidth('100%') : setDesktopInputHalfWidth('calc(50% - 24px / 2)');
    setVars(cssVarsValue as React.CSSProperties);
  }, [isMobile]);

  useEffect(() => {
    matchesUpperTablet ? setContainerAlignItems('flex-start') : setContainerAlignItems('center');
    matchesUpperTablet ? setCardAreaMaxWidth('100%') : setCardAreaMaxWidth(MAX_MOBILE_WIDTH + 'px');
    setVars(cssVarsValue as React.CSSProperties);
  }, [matchesUpperTablet]);

  return <Box style={vars} {...props}></Box>;
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'var(--container-align-items)',
  width: '100%',

  '& > .bar': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px 0',
    cursor: 'default',
    userSelect: 'none',
  },

  '& > .input-area': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '24px',
    margin: '16px 8px',
    width: '100%',

    '& > .each': {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',

      ':before': {
        content: '""',
        width: '16px',
      },
    },

    '& > .desktop-half': {
      width: 'var(--desktop-input-half-width)',
    },

    '& > .required': {
      ':before': {
        content: '"*"',
        width: '16px',
        color: theme.palette.error.main,
      },
    },
  },

  '& > .card-area-mobile': {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    margin: '16px 8px',
    padding: '4px',
    width: 'calc(320px + 8px)',
    overflow: 'hidden',

    '& > .wrapper': {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'no-wrap',
      gap: '36px',
      transition: '0.5s',

      '& > .each': {
        width: '320px', // 默认最大值：calc(25% - 8px)
      },
    },

    '& > .left-button': {
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
    },

    '& > .right-button': {
      position: 'absolute',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },

  '& > .card-area-desktop': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px 8px',
    padding: '4px',
    width: '100%',

    '& > .wrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px',
      width: '100%',
      maxWidth: 'var(--card-area-max-width)',

      '& > .each': {},
    },
  },
}));

export default Container;
