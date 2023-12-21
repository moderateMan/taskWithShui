import { Stack } from '@mui/system';
import { ColoredPart } from './colored-part';
import { Box, Typography } from '@mui/material';
import { Inter, Public_Sans } from 'next/font/google';

type ItemData = {
  icon: string;
  title: string;
  description: string;
};

const data = [
  {
    icon: '/assets/images/beta/pages-icons-vector.svg',
    title: 'Capital Raising',
    description: 'Secure the funding you need to take your business to the next level..',
  },
  {
    icon: '/assets/images/beta/pages-icons-equity.svg',
    title: 'Equity',
    description: 'Find investors who believe in your vision and want to be a part of your journey.',
  },
  {
    icon: '/assets/images/beta/pages-icons-ic-users-group.svg',
    title: 'Partnerships',
    description: 'Connect with strategic allies who can help you expand and excel.',
  },
  {
    icon: '/assets/images/beta/pages-icon.svg',
    title: 'Startup Pitch',
    description:
      'Showcase your groundbreaking ideas and attract the right partners to bring them to life.',
  },
  {
    icon: '/assets/images/beta/pages-icons-ic-shopping-cart.svg',
    title: 'Business for Sale',
    description:
      "Whether you're ready to move on or acquire a new venture, Scaling is your marketplace.",
  },
  {
    icon: '/assets/images/beta/pages-icons-ic-star.svg',
    title: 'Opportunities  (coming soon)',
    description:
      'Discover exclusive offerings on products and services from solution providers that can take your business to new heights.',
  },
];

const Item = (props: ItemData) => {
  return (
    <Stack alignItems={'flex-start'}>
      <Box
        component={'img'}
        src={props.icon}
        height={'26px'}
        sx={{ fill: 'rgba(255, 214, 0, 1)' }}
      />
      <Typography
        sx={{
          marginTop: '8px',
          color: '#FFF',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '28px',
          fontFamily: 'Inter'
        }}
      >
        {props.title}
      </Typography>
      <Typography
        sx={{
          marginTop: '6px',
          color: 'var(--primary-contrast-text, #FFF)',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '22px',
        }}
      >
        {props.description}
      </Typography>
    </Stack>
  );
};

export const ReadyToScaleYourSuccess = ({ mdUp }: { mdUp: boolean }) => {
  return (
    <ColoredPart mdUp={mdUp}>
      <Stack gap={'72px'}>
        <Stack gap="16px">
          <Typography
            sx={{
              color: 'var(--primary-contrast-text, #FFF)',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '64px',
            }}
          >
            Ready to Scale Your Success?
          </Typography>
          <Typography
            sx={{
              color: '#FFD600',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: '24px',
            }}
          >
            Scaling offers a diverse suite of possibilities for SMEs
          </Typography>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: mdUp ? 'repeat(3, 1fr)' : '1fr',
            columnGap: 'calc( (100% - 320px * 3) / 2 )',
            rowGap: mdUp ? '54px' : '48px',
          }}
        >
          {data.map((item, index) => (
            <Item key={index} {...item} />
          ))}
        </div>
      </Stack>
    </ColoredPart>
  );
};
