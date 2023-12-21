import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import { Iconify } from 'mui-eazy';

// ----------------------------------------------------------------------

export default function SupportHero() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
        py: 15,
        px: 2.5,
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" sx={{ textAlign: 'center', color: 'common.white', mb: 5 }}>
        Welcome to <br />
        <Box component="span" sx={{ color: 'primary.main' }}>
          {`Scaling Platform `}
        </Box>
        Support
      </Typography>
    </Stack>
  );
}
