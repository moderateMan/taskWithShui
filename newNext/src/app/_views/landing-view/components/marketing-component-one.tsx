import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Iconify } from 'src/muiEazy';
import { useFlatInject } from 'src/service';
import { primaryFont, secondaryFont } from 'src/theme/typography';

// ----------------------------------------------------------------------

const testData = [
  {
    icon: '/assets/icons/vector.svg',
    title: 'Capital Raising',
    description: 'Secure funds to fuel your growth.',
  },
  {
    icon: '/assets/icons/equity.svg',
    title: 'Equity',
    description: 'Discover investment prospects and partnerships.',
  },
  {
    icon: '/assets/icons/ic_users_group.svg',
    title: 'Partnerships',
    description: 'Find strategic allies for your business.',
  },
  {
    icon: '/assets/icons/icon.svg',
    title: 'Startup Pitch',
    description: 'Pitch your groundbreaking ideas.',
  },
  {
    icon: '/assets/icons/ic_shopping_cart.svg',
    title: 'Business for Sale',
    description: 'Promote your venture.',
  },
];

const testCardsData = [
  {
    icon: '/assets/icons/iconCard1.svg',
    title: 'Create Your Account',
    description: 'Join our thriving community',
    link: '#',
  },
  {
    icon: '/assets/icons/iconCard2.svg',
    title: 'Post Your Deal',
    description: 'Showcase your opportunity',
    link: '#',
  },
  {
    icon: '/assets/icons/iconCard3.svg',
    title: 'Connect and Collaborate',
    description: 'Engage with potential partners',
    link: '#',
  },
];

// ----------------------------------------------------------------------

export default function MarketingComponentOne() {
  const { token } = useFlatInject('authStore');
  return (
    <Container>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Stack
          gap={'0px 24px'}
          justifyContent={'center'}
          textAlign={'center'}
          alignItems={'center'}
        >
          <Typography
            fontFamily={secondaryFont.style.fontFamily}
            fontSize={'48px'}
            fontStyle={'normal'}
            fontWeight={700}
            lineHeight={'64px'}
            color={'#14417D'}
          >
            Ready to Scale Your Success?
          </Typography>
          <Box
            sx={{
              height: '100px',
            }}
          />
        </Stack>

        <Stack
          sx={{
            width: '100%',
            mb: 9,
          }}
          direction={'row'}
          gap={'0px 80px'}
        >
          {testData.map((data) => (
            <MarketingIconBlock
              key={data.title}
              icon={data.icon}
              title={data.title}
              description={data.description}
            />
          ))}
        </Stack>

        <Typography
          fontFamily={secondaryFont.style.fontFamily}
          fontSize={'32px'}
          fontStyle={'normal'}
          fontWeight={'700'}
          lineHeight={'48px'}
          color={'#14417D'}
          marginY={'80px'}
        >
          Start here
        </Typography>
        <Stack
          sx={{
            width: '100%',
            mb: 9,
          }}
          direction={'row'}
          spacing={'80px'}
        >
          {testCardsData.map((data) => (
            <MarketingCard
              key={data.title}
              icon={data.icon}
              title={data.title}
              description={data.description}
              link={data.link}
            />
          ))}
        </Stack>
        <Stack
          sx={{
            width: '100%',
            mb: 10,
          }}
          direction={'row'}
          spacing={'80px'}
        >
          <Box
            sx={{
              width: '100%',
              minHeight: '434px',
              borderRadius: '24px',
              background: 'var(--transparent-success-8, rgba(54, 179, 126, 0.08))',
              margin: '72px 220px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: '150px',
                width: 'calc(50%)',
              }}
            >
              <Typography
                sx={{
                  color: 'var(--text-disabled, #9FAF9E)',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '48px',
                  mb: '24px',
                }}
                fontFamily={secondaryFont.style.fontFamily}
              >
                Don't miss out
              </Typography>
              <Typography
                fontFamily={secondaryFont.style.fontFamily}
                sx={{
                  color: 'var(--text-primary, #14417D)',
                  fontSize: '32px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '48px',
                  mb: 3,
                }}
              >
                Take your business to the next level.
              </Typography>
              <Typography
                fontFamily={primaryFont.style.fontFamily}
                sx={{
                  color: 'var(--text-secondary, #59745D)',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                  mb: 5,
                }}
              >
                Post your deals now and watch your business grow!
              </Typography>
              <Button
                sx={{
                  padding: '10px 20px',
                  border: '1px solid var(--components-button-outlined, rgba(145, 158, 171, 0.32))',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    fontFamily={primaryFont.style.fontFamily}
                    sx={{
                      color: 'var(--text-primary, #14417D)',
                      fontSize: '15px',
                      fontStyle: 'normal',
                      fontWeight: '700',
                      lineHeight: '26px',
                    }}
                  >
                    Post Your Deals
                  </Typography>
                  <Iconify icon={'formkit:right'}></Iconify>
                </Box>
              </Button>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                right: '100px',
              }}
              component={'img'}
              src={'/assets/icons/iPhone 15 Pro Left 1.png'}
            />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

const MarketingIconBlock = (props: { icon: string; title: string; description: string }) => {
  return (
    <>
      <Stack
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component={'img'} src={props.icon} height={'62px'} marginBottom={'40px'} />
        <Typography
          fontFamily={secondaryFont.style.fontFamily}
          fontSize={'20px'}
          fontStyle={'normal'}
          fontWeight={600}
          lineHeight={'28px'}
          color={'#14417D'}
          marginBottom={'18px'}
        >
          {props.title}
        </Typography>
        <Typography
          fontFamily={primaryFont.style.fontFamily}
          fontSize={'16px'}
          fontStyle={'normal'}
          fontWeight={400}
          lineHeight={'24px'}
          color={'#59745D'}
        >
          {props.description}
        </Typography>
      </Stack>
    </>
  );
};

const MarketingCard = (props: {
  icon: string;
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <Card
      sx={{
        borderRadius: '16px',
        height: '346px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1 0 0',
        boxShadow: '-8px 8px 24px -4px rgba(145, 158, 171, 0.08)',
        '&:hover': {
          boxShadow: '-8px 8px 24px -4px rgba(145, 158, 171, 0.18)',
        },
      }}
    >
      <Stack sx={{ padding: 0 }}>
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Box
            sx={{
              width: '64px',
              marginBottom: '40px',
            }}
            component={'img'}
            src={props.icon}
          />
          <Stack spacing={'8px'}>
            <Typography
              fontFamily={secondaryFont.style.fontFamily}
              fontSize={'20px'}
              fontStyle={'normal'}
              fontWeight={600}
              lineHeight={'28px'}
              color={'#14417D'}
            >
              {props.title}
            </Typography>
            <Typography
              fontFamily={primaryFont.style.fontFamily}
              fontSize={'16px'}
              fontStyle={'normal'}
              fontWeight={400}
              lineHeight={'24px'}
              color={'#59745D'}
              marginBottom={'55px'}
            >
              {props.description}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '24px',
              }}
              component={'img'}
              src={'/assets/icons/ic_direction_straight_right.svg'}
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};
