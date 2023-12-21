import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';
import Image from 'src/commonOld/components/image';
import SvgColor from 'src/commonOld/components/svg-color';
import { useBoundingClientRect } from 'src/commonOld/hooks/use-bounding-client-rect';
import { useResponsive } from 'src/commonOld/hooks/use-responsive';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: 'Professional Service',
    description: 'Nunc nonummy metus. Donec elit libero',
    icon: '/assets/icons/ic_popularity.svg',
  },
  {
    title: 'Customer Satisfaction',
    description: 'Nunc nonummy metus. Donec elit libero',
    icon: '/assets/icons/ic_reputation.svg',
  },
  {
    title: 'Prefiltered Partners',
    description: 'Icons needs replacements',
    icon: '/assets/icons/ic_secure_payment.svg',
  },
];

// ----------------------------------------------------------------------

export default function TravelLandingIntroduce() {
  const mdUp = useResponsive('up', 'md');

  const containerRef = useRef<HTMLDivElement>(null);

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container && container.left + 20;

  return (
    <Box
      sx={{
        pt: { xs: 10, md: 15 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Container ref={containerRef}>
        <Stack
          spacing={3}
          sx={{
            maxWidth: 700,
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Typography variant="h2">Explore A Different Way To Find Your Service Providers</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Cras ultricies mi eu turpis hendrerit fringilla. Nulla consequat massa quis enim.
          </Typography>
        </Stack>
      </Container>

      <Box
        sx={{
          position: 'relative',
          my: { xs: 8, md: 10 },
          ml: { md: `${offsetLeft}px` },
        }}
      >
        <Card
          sx={{
            p: 5,
            top: 0,
            left: 0,
            zIndex: 9,
            m: { xs: 2, md: 5 },
            position: 'absolute',
            maxWidth: { sm: 360 },
            right: { xs: 0, sm: 'unset' },
            bottom: { xs: 0, sm: 'unset' },
            textAlign: { xs: 'center', sm: 'unset' },
            display: 'flex',
            alignItems: { xs: 'center', sm: 'unset' },
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            subtitle
          </Typography>

          <Typography variant="h4" sx={{ my: 3 }}>
            Descriptive info
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'unset' }}
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              typography: 'subtitle1',
              '&:hover': { opacity: 0.72 },
            }}
          >
            {/* <Iconify icon="carbon:play" width={24} sx={{ mr: 1 }} /> Watch Video */}
          </Stack>
        </Card>

        <Image
          alt="cover"
          src="/assets/images/travel/travel_post_hero.jpg"
          width={1600}
          height={mdUp ? 900 : 1600}
          ratio={mdUp ? '16/9' : '1/1'}
        />
      </Box>

      <Container sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 8, md: 3 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {SUMMARY.map((value) => (
            <Stack key={value.title} spacing={2}>
              <SvgColor
                src={value.icon}
                sx={{
                  mb: 3,
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  color: 'primary.main',
                }}
              />

              <Typography variant="h5">{value.title}</Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {value.description}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
