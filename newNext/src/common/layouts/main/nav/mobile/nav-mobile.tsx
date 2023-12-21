import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { Iconify } from 'mui-eazy';
import Logo from 'src/commonOld/components/logo';
import Scrollbar from 'src/commonOld/components/scrollbar';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { usePathname } from 'src/routes/hooks';
import { NAV } from '../../../config-layout';
import { NavProps } from '../types';
import { Box } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import NavList from './nav-list';
import { useFlatInject } from 'src/service';

// ----------------------------------------------------------------------

export default function NavMobile({ data }: NavProps) {
  const { userInfo } = useFlatInject('authStore');

  const pathname = usePathname();
  const router = useRouter();

  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton onClick={mobileOpen.onTrue} sx={{ ml: 1, color: 'inherit' }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}

            {userInfo && (
              <Box sx={{ width: '100%', paddingLeft: '30px' }}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon={'humbleicons:rocket'} />}
                  onClick={() => {
                    router.push(`${process.env.NEXT_PUBLIC_DOMAIN_URI}/dashboard/product/new`);
                  }}
                >
                  Post a deal
                </Button>
              </Box>
            )}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
