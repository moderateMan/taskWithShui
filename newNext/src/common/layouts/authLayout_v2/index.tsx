import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import Image from 'src/commonOld/components/image';
import { useResponsive } from 'src/commonOld/hooks/use-responsive';
import Carousel, { useCarousel, CarouselDots } from 'src/commonOld/components/carousel';

// ----------------------------------------------------------------------

type AuthCarouselProps = {
  title: string;
  image: string;
  children: React.ReactNode;
};

function AuthCoverLayout_v2({ title, image, children }: AuthCarouselProps) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  return (
    <Box sx={{ minHeight: 1, display: 'flex' }}>
      <Box
        sx={{
          mx: 'auto',
          flexShrink: 0,
          py: { xs: 5, md: 8 },
          px: { xs: 2, md: 10 },
          width: { xs: 1, md: 480 },
        }}
      >
        {children}
      </Box>

      {mdUp && (
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'common.black',
          }}
        >
          <Image
            key={image}
            alt={image}
            src={image}
            overlay={`linear-gradient(to bottom, ${alpha(
              theme.palette.common.black,
              0
            )} 0%, ${alpha(theme.palette.common.black, 0.8)} 100%)`}
            sx={{
              '& img': { minHeight: '100vh', width: 1 },
              position: 'absolute',
              left: 0,
              top: 0,
              objectFit: 'cover',
              height: 1,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              p: 10,
              width: 1,
              zIndex: 10,
              textAlign: 'center',
              color: 'common.white',
              whiteSpace: 'pre-line',
              position: 'absolute',
              left: 0,
              bottom: 80,
            }}
          >
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default AuthCoverLayout_v2;
