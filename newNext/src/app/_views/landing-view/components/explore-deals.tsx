import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useMemo } from 'react';
import DealLandingItem from 'src/common/components/deal-landing-item';
import { DealEntity } from 'src/types/deal';

export const ExploreDeals = ({ mdUp, deals }: { mdUp: boolean; deals: DealEntity[] }) => {
  const marginStyle = useMemo(
    () => ({
      paddingTop: mdUp ? '120px' : '56px',
      paddingBottom: mdUp ? '120px' : '56px',
    }),
    [mdUp]
  );
  return (
    <Container sx={marginStyle}>
      <div
        style={{
          display: 'grid',
          gridTemplate: mdUp ? `"a c" "b b"` : `"a" "b" "c"`,
          justifyContent: 'space-between',
          rowGap: '16px',
        }}
      >
        <Typography
          sx={{
            gridArea: 'a',
            color: '#14417D',
            fontSize: mdUp ? '48px' : '24px',
            fontWeight: 700,
            lineHeight: mdUp ? '64px' : '32px',
          }}
        >
          Explore Deals
        </Typography>
        <Button variant="contained" sx={{ gridArea: 'c', width: '130px' }}>
          Sign up free
        </Button>
        <Typography
          sx={{
            gridArea: 'b',
            color: '#2E2E2E',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '24px',
          }}
        >
          <span
            style={{
              textDecorationLine: 'underline',
            }}
          >
            {'Become a Member'}&nbsp;
          </span>
          to view all deals.
        </Typography>
      </div>
      <div style={{ overflowX: 'auto', marginTop: '56px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: mdUp ? 'repeat(4, 1fr)' : 'repeat(8, 1fr)',
            justifyContent: 'space-between',
            rowGap: '48px',
            columnGap: '24px',
          }}
        >
          {deals.map((it, index) => (
            <DealLandingItem key={index} deal={it} />
          ))}
        </div>
      </div>
    </Container>
  );
};
