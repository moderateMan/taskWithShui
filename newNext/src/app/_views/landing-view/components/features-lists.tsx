import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DealLandingItem from 'src/common/components/deal-landing-item';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import { DealEntity } from 'src/types/deal';

// ----------------------------------------------------------------------

type Props = {
  deals: DealEntity[];
};

export default function FeaturedDealsLanding({ deals }: Props) {
  const { token } = useFlatInject('authStore');
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <Typography variant="h3">Featured Tours</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          {`Our Featured Tours can help you find the trip that's perfect for you!`}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing="48px 24px"
        my={{ xs: 8, md: 10 }}
        flexWrap={'wrap'}
        justifyContent={'center'}
      >
        {deals.map((deal) => (
          <DealLandingItem key={deal.id} deal={deal} />
        ))}
      </Stack>
      {/* </Box> */}

      <Box sx={{ textAlign: 'center' }}>
        <Button
          component={RouterLink}
          href={token ? paths.travel.tours : paths.loginCover}
          size="large"
          variant="outlined"
          color="inherit"
        >
          View All Tours
        </Button>
      </Box>
    </Container>
  );
}
