import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, alpha, styled } from '@mui/material/styles';
import { _socials } from 'src/_mock';
import Iconify from 'src/commonOld/components/iconify';
import Image from 'src/commonOld/components/image';
import { bgGradient } from 'src/theme/css';
import { IDealTeamMember } from 'src/types/deal';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  opacity: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
  '&:hover': { opacity: 1 },
}));

// ----------------------------------------------------------------------

type Props = {
  member: IDealTeamMember;
  sx?: SxProps;
};

export default function DealTeamItem({ member, sx = {} }: Props) {
  const { name, description, image, title } = member;

  return (
    <Card sx={sx}>
      <Stack spacing={0.5} sx={{ textAlign: 'center', pt: 3, pb: 1.5 }}>
        <Stack spacing={2} justifyContent={'center'}>
          <Typography
            sx={{
              color: '#14417D',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '28px',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#232323',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '22px',
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          {description}
        </Typography>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <Shape />

        <StyledOverlay>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ width: 1, zIndex: 9, bottom: 24, position: 'absolute' }}
          >
            {_socials.map((social) => (
              <IconButton key={social.value} color="primary">
                <Iconify icon={social.icon} />
              </IconButton>
            ))}
          </Stack>
        </StyledOverlay>

        <Image src={image} alt={name} ratio="1/1" />
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function Shape() {
  return (
    <Box
      sx={{
        top: 0,
        width: 1,
        height: 8,
        zIndex: 9,
        position: 'absolute',
        color: 'background.paper',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="32" viewBox="0 0 1080 32">
        <path fill="currentColor" d="M1080 32L0 0h1080v32z" />
      </svg>
    </Box>
  );
}
