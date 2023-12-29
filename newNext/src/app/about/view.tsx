'use client';

import { Button, Typography } from '@mui/material';
import { Container, Stack, Box } from '@mui/system';
import { useResponsive } from 'src/muiEazy';
import { useEffect, useMemo } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';

const Banner = (props: { mdUp: boolean }) => {
  const imageUri = '/assets/images/beta/pages-marketing.png';
  const containerMargin = useMemo(() => {
    if (props.mdUp) {
      return { marginTop: '53px', marginBottom: '95px' };
    } else {
      return { marginTop: '48px', marginBottom: '56px' };
    }
  }, [props.mdUp]);

  return (
    <Container sx={containerMargin}>
      <Stack direction={'row'}>
        {props.mdUp && (
          <Box
            width={props.mdUp ? '50%' : '100%'}
            sx={{
              // backgroundColor: 'green',
              display: 'flex',
              justifyContent: 'flex-start',
              height: '100%',
              padding: '0 0px',
            }}
          >
            <Box component={'img'} src={imageUri} width={'57.778%'} />
          </Box>
        )}
        <Box
          width={props.mdUp ? '50%' : '100%'}
          sx={{
            // backgroundColor: 'gold',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack spacing={2}>
            <Typography
              sx={{
                color: '#2E2E2E',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '28px',
              }}
            >
              About Scaling
            </Typography>
            <Typography
              sx={{
                wordWrap: 'break-word',
                color: '#14417D',
                fontSize: props.mdUp ? '48px' : '32px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: props.mdUp ? '64px' : '42px',
              }}
            >
              Your Gateway to Business Growth.
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                wordWrap: 'break-word',
                color: '#6A6A6A',
                fontSize: '16px',
                fontStyle: 'normal',
                lineHeight: '24px',
              }}
            >
              At Scaling, we believe in the power of opportunities and connections. Our mission is
              to provide a dynamic platform where SMEs, entrepreneurs, investors, and solution
              providers can come together to shape a brighter future for businesses.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

const WhoWeAre = (props: { mdUp: boolean }) => {
  const imageUri = '/assets/images/beta/pages-marketing-jason-goodman-vbxy-fxlgpj-m-unsplash-1.png';
  const containerMargin = useMemo(() => {
    if (props.mdUp) {
      return { paddingTop: '120px', paddingBottom: '120px' };
    } else {
      return { paddingTop: '56px', paddingBottom: '56px' };
    }
  }, [props.mdUp]);

  return (
    <div style={{ width: '100%', background: '#14417D' }}>
      <Container sx={{ ...containerMargin }}>
        <Stack
          direction={props.mdUp ? 'row-reverse' : 'column-reverse'}
          gap={props.mdUp ? undefined : '56px'}
        >
          <Box
            width={props.mdUp ? '50%' : '100%'}
            sx={{
              // backgroundColor: 'green',
              display: 'flex',
              justifyContent: props.mdUp ? 'flex-end' : 'center',
              height: '100%',
              padding: '0 0px',
            }}
          >
            <Box component={'img'} src={imageUri} width={'57.778%'} borderRadius={'5%'} />
          </Box>
          <Box
            width={props.mdUp ? '50%' : '100%'}
            sx={{
              // backgroundColor: 'gold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Stack spacing={2}>
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  color: '#FFD600',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '28px',
                }}
              >
                Who We Are
              </Typography>
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  color: 'var(--common-white, #FFF)',
                  fontSize: props.mdUp ? '48px' : '32px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: props.mdUp ? '64px' : '42px',
                }}
              >
                We are a community of innovators, entrepreneurs and visionaries.
              </Typography>
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  color: 'var(--common-white, #FFF)',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '24px',
                }}
              >
                We're a team that's passionate about helping SMEs like you grow, succeed, and
                thrive. We're here to empower you with the tools and connections you need to achieve
                your business goals.
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

const WhatWeOfferItem = (props: { img: string; title: string; description: string }) => {
  return (
    <Stack sx={{ width: 'var(--item-width)' }}>
      <Box component={'img'} src={props.img} height={'64px'} />
      <Typography
        sx={{
          marginTop: '40px',
          color: '#2E2E2E',
          textAlign: 'center',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '28px',
        }}
      >
        {props.title}
      </Typography>
      <Typography
        sx={{
          marginTop: '16px',
          color: '#6A6A6A',
          textAlign: 'center',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '24px',
        }}
      >
        {props.description}
      </Typography>
    </Stack>
  );
};

const items = [
  {
    img: '/assets/images/beta/pages-marketing-services-icons-vector.svg',
    title: 'Capital Raising',
    description: 'Secure the funding you need to take your business to the next level.',
  },
  {
    img: '/assets/images/beta/pages-marketing-services-icons-equity.svg',
    title: 'Equity Opportunities',
    description: 'Find investors who believe in your vision and want to be a part of your journey.',
  },
  {
    img: '/assets/images/beta/pages-marketing-services-icon.svg',
    title: 'Startup Pitches',
    description:
      'Showcase your groundbreaking ideas and attract the right partners to bring them to life.',
  },
  {
    img: '/assets/images/beta/pages-marketing-services-icons-ic-users-group.svg',
    title: 'Partnerships',
    description: 'Connect with strategic allies who can help you expand and excel.',
  },
  {
    img: '/assets/images/beta/pages-marketing-services-icons-ic-shopping-cart.svg',
    title: 'Business for Sale',
    description:
      "Whether you're ready to move on or acquire a new venture, Scaling is your marketplace.",
  },
  {
    img: '/assets/images/beta/pages-marketing-services-icons-ic-cube-outline.svg',
    title: 'Opportunities',
    description:
      'Discover exclusive offerings on products and services from solution providers that can take your business to new heights.',
  },
];

const WhatWeOffer = (props: { mdUp: boolean }) => {
  const containerMargin = useMemo(() => {
    if (props.mdUp) {
      return { paddingTop: '120px', paddingBottom: '120px' };
    } else {
      return { paddingTop: '56px', paddingBottom: '56px' };
    }
  }, [props.mdUp]);
  return (
    <Container sx={{ ...containerMargin, '--item-width': '357px' }}>
      <Stack alignItems={'center'} gap={props.mdUp ? '24px' : '12px'}>
        <Typography
          sx={{
            color: '#14417D',
            fontSize: '48px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '64px',
          }}
        >
          What We Offer
        </Typography>
        <Typography
          sx={{
            color: '#2E2E2E',
            textAlign: 'center',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '28px',
          }}
        >
          Scaling offers a diverse suite of possibilities for SMEs
        </Typography>

        <div
          style={{
            marginTop: '64px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: props.mdUp ? 'repeat(3, 1fr)' : '1fr',
            rowGap: props.mdUp ? '67px' : '72px',
            columnGap: props.mdUp ? 'calc((100% - var(--item-width) * 3) / 2)' : undefined,
            alignContent: 'space-between',
          }}
        >
          {items.map((item) => (
            <WhatWeOfferItem {...item} />
          ))}
        </div>
      </Stack>
    </Container>
  );
};

const WhyScaling = (props: { mdUp: boolean }) => {
  const imgUri = '/assets/images/beta/pages-marketing-agefis-eqv-a-izn-vq-r-4-unsplash-1.png';
  const containerMargin = useMemo(() => {
    if (props.mdUp) {
      return { paddingTop: '120px', paddingBottom: '120px' };
    } else {
      return { paddingTop: '56px', paddingBottom: '56px' };
    }
  }, [props.mdUp]);
  return (
    <div style={{ width: '100%', background: '#14417D' }}>
      <Container sx={{ ...containerMargin }}>
        <Stack
          direction={props.mdUp ? 'row' : 'column-reverse'}
          gap={props.mdUp ? undefined : '56px'}
        >
          <Box
            width={props.mdUp ? '50%' : '100%'}
            sx={{
              // backgroundColor: 'green',
              display: 'flex',
              justifyContent: props.mdUp ? 'flex-start' : 'center',
              height: '100%',
              padding: '0 0px',
            }}
          >
            <Box component={'img'} src={imgUri} width={'57.778%'} borderRadius={'5%'} />
          </Box>
          <Box
            width={props.mdUp ? '50%' : '100%'}
            sx={{
              // backgroundColor: 'gold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Stack spacing={2}>
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  color: '#FFD600',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '28px',
                }}
              >
                Why Scaling?
              </Typography>
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  color: 'var(--common-white, #FFF)',
                  fontSize: props.mdUp ? '48px' : '32px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: props.mdUp ? '64px' : '42px',
                }}
              >
                Our platform is more than just a place to post opportunities.
              </Typography>
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  color: 'var(--common-white, #FFF)',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '24px',
                }}
              >
                It's a hub of collaboration, knowledge, and growth. When you join Scaling, you
                unlock:
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    marginTop: '16px',
                  }}
                >
                  <li>
                    Networking: Connect with a like-minded community of entrepreneurs and investors.
                  </li>
                  <li>
                    Insights: Stay informed with our newsfeed, featuring industry insights and
                    partner articles.
                  </li>
                  <li>
                    Transparency: Our commitment to transparency ensures you can make informed
                    decisions.
                  </li>
                </ul>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

const OurTeamItem = (props: { img: string; name: string; job: string; description: string }) => {
  return (
    <Stack sx={{ width: '254px' }}>
      <img src={props.img} alt="" style={{ width: '100%', borderRadius: '5%' }} />
      <Typography
        sx={{
          marginTop: '20px',
          color: '#14417D',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '28px',
        }}
      >
        {props.name}
      </Typography>
      <Typography
        sx={{
          color: '#2E2E2E',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '22px',
        }}
      >
        {props.job}
      </Typography>
      <Typography
        sx={{
          marginTop: '12px',
          color: '#6A6A6A',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '22px',
        }}
      >
        {props.description}
      </Typography>
    </Stack>
  );
};

const OurTeam = (props: { mdUp: boolean }) => {
  const items = new Array(6).fill({
    img: '/assets/images/beta/pages-marketing-agefis-eqv-a-izn-vq-r-4-unsplash-1.png',
    name: 'FakeName',
    job: 'CEO, ABC Company',
    description:
      'Lorem ipsum dolor sit amet consectetur. Suspendisse eget sagittis tempor odio nulla elementum ultrices habitasse. Diam nisl sed congue eusan cras mattis.',
  }) as Parameters<typeof OurTeamItem>[0][];
  const containerMargin = useMemo(() => {
    if (props.mdUp) {
      return { marginTop: '120px', marginBottom: '120px' };
    } else {
      return { marginTop: '56px', marginBottom: '56px' };
    }
  }, [props.mdUp]);

  return (
    <Container sx={containerMargin}>
      <Stack alignItems={'center'} gap={props.mdUp ? '80px' : '64px'}>
        <Typography
          sx={{
            color: '#14417D',
            fontSize: '48px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '64px',
          }}
        >
          Our Team
        </Typography>
      </Stack>
      <Stack alignItems={'center'} sx={{ marginTop: props.mdUp ? '80px' : '56px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: props.mdUp ? 'repeat(3, 1fr)' : '1fr',
            gap: '24px',
            width: 'fit-content',
          }}
        >
          {items.map((item, index) => (
            <OurTeamItem key={index} {...item} />
          ))}
        </div>
      </Stack>
    </Container>
  );
};

const JoinScaling = (props: { mdUp: boolean }) => {
  const containerMargin = useMemo(() => {
    if (props.mdUp) {
      return { paddingTop: '120px', paddingBottom: '120px' };
    } else {
      return { paddingTop: '56px', paddingBottom: '56px' };
    }
  }, [props.mdUp]);
  const theme = useTheme();

  return (
    // FIXME: wrong img asset
    <div
      style={{
        width: '100%',
        ...bgGradient({
          color: `${alpha(theme.palette.grey[900], 0.8)}`,
          imgUrl: '/assets/images/career/career_newsletter.jpg',
        }),
      }}
    >
      <Container
        sx={{
          ...containerMargin,

          overflow: 'hidden',
          py: { xs: 10, md: 15 },
        }}
      >
        <Stack alignItems={'center'} gap={'40px'}>
          <Typography
            align="center"
            sx={{
              maxWidth: '854px',
              color: 'var(--common-white, #FFF)',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '64px',
            }}
          >
            Join Scaling and be part of a transformative journey
          </Typography>
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: '#14417D',

                display: 'flex',
                padding: '11px 22px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Register now
            </Button>
          </div>
        </Stack>
      </Container>
    </div>
  );
};

const View = () => {
  const mdUp = useResponsive('up', 'md');
  useEffect(() => {}, []);
  return (
    <>
      <Banner mdUp={mdUp} />
      <WhoWeAre mdUp={mdUp} />
      <WhatWeOffer mdUp={mdUp} />
      <WhyScaling mdUp={mdUp} />
      <OurTeam mdUp={mdUp} />
      <JoinScaling mdUp={mdUp} />
    </>
  );
};
export default View;
