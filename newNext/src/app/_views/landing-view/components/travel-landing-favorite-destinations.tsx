import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, useTheme } from '@mui/material/styles';
import Iconify from 'src/commonOld/components/iconify';
import Image from 'src/commonOld/components/image';
import TextMaxLine from 'src/commonOld/components/text-max-line';
import { useResponsive } from 'src/commonOld/hooks/use-responsive';
import { ITourProps } from 'src/types/tour';

// ----------------------------------------------------------------------

const ROWS = [
  'Exclusive Partners',
  'Industry Leading Rates',
  'Preselected Services',
  'Competitive Price',
  'Community Support',
];

// ----------------------------------------------------------------------

type Props = {
  tours: ITourProps[];
};

export default function TravelLandingFavoriteDestinations({ tours }: Props) {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Grid
        container
        rowSpacing={{ xs: 8, md: 0 }}
        columnSpacing={{ xs: 0, md: 3 }}
        alignItems={{ md: 'center' }}
        justifyContent={{ md: 'space-between' }}
      >
        <Grid xs={12} md={4}>
          <Typography variant="h2">Our Members' Favorite Opportunities</Typography>

          <Typography sx={{ my: 3, color: 'text.secondary' }}>
            Some descriptive text about the opportunities that are available to members.
          </Typography>

          <Stack spacing={2}>
            {ROWS.map((line) => (
              <Stack key={line} direction="row" alignItems="center" sx={{ typography: 'body1' }}>
                <Box
                  sx={{
                    mr: 2,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
                {line}
              </Stack>
            ))}
          </Stack>
        </Grid>

        <Grid container xs={12} md={6} spacing={{ xs: 4, md: 3 }}>
          {tours.map((tour, index) => (
            <Grid
              key={tour.id}
              xs={12}
              sm={6}
              sx={{
                ...(index === 1 && {
                  display: { md: 'inline-flex' },
                  alignItems: { md: 'flex-end' },
                }),
              }}
            >
              <DestinationItem tour={tour} order={index % 3} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

type DestinationItemProps = {
  tour: ITourProps;
  order: number;
};

function DestinationItem({ tour, order }: DestinationItemProps) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const { location, continent, coverUrl } = tour;

  return (
    <Box
      sx={{
        width: 1,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        alt={location}
        src={coverUrl}
        ratio={(!mdUp && '1/1') || (order && '1/1') || '4/6'}
        overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${
          theme.palette.common.black
        } 75%)`}
      />

      <Stack
        spacing={1}
        sx={{
          p: 3,
          left: 0,
          bottom: 0,
          zIndex: 9,
          color: 'common.white',
          position: 'absolute',
        }}
      >
        <TextMaxLine variant="h5" line={1}>
          {location}
        </TextMaxLine>

        <Stack direction="row" alignItems="center">
          <Iconify icon="carbon:location" sx={{ mr: 1, color: 'primary.main' }} />
          <TextMaxLine variant="body2" line={1} sx={{ opacity: 0.72 }}>
            {continent}
          </TextMaxLine>
        </Stack>
      </Stack>
    </Box>
  );
}
