import { Box, Container, Grid, Typography } from '@mui/material';
import { primaryFont, secondaryFont } from 'src/theme/typography';

function Section2() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 10 },
        overflow: 'hidden',
      }}
    >
      <Container>
        <Grid
          container
          spacing={{ xs: 5, md: 3 }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
          direction={{ xs: 'column-reverse', md: 'row' }}
        ></Grid>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            fontFamily={secondaryFont.style.fontFamily}
            sx={{
              color: 'black',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '24px',
              zIndex: 1,
              marginTop: '80px',
              marginBottom: '48px',
            }}
          >
            For Partners
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              overflow: 'visible',
            }}
          >
            <Box
              sx={{
                zIndex: 1,
                padding: '30px 60px 0px 0px',
              }}
            >
              <Typography
                fontFamily={secondaryFont.style.fontFamily}
                sx={{
                  color: 'black',
                  fontSize: '48px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '64px',
                  mb: 3,
                }}
              >
                Discover a platform where you can share and explore opportunities at no cost.
              </Typography>
              <Typography
                fontFamily={primaryFont.style.fontFamily}
                sx={{
                  color: 'black',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                  mb: 3,
                }}
              >
                As a partner, you'll gain access to a dynamic ecosystem of SMEs ready to engage.
                Showcase your expertise, products, and services to a targeted audience.
              </Typography>
              <Typography
                fontFamily={primaryFont.style.fontFamily}
                sx={{
                  color: 'black',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                }}
              >
                Unlock the potential for collaboration, growth, and a broader reach. Scaling is your
                bridge to a thriving SME community.
              </Typography>
            </Box>
            <Box
              component={'img'}
              src={'/assets/icons/Img_Course_S7.png'}
              sx={{
                width: '466px',
                height: '466px',
                zIndex: 1,
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Section2;
