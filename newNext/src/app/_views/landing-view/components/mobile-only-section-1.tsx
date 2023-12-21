import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
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

export default function MobileOnlySection1() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `${alpha('#114396', 0.8)}`,
        }),
        overflow: 'hidden',
        py: { xs: 10, md: 15 },
      }}
    >
      <Container>
        <Stack spacing={2} width={'100%'} justifyContent={'center'} px={2}>
          <Box
            component={'img'}
            src={
              'https://fileservicescaling.s3.ap-southeast-2.amazonaws.com/website_media_pic/%F0%9F%8C%84.png'
            }
            sx={{
              width: '100%',
              height: '100%',
              zIndex: 1,
              objectFit: 'cover',
              borderRadius: '16px',
            }}
          />
          <Typography
            fontFamily={secondaryFont.style.fontFamily}
            fontSize={'32px'}
            fontWeight={700}
            lineHeight={'42px'}
            align="center"
            color={'#14417D'}
          >
            So easy it can’t be real.
          </Typography>
          <Typography
            fontFamily={primaryFont.style.fontFamily}
            fontSize={'16px'}
            fontWeight={400}
            lineHeight={'24px'}
            align="center"
            color={'#59745D'}
          >
            At Scaling, we've redefined the landscape of business collaboration. Whether you're an
            SME owner, investor, entrepreneur, or visionary partner, we're your gateway to a world
            of possibilities.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
