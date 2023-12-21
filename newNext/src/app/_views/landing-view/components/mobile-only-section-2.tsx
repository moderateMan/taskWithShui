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

export default function MobileOnlySection2() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: `${'#14417D'}`,
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
            color={'white'}
          >
            For SME Owners and Investors.
          </Typography>
          <Typography
            fontFamily={primaryFont.style.fontFamily}
            fontSize={'32px'}
            fontWeight={700}
            lineHeight={'42px'}
            color={'white'}
          >
            Discover a platform where you can share and explore opportunities at no cost.
          </Typography>
          <Typography
            fontFamily={primaryFont.style.fontFamily}
            fontSize={'16px'}
            fontWeight={400}
            lineHeight={'24px'}
            color={'white'}
          >
            Seeking capital funding? Exploring equity options? Pitching your startup idea? Searching
            for strategic partnerships? Looking to sell your business?
          </Typography>
          <Typography
            fontFamily={primaryFont.style.fontFamily}
            fontSize={'16px'}
            fontWeight={400}
            lineHeight={'24px'}
            color={'white'}
          >
            Scaling empowers you to post your deals and connect with a diverse community of
            like-minded individuals. It's your space to grow, innovate, and make impactful
            decisions.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
