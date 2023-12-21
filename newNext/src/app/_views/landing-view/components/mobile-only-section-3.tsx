import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled, useTheme } from '@mui/material/styles';
import { primaryFont, secondaryFont } from 'src/theme/typography';

// ----------------------------------------------------------------------

const StyledInput = styled((props: TextFieldProps) => <TextField fullWidth {...props} />)(
  ({ theme }) => ({
    [`& .${inputBaseClasses.input}`]: {
      color: theme.palette.common.white,
    },
    [`& .${inputLabelClasses.root}`]: {
      color: theme.palette.common.white,
    },
    [`& .${inputLabelClasses.root}.${inputLabelClasses.shrink}`]: {
      color: theme.palette.grey[500],
      [`&.${inputLabelClasses.focused}`]: {
        color: 'white',
      },
    },
  })
);

// ----------------------------------------------------------------------

export default function MobileOnlySection3() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        overflow: 'hidden',
        py: 5,
      }}
    >
      <Container>
        <Stack spacing={2} width={'100%'} justifyContent={'flex-start'}>
          <Typography
            fontFamily={secondaryFont.style.fontFamily}
            fontSize={'12px'}
            fontWeight={700}
            lineHeight={'18px'}
            color={'#14417D'}
          >
            For Partners
          </Typography>
          <Typography
            fontFamily={primaryFont.style.fontFamily}
            fontSize={'32px'}
            fontWeight={700}
            lineHeight={'42px'}
            color={'#14417D'}
          >
            Coming soon is our exclusive Partner Marketplace.
          </Typography>
          <Typography
            fontFamily={primaryFont.style.fontFamily}
            fontSize={'16px'}
            fontWeight={400}
            lineHeight={'24px'}
            color={'#14417D'}
          >
            As a partner, you'll gain access to a dynamic ecosystem of SMEs ready to engage.
            Showcase your expertise, products, and services to a targeted audience.
          </Typography>
          <Typography
            fontFamily={primaryFont.style.fontFamily}
            fontSize={'16px'}
            fontWeight={400}
            lineHeight={'24px'}
            color={'#14417D'}
          >
            Unlock the potential for collaboration, growth, and a broader reach. Scaling is your
            bridge to a thriving SME community.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
