import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Image from 'src/commonOld/components/image';
import { bgGradient } from 'src/theme/css';
import Lightbox, { useLightbox } from 'src/commonOld/components/lightbox';
import Carousel, { useCarousel, CarouselArrows } from 'src/commonOld/components/carousel';
import Head from 'next/head';

// ----------------------------------------------------------------------

const THUMB_SIZE = 70 * 2;

const StyledThumbnailsContainer = styled('div')<{ length: number }>(({ length, theme }) => ({
  position: 'relative',
  margin: theme.spacing(0, 'auto'),
  '& .slick-slide': {
    lineHeight: 0,
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),

  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),

  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),

  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),

  ...(length > 3 && {
    '&:before, &:after': {
      ...bgGradient({
        direction: 'to left',
        startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
        endColor: `${theme.palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  images: string[];
};

export default function DealDetailsCarousel({ images }: Props) {
  console.log('images', images);

  const theme = useTheme();

  const slides = images.map((slide) => ({
    src: slide,
  }));

  const lightbox = useLightbox(slides);

  const carouselLarge = useCarousel({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  });

  const carouselThumb = useCarousel({
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: slides.length > 3 ? 3 : slides.length,
    initialSlide: 0,
  });

  useEffect(() => {
    // carouselThumb.onSetNav();
    carouselLarge.onSetNav();
  }, [carouselLarge, carouselThumb]);

  useEffect(() => {
    if (lightbox.open) {
      carouselLarge.onTogo(lightbox.selected);
    }
  }, [carouselLarge, lightbox.open, lightbox.selected]);

  const renderLargeImg = (
    <Box
      sx={{
        mb: 3,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.neutral',
      }}
    >
      <CarouselArrows onNext={carouselThumb.onNext} onPrev={carouselThumb.onPrev}>
        <Carousel
          {...carouselLarge.carouselSettings}
          asNavFor={carouselThumb.nav}
          ref={carouselLarge.carouselRef}
        >
          {slides.map((slide) => (
            <Image
              key={slide.src}
              alt="product"
              src={slide.src}
              onClick={() => lightbox.onOpen(slide.src)}
              sx={{ cursor: 'zoom-in', height: '352px' }}
              imgSx={{
                objectFit: 'contain',
              }}
            />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );

  const renderThumbnails = (
    <StyledThumbnailsContainer length={slides.length}>
      <Carousel
        {...carouselThumb.carouselSettings}
        asNavFor={carouselLarge.nav}
        ref={carouselThumb.carouselRef}
      >
        {slides.map((item, index) => (
          <Box key={item.src} sx={{ px: 1 }}>
            <Avatar
              key={item.src}
              alt={item.src}
              src={item.src}
              variant="rounded"
              sx={{
                width: THUMB_SIZE,
                height: THUMB_SIZE / 2,
                opacity: 0.88,
                cursor: 'pointer',
                ...(carouselLarge.currentIndex === index && {
                  opacity: 1,
                  border: `solid 2.5px ${theme.palette.primary.main}`,
                }),
              }}
            />
          </Box>
        ))}
      </Carousel>
    </StyledThumbnailsContainer>
  );

  return (
    <>
      <Box
        sx={{
          '& .slick-slide': {
            float: theme.direction === 'rtl' ? 'rileftght' : 'left',
          },
        }}
      >
        <Head>
          <meta property="og:image" content={images[0]} key="image" />
        </Head>
        {renderLargeImg}
        {renderThumbnails}
      </Box>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </>
  );
}
