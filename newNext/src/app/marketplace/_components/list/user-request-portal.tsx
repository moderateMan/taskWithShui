import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Iconify from 'src/commonOld/components/iconify';
import { useResponsive } from 'src/commonOld/hooks/use-responsive';
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function UserRequestPortal() {
  const theme = useTheme();
  const route = useRouter();

  const upMd = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        ...bgGradient({
          startColor: `${alpha(theme.palette.grey[900], 0.88)}`,
          endColor: `${alpha(theme.palette.grey[900], 0.88)}`,
          imgUrl: '/assets/images/travel/travel_newsletter.jpg',
          ...(upMd && {
            direction: 'to right',
            startColor: `${alpha(theme.palette.grey[900], 0)} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 1)} 50%`,
            imgUrl: '/assets/images/travel/travel_newsletter.jpg',
          }),
        }),
        py: 10,
        backgroundSize: 'cover, auto 100%',
        backgroundPosition: { xs: 'center', md: 'center, left' },
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid xs={12} md={5}>
            <Stack
              spacing={3}
              sx={{
                color: 'common.white',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h2">Let us help you locate your opportunity</Typography>

              <Typography>
                Tell us what you are looking for
                <br /> and let us do the rest
              </Typography>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                onClick={() => {
                  route.push('/market/user-request');
                 }}
                sx={{
                  px: 0,
                  flexShrink: 0,
                  minWidth: { xs: 1, md: 48 },
                }}
              >
                <Iconify icon="carbon:search" />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
