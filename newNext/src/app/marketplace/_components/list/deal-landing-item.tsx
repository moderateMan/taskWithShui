import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Iconify } from 'mui-eazy';
import { memo } from 'react';
import Image from 'src/common/components/image';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import { DealEntity, DealType } from 'src/types/deal';
import { testData } from '../filters/deal-tab-selector';
import SvgColor from 'src/commonOld/components/svg-color';

// ----------------------------------------------------------------------

export const returnTypeBasedOnDealType = (dealType: DealType) => {
  const item = testData.find((i) => i.key === dealType);
  if (!item) return;
  return (
    <>
      <SvgColor
        src={item.icon}
        sx={{
          width: '14px',
          height: '14px',
        }}
      />
      {item.title}
    </>
  );
};

// ----------------------------------------------------------------------

type Props = {
  deal: DealEntity;
};

function DealItemLanding({ deal }: Props) {
  const { components } = deal;
  const { pics } = components || {};
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
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'text.primary'),
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '20px',
            }}
          >
            {returnTypeBasedOnDealType(deal.type)}
          </Stack>

          <Checkbox
            color="default"
            defaultChecked={deal.liked}
            onChange={(e) => {}}
            // icon={<Iconify icon="carbon:favorite" />}
            // checkedIcon={<Iconify icon="carbon:favorite-filled" />}
            icon={<Iconify icon="iconoir:bookmark" />}
            checkedIcon={<Iconify icon="iconoir:bookmark-solid" />}
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
            <Stack direction={'row'} gap={'8px'} alignSelf={'stretch'}>
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
                color={'#0C3024'}
                // noWrap={true}
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
            fontFamily={primaryFont.style.fontFamily}
            sx={{
              px: 1,
              borderRadius: 0.75,
              typography: 'subtitle2',
              bgcolor: 'grey.200',
              color: (theme) => (theme.palette.mode === 'light' ? 'text.primary' : 'common.white'),
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '20px',
            }}
          >
            {deal.prime_category_name}
          </Stack>
          <Iconify icon="carbon:share" color="common.black" />
        </Stack>
      </Card>
    </Link>
  );
}

export default memo(DealItemLanding);
