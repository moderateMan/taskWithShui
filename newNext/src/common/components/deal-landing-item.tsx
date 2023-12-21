import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { memo } from 'react';
import Iconify from 'src/commonOld/components/iconify';
import Image from 'src/commonOld/components/image';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import { DealEntity, DealType } from 'src/types/deal';

// ----------------------------------------------------------------------

export const returnTypeBasedOnDealType = (dealType: DealType) => {
  switch (dealType) {
    case DealType.CAPITAL_RAISING:
      return 'Capital Raising';
    case DealType.EQUITY:
      return 'Equity';
    case DealType.PARTNERSHIPS:
      return 'Partnerships';
    case DealType.SELL_A_BUSINESS:
      return 'Sell a Business';
    case DealType.STARTUP_PITCH:
      return 'Startup Pitch';
  }
};

// ----------------------------------------------------------------------

type Props = {
  deal: DealEntity;
};

function DealItemLanding({ deal }: Props) {
  const { id, tags, title, logo, components } = deal;
  const { pics, video } = components || {};

  return (
    <Link underline="none" component={RouterLink} href={paths.registerCover} color="inherit">
      <Card
        sx={{
          width: '270px',
          ':hover': {
            boxShadow: '4px 4px 14px 0 rgb(0 0 0 / 5%)',
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pt: 1.5,
            pl: 2,
            pr: 1.5,
            top: 0,
            width: 1,
            zIndex: 9,
            position: 'absolute',
            height: '40px',
          }}
        >
          <Stack
            spacing={0.5}
            direction="row"
            alignItems={'center'}
            sx={{
              px: 1,
              borderRadius: 0.75,
              typography: 'subtitle2',
              bgcolor: '#14417D',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : '#14417D'),
            }}
          >
            <Box
              fontFamily={primaryFont.style.fontFamily}
              sx={{
                backgroundColor: '#14417D',
                color: 'white.100',
                mr: 0.5,
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '20px',
              }}
            >
              {returnTypeBasedOnDealType(deal.type)}
            </Box>
          </Stack>

          <Checkbox
            color="error"
            checked={false}
            onChange={(e) => {}}
            icon={<Iconify icon="carbon:favorite" />}
            checkedIcon={<Iconify icon="carbon:favorite-filled" />}
            sx={{ color: 'common.white' }}
          />
        </Stack>

        <Image alt={deal.title} src={pics ? pics[0] : 'N/A'} ratio="6/4" height={'100%'} />

        <Stack spacing={0.5} height="228px">
          <Stack
            direction={'column'}
            alignSelf={'stretch'}
            spacing={'8px'}
            sx={{ padding: '16px 20px 24px 20px' }}
          >
            <Stack direction={'row'} alignItems={'center'} gap={'8px'} alignSelf={'stretch'}>
              {deal.logo ? (
                <Avatar
                  sx={{
                    fontFamily: 'Inter',
                    height: '28px',
                    width: '28px',
                    fontSize: '28px',
                    backgroundColor: 'white',
                  }}
                  src={deal.logo}
                ></Avatar>
              ) : (
                <Avatar
                  sx={{
                    fontFamily: 'Inter',
                    backgroundColor: 'paper',
                    color: '#14417D',
                  }}
                >
                  {deal.title[0]}
                </Avatar>
              )}
              <Typography
                fontFamily={secondaryFont.style.fontFamily}
                fontSize={'20px'}
                fontStyle={'normal'}
                fontWeight={600}
                lineHeight={'28px'}
                color={'#14417D'}
                noWrap={true}
              >
                {deal.title}
              </Typography>
            </Stack>
            <Typography
              fontFamily={primaryFont.style.fontFamily}
              fontSize={'14px'}
              fontStyle={'normal'}
              fontWeight={400}
              lineHeight={'22px'}
              color={'#59745D'}
            >
              {deal.sub_title}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'hidden' }} />

        <Stack direction="row" alignItems="center" justifyContent={'space-between'} sx={{ p: 2.5 }}>
          <Stack
            spacing={0.5}
            direction="row"
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              px: 1,
              borderRadius: 0.75,
              typography: 'subtitle2',
              bgcolor: 'grey.300',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : '#14417D'),
            }}
          >
            <Box
              fontFamily={primaryFont.style.fontFamily}
              sx={{
                backgroundColor: 'grey.300',
                color: '#0C3024',
                mr: 0.5,
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '20px',
              }}
            >
              {deal.parent_category_name ? deal.parent_category_name : 'N/A'}
            </Box>
          </Stack>
          <Iconify icon="carbon:share" />
        </Stack>
      </Card>
    </Link>
  );
}

export default memo(DealItemLanding);
