import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useResponsive } from 'src/muiEazy';
import { CSSProperties, useMemo } from 'react';

// ----------------------------------------------------------------------
const hero_large = '/assets/images/beta/pages-marketing-home-1.jpg';

const roundButtonStyle: CSSProperties = { borderRadius: '27px', width: 'fit-content' };

export default function LandingHeroMain() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Box sx={{ minHeight: { md: '50vh' }, position: 'relative' }}>
      <View mdUp={mdUp} />
    </Box>
  );
}

const View = (props: { mdUp: boolean }) => {
  const marginStyle = useMemo(
    () =>
      props.mdUp
        ? {
            marginTop: '44px',
            marginBottom: '44px',
          }
        : {
            marginTop: '28px',
            marginBottom: '28px',
          },
    [props.mdUp]
  );

  const smDown = useResponsive('down', 450);

  return (
    <Container sx={marginStyle}>
      <div
        style={{
          display: 'grid',
          gridTemplate: props.mdUp ? `"a c" "b c"` : `"a a" 226px  "b c"`,
          maxHeight: props.mdUp ? '820px' : '651px',
        }}
      >
        <Stack spacing={2} sx={{ gridArea: 'a' }}>
          <Typography
            sx={{
              color: '#2E2E2E',
              fontWeight: 600,
              fontSize: props.mdUp ? '32px' : '20px',
              lineHeight: props.mdUp ? '36px' : '30px',
            }}
          >
            Find your next
          </Typography>
          <Typography
            sx={{
              wordWrap: 'break-word',
              color: '#14417D',
              fontWeight: 700,
              fontSize: props.mdUp ? '96px' : '42px',
              lineHeight: props.mdUp ? '108px' : '54.6px',
              display: 'inline-block',
              width: 'fit-content',
            }}
          >
            Capital Raising Partner
          </Typography>

          <Stack direction={'row'} gap={'16px'}>
            <Button
              sx={{
                background: '#14417D',
              }}
              size="large"
              variant="contained"
            >
              Find yours
            </Button>
            <Button
              size="large"
              variant="outlined"
              sx={{
                color: '#2E2E2E',
              }}
            >
              How Scaling works
            </Button>
          </Stack>
        </Stack>
        <Stack
          gap={props.mdUp ? '26px' : '16px'}
          sx={{
            marginTop: props.mdUp ? '100px' : '72px',
            gridArea: 'b',
            width: 'fit-content',
          }}
        >
          <Stack direction={props.mdUp ? 'row' : 'column'} gap={props.mdUp ? '20px' : '16px'}>
            <Button
              size="large"
              variant="contained"
              style={roundButtonStyle}
              sx={{
                color: '#FFD600',
                background: '#14417D',
              }}
            >
              Capital Raising Partner
            </Button>
            <Button
              sx={{
                color: '#14417D',
                borderColor: '#14417D',
              }}
              size="large"
              variant="outlined"
              style={roundButtonStyle}
            >
              Business to Buy
            </Button>
          </Stack>
          <Stack direction={props.mdUp ? 'row' : 'column'} gap={props.mdUp ? '20px' : '16px'}>
            <Button
              sx={{
                color: '#14417D',
                borderColor: '#14417D',
              }}
              size="large"
              variant="outlined"
              style={roundButtonStyle}
            >
              Startup Idea
            </Button>
            <Button
              sx={{
                color: '#14417D',
                borderColor: '#14417D',
              }}
              size="large"
              variant="outlined"
              style={roundButtonStyle}
            >
              Partnership
            </Button>
            <Button
              sx={{
                color: '#14417D',
                borderColor: '#14417D',
              }}
              size="large"
              variant="outlined"
              style={roundButtonStyle}
            >
              Equity Partner
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            marginTop: props.mdUp ? undefined : '28px',
            gridArea: 'c',
            height: props.mdUp ? '820px' : '377px',
            objectFit: 'scale-down',
            transform: props.mdUp
              ? 'scale(1.1) translateX(-10%)'
              : smDown
              ? 'scale(1.4) translateX(-10%)'
              : 'scale(1.3) translateX(-10%)',
          }}
          component={'img'}
          src={hero_large}
        />
      </div>
    </Container>
  );
};
