import { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import Portal from '@mui/material/Portal';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'src/common/components/image';
import Label from 'src/commonOld/components/label';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';
import { NavItemBaseProps, NavListProps } from '../types';
import { secondaryFont } from 'src/theme/typography';
import { NavItem } from './nav-item';
import { StyledMenu, StyledSubheader } from './styles';

// ----------------------------------------------------------------------

export default function NavList({ item }: { item: NavItemBaseProps }) {
  const pathname = usePathname();

  const menuOpen = useBoolean();

  const active = useActiveLink(item.path, false);

  const externalLink = item.path.includes('http');

  const mainList = item.children ? item.children.filter((list) => list.subheader !== 'Common') : [];

  const commonList = item.children
    ? item.children.find((list) => list.subheader === 'Common')
    : null;

  useEffect(() => {
    if (menuOpen.value) {
      menuOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (item.children) {
      menuOpen.onTrue();
    }
  }, [item.children, menuOpen]);

  return (
    <>
      <NavItem
        item={item}
        active={active}
        open={menuOpen.value}
        externalLink={externalLink}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={menuOpen.onFalse}
      />

      {!!item.children && menuOpen.value && (
        <Portal>
          <Fade in={menuOpen.value}>
            <StyledMenu onMouseEnter={handleOpenMenu} onMouseLeave={menuOpen.onFalse}>
              <Grid container columns={15}>
                <Grid xs={12}>
                  <Box
                    fontFamily={secondaryFont.style.fontFamily}
                    gap={5}
                    display="grid"
                    gridTemplateColumns="repeat(5, 1fr)"
                    sx={{
                      p: 5,
                      height: 1,
                      position: 'relative',
                      bgcolor: 'background.neutral',
                    }}
                  >
                    {mainList.map((list) => (
                      <NavSubList
                        key={list.subheader}
                        subheader={list.subheader}
                        cover={list.cover}
                        items={list.items}
                        isNew={list.isNew}
                      />
                    ))}
                  </Box>
                </Grid>

                {commonList && (
                  <Grid xs={3}>
                    <Box sx={{ bgcolor: 'background.default', p: 5 }}>
                      <NavSubList subheader={commonList.subheader} items={commonList.items} />
                    </Box>
                  </Grid>
                )}
              </Grid>
            </StyledMenu>
          </Fade>
        </Portal>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ subheader, isNew, cover, items }: NavListProps) {
  const pathname = usePathname();

  const coverPath = items.length ? items[0].path : '';

  const commonList = subheader === 'Common';

  return (
    <Stack spacing={2}>
      <StyledSubheader>
        {subheader}
        {isNew && (
          <Label color="info" sx={{ ml: 1 }}>
            NEW
          </Label>
        )}
      </StyledSubheader>

      {!commonList && (
        <Link component={RouterLink} href={coverPath}>
          <Image
            disabledEffect
            alt={cover}
            src={cover || '/assets/placeholder.svg'}
            ratio="16/9"
            sx={{
              borderRadius: 1,
              cursor: 'pointer',
              boxShadow: (theme) => theme.customShadows.z8,
              transition: (theme) => theme.transitions.create('all'),
              '&:hover': {
                opacity: 0.8,
                boxShadow: (theme) => theme.customShadows.z24,
              },
            }}
          />
        </Link>
      )}

      <Stack spacing={1.5} alignItems="flex-start">
        {items.map((item) => {
          const active = pathname === item.path || pathname === `${item.path}/`;

          return <NavItem key={item.title} item={item} active={active} subItem />;
        })}
      </Stack>
    </Stack>
  );
}
