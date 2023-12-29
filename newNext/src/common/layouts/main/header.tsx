import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Iconify, useOffSetTop, useResponsive } from 'src/muiEazy';
import HeaderShadow from 'src/common/components/header-shadow';
import Label from 'src/commonOld/components/label';
import Logo from 'src/commonOld/components/logo';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import { bgBlur } from 'src/theme/css';
import { HEADER } from '../config-layout';
import MenuBtn from './components/menu-btn';
import { navConfig } from './config-navigation';
import NavDesktop from './nav/desktop';
import NavMobile from './nav/mobile';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export default function Header({ headerOnDark }: Props) {
  const { userInfo } = useFlatInject('authStore');
  const theme = useTheme();
  const offset = useOffSetTop();
  const mdUp = useResponsive('up', 'md');

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={10}>
            <Box sx={{ lineHeight: 0, position: 'relative' }}>
              <Logo />

              <Link href="#" target="_blank" rel="noopener">
                <Label
                  color="info"
                  sx={{
                    ml: 11,
                    px: 0.5,
                    top: -4,
                    left: 1,
                    height: 20,
                    fontSize: 11,
                    cursor: 'pointer',
                    position: 'absolute',
                  }}
                >
                  beta
                </Label>
              </Link>
            </Box>

            {mdUp && <NavDesktop data={navConfig} />}
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
              {/* <Searchbar/> */}
              {/* <SettingsButton/> */}
              {mdUp && <MenuBtn />}
              {userInfo && mdUp && (
                <Link href={paths.account.postDeal}>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon={'carbon:rocket'} color="#FFD600" />}
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    Post A Deal
                  </Button>
                </Link>
              )}
            </Stack>
          </Stack>

          {!mdUp && (
            <NavMobile data={[{ title: 'Account', path: paths.account.personal }, ...navConfig]} />
          )}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}
