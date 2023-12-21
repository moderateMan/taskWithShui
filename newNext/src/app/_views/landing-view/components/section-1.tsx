import { Box, Container, Grid, Typography } from '@mui/material';
import { primaryFont, secondaryFont } from 'src/theme/typography';

function Section1() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 10 },
        overflow: 'hidden',
        bgcolor: '#0C3024',
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
              color: 'var(--primary-contrast-text, #FFF)',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '24px',
              zIndex: 1,
              marginTop: '30px',
              marginBottom: '48px',
            }}
          >
            For SME Owners and Investors.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              overflow: 'visible',
            }}
          >
            <Box
              component={'img'}
              src={'/assets/icons/Img_Course_S.6.png'}
              sx={{
                width: '466px',
                height: '466px',
                zIndex: 1,
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
            <Box
              sx={{
                zIndex: 1,
                padding: '30px 60px',
              }}
            >
              <Typography
                fontFamily={secondaryFont.style.fontFamily}
                sx={{
                  color: 'var(--primary-contrast-text, #FFF)',
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
                  color: 'var(--common-white, #FFF)',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                  mb: 3,
                }}
              >
                Seeking capital funding? Exploring equity options? Pitching your startup idea?
                Searching for strategic partnerships? Looking to sell your business?
              </Typography>
              <Typography
                fontFamily={primaryFont.style.fontFamily}
                sx={{
                  color: 'var(--common-white, #FFF)',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                }}
              >
                Scaling empowers you to post your deals and connect with a diverse community of
                like-minded individuals. It's your space to grow, innovate, and make impactful
                decisions.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Section1;
