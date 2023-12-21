import { Box, Button, Container, Stack, SxProps, Typography } from '@mui/material';
import { Iconify } from 'mui-eazy';
import { useMemo } from 'react';

const ComplexButton = ({
  icon,
  title,
  description,
  vaniant,
  sx,
}: {
  icon: string;
  title: string;
  description: string;
  vaniant: 'outlined' | 'contained';
  sx: SxProps;
}) => {
  return (
    <Button
      sx={sx}
      variant={vaniant}
      endIcon={<Iconify icon={'ep:right'} />}
      startIcon={
        <Stack alignItems={'flex-start'} width={' 100%'} sx={{ padding: '14px 8px 14px 12px' }}>
          <Iconify
            sx={{
              width: '20px',
              height: '20px',
              marginBottom: '8px',
            }}
            icon={icon}
          />
          <Typography
            sx={{
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '28px',
              marginBottom: '8px',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '22px',
            }}
          >
            {description}
          </Typography>
        </Stack>
      }
    >
      <div style={{ flexGrow: 1 }}></div>
    </Button>
  );
};

export const GetStarted = ({ mdUp }: { mdUp: boolean }) => {
  const marginStyle = useMemo(
    () =>
      mdUp
        ? {
            marginTop: '44px',
            marginBottom: '120px',
          }
        : {
            marginTop: '28px',
            marginBottom: '82px',
          },
    [mdUp]
  );

  return (
    <Container sx={marginStyle}>
      <Typography
        sx={{
          color: '#14417D',
          fontSize: mdUp ? '48px' : '24px',
          fontWeight: 700,
          lineHeight: mdUp ? '64px' : '32px',
          marginBottom: '9px',
        }}
      >
        Get Started
      </Typography>
      <Stack sx={{ gap: mdUp ? '56px' : '32px' }}>
        <Typography
          sx={{
            color: '#2E2E2E',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '24px',
          }}
        >
          Scaling offers a diverse suite of possibilities for SMEs
        </Typography>
        <Stack
          direction={mdUp ? 'row' : 'column'}
          rowGap={'32px'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            sx={{ height: mdUp ? '566px' : undefined, width: 'auto' }}
            component={'img'}
            src="/assets/images/beta/pages-marketing-home-2png.png"
          />
          <Stack width={'100%'} maxWidth={'348px'} gap={mdUp ? '32px' : '16px'}>
            <ComplexButton
              sx={{
                background: '#14417D',
                borderRadius: '20px',
                paddingRight: '16px',
              }}
              vaniant="contained"
              icon="octicon:person-24"
              title="Create Your Account"
              description="Join our thriving community"
            />
            <ComplexButton
              sx={{
                borderColor: '#14417D',
                borderRadius: '20px',
                border: ' 2px solid #14417D',
                paddingRight: '16px',
              }}
              vaniant="outlined"
              icon="carbon:rocket"
              title="Post Your Deal"
              description="Connect and Collaborate"
            />
            <ComplexButton
              sx={{
                background: '#14417D',
                borderRadius: '20px',
                paddingRight: '16px',
              }}
              vaniant="contained"
              icon="lets-icons:comment-light"
              title="Connect and Collaborate"
              description="Engage with potential partners"
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
