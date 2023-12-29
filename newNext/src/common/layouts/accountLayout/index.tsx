import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Iconify, useResponsive } from 'src/muiEazy';
import { SplashScreen } from 'src/commonOld/components/loading-screen';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import MainLayout from '../main';
import Nav from './nav';
import { useFlatInject } from 'src/service';

type AccountLayoutProps = {
  children: React.ReactNode;
};

function AccountLayout({ children }: AccountLayoutProps) {
  const mdUp = useResponsive('up', 'md');
  const { loading } = useFlatInject('authStore');
  const menuOpen = useBoolean();

  return (
    <MainLayout>
      {mdUp ? (
        <Container sx={{ my: 5 }}>
          <Typography variant="h3">Account</Typography>
        </Container>
      ) : (
        <Box
          sx={{
            py: 2,
            mb: 5,
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <Container>
            <Button
              size="small"
              color="inherit"
              startIcon={<Iconify icon="carbon:menu" />}
              onClick={menuOpen.onTrue}
            >
              Account
            </Button>
          </Container>
        </Box>
      )}

      <Container>
        <Stack
          direction={{
            md: 'row',
          }}
          alignItems={{
            md: 'flex-start',
          }}
          sx={{
            mb: {
              xs: 8,
              md: 10,
            },
          }}
        >
          <Nav open={menuOpen.value} onClose={menuOpen.onFalse} />
          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            {children}
          </Box>
        </Stack>
        {loading && <SplashScreen />}
      </Container>
    </MainLayout>
  );
}

export default AccountLayout;
