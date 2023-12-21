import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { useResponsive } from 'mui-eazy';
import { useMemo } from 'react';
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

const StyledInput = styled((props: TextFieldProps) => (
  <TextField
    fullWidth
    {...props}
    sx={{ border: '1px solid #2E2E2E', borderRadius: '8px', ...props.sx }}
  />
))(({ theme }) => ({
  [`& .${inputBaseClasses.input}`]: {
    color: '#2E2E2E',
  },
  [`& .${inputLabelClasses.root}`]: {
    color: '#2E2E2E',
  },
  [`& .${inputLabelClasses.root}.${inputLabelClasses.shrink}`]: {
    color: theme.palette.grey[500],
    [`&.${inputLabelClasses.focused}`]: {
      color: '#2E2E2E',
    },
  },
}));

// ----------------------------------------------------------------------

export default function Section4() {
  const mdUp = useResponsive('up', 'md');
  const marginStyle = useMemo(
    () => ({
      paddingTop: mdUp ? '120px' : '56px',
      paddingBottom: mdUp ? '120px' : '56px',
    }),
    [mdUp]
  );

  return (
    <Container sx={marginStyle}>
      <Stack direction={mdUp ? 'row' : 'column'} gap={'270px'}>
        <Stack maxWidth={'580px'}>
          <Typography
            sx={{
              mb: { xs: 3, md: 8 },
              color: '#14417D',
              fontSize: mdUp ? '48px' : '24px',
              fontWeight: 700,
              lineHeight: mdUp ? '64px' : '32px',
            }}
          >
            Join us and be part of a transformative journey
          </Typography>

          <Stack alignItems={{ xs: 'center', md: 'flex-start' }}>
            <StyledInput label="Full Name" sx={{ mb: 2.5 }} />

            <StyledInput label="Email" sx={{ mb: 2.5 }} />

            <StyledInput label="Subject" sx={{ mb: 2.5 }} />

            <StyledInput multiline rows={4} label="Message" sx={{ mb: 5 }} />

            <Stack
              direction={'row'}
              gap={'16px'}
              justifyContent={mdUp ? 'flex-start' : 'space-between'}
              sx={{ width: '100%' }}
            >
              <Button
                size="large"
                variant="contained"
                sx={{ width: '168px', background: '#14417D' }}
              >
                Send Message
              </Button>
              <Button size="large" variant="outlined" sx={{ width: '168px', color: '#2E2E2E' }}>
                Sign up free
              </Button>
            </Stack>
          </Stack>
        </Stack>

        {mdUp && (
          <Box component={'img'} src="/assets/images/beta/pages-i-phone-15-pro-left-1.png" />
        )}
      </Stack>
    </Container>
  );
}
