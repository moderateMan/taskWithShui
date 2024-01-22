import { Box, Stack, Typography } from '@mui/material';
import { secondaryFont, primaryFont } from 'src/theme/typography';
import { ColoredPart } from './colored-part';

export const ForAnyone = ({ mdUp }: { mdUp: boolean }) => {
  const titleStyle = {
    color: '#FFD600',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '24px',
  };

  const subtitleStyle = {
    color: 'var(--primary-contrast-text, #FFF)',
    fontSize: mdUp ? '48px' : '24px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: mdUp ? '64px' : '36px',
  };

  const descriptionStyle = {
    color: 'var(--common-white, #FFF)',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px',
  };

  const imageStyle = {
    width: '550px',
    height: '550px',
    zIndex: 1,
    objectFit: 'cover',
    borderRadius: '16px',
  };

  return (
    <>
      <ColoredPart mdUp={mdUp}>
        <Stack columnGap={'56px'} direction={mdUp ? 'row' : 'column'} justifyContent={'space-between'} rowGap={'56px'}>
          <Box component={'img'} src={'/assets/icons/Img_Course_S.6.png'} sx={imageStyle} />
          <Stack gap={'24px'} flex={1}>
            <Typography fontFamily={secondaryFont.style.fontFamily} sx={titleStyle}>
              For SME Owners and Investors.
            </Typography>
            <Typography fontFamily={secondaryFont.style.fontFamily} sx={subtitleStyle}>
              Discover a platform where you can share and explore opportunities at no cost.
            </Typography>
            <Typography fontFamily={primaryFont.style.fontFamily} sx={descriptionStyle}>
              Seeking capital funding? Exploring equity options? Pitching your startup idea?
              Searching for strategic partnerships? Looking to sell your business?
            </Typography>
            <Typography fontFamily={primaryFont.style.fontFamily} sx={descriptionStyle}>
              Scaling empowers you to post your deals and connect with a diverse community of
              like-minded individuals. It's your space to grow, innovate, and make impactful
              decisions.
            </Typography>
          </Stack>
        </Stack>
      </ColoredPart>
      <ColoredPart mdUp={mdUp} style={{ marginTop: mdUp ? '-120px' : '-56px' }}>
        <Stack
          direction={mdUp ? 'row' : 'column-reverse'}
          justifyContent={'space-between'}
          rowGap={'56px'}
          columnGap={'56px'}
        >
          <Stack gap={'24px'} flex={1}>
            <Typography fontFamily={secondaryFont.style.fontFamily} sx={titleStyle}>
              For Partners
            </Typography>
            <Typography fontFamily={secondaryFont.style.fontFamily} sx={subtitleStyle}>
              Discover a platform where you can share and explore opportunities at no cost.
            </Typography>
            <Typography fontFamily={primaryFont.style.fontFamily} sx={descriptionStyle}>
              As a partner, you'll gain access to a dynamic ecosystem of SMEs ready to engage.
              Showcase your expertise, products, and services to a targeted audience.
            </Typography>
            <Typography fontFamily={primaryFont.style.fontFamily} sx={descriptionStyle}>
              Unlock the potential for collaboration, growth, and a broader reach. Scaling is your
              bridge to a thriving SME community.
            </Typography>
          </Stack>
          <Box
            component={'img'}
            src={'/assets/images/beta/pages-marketing-home-4.jpg'}
            sx={imageStyle}
          />
        </Stack>
      </ColoredPart>
    </>
  );
};
