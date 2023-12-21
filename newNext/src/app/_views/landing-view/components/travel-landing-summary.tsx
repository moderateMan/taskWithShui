import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CountUp from 'src/commonOld/components/count-up';
import Image from 'src/commonOld/components/image';
import { fShortenNumber } from 'src/commonOld/utils/format-number';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    total: 130,
    description: 'Service providers',
    icon: '/assets/icons/travel/ic_travel_tickets.svg',
  },
  {
    total: 196,
    description: 'Services booked',
    icon: '/assets/icons/travel/ic_travel_booking.svg',
  },
  {
    total: 10670,
    description: 'Site visitors',
    icon: '/assets/icons/travel/ic_travel_site_visitors.svg',
  },
  {
    total: 877,
    description: 'Verified Members',
    icon: '/assets/icons/travel/ic_travel_verified_hotels.svg',
  },
];

// ----------------------------------------------------------------------

export default function TravelLandingSummary() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          mx: 'auto',
          maxWidth: 480,
          mb: { xs: 8, md: 10 },
        }}
      >
        <Typography variant="h2">Fastest Way to find high quality services</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Since all services are pre-filtered, you can find your service provider in just a few clicks, and get a quote where price can never find anywhere else.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 8, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value) => (
          <Stack key={value.description} spacing={1}>
            <Image
              alt={value.icon}
              src={value.icon}
              sx={{ mb: 3, width: 80, height: 80, mx: 'auto' }}
            />

            <Typography variant="h3">
              <CountUp
                start={value.total / 5}
                end={value.total}
                formattingFn={(newValue: number) => fShortenNumber(newValue)}
              />
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
