import { Avatar, Theme, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { memo } from 'react';
import Image from 'src/common/components/image';
import { RouterLink } from 'src/routes/components';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import { DealEntity } from 'src/types/deal';
import { returnTypeBasedOnDealType } from './deal-landing-item';
import { Iconify, useResponsive } from 'mui-eazy';
import { useFlatInject } from 'src/service';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import NProgress from 'nprogress';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

type Props = {
  deal: DealEntity;
};

function DealItemMarket({ deal }: Props) {
  const { id, tags, title, logo, components } = deal;
  const { pics, video } = components || {};
  const mdUp = useResponsive('up', 'md');
  const { likeDealAct } = useFlatInject('ecommerceStore');
  console.log('deal', deal);
  const liked = useBoolean(deal.liked);
  const router = useRouter();

  return (
    // <Link underline="none" component={RouterLink} href={`/marketplace/deal/${id}`} color="inherit">
    <Card
      sx={{
        width: mdUp ? '270px' : 'calc(100vw - 32px)',
        ':hover': {
          boxShadow: '4px 4px 14px 0 rgb(0 0 0 / 5%)',
        },
        cursor: 'pointer',
      }}
      onClick={() => {
        NProgress.start();
        router.push(`/marketplace/deal/${id}`);
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
          fontFamily={primaryFont.style.fontFamily}
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
          checked={liked.value}
          onChange={async () => {
            const success = await likeDealAct({
              id,
            });
            if (success) {
              liked.onToggle();
            }
          }}
          onClick={(e) => e.stopPropagation()}
          // icon={<Iconify icon="carbon:favorite" />}
          // checkedIcon={<Iconify icon="carbon:favorite-filled" />}
          icon={<Iconify icon="iconoir:bookmark" />}
          checkedIcon={<Iconify icon="iconoir:bookmark-solid" />}
          sx={{ color: 'common.white' }}
        />
      </Stack>

      <Image alt={deal.title} src={pics ? pics[0] : 'N/A'} ratio="6/4" />

      <Box height="248px">
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
              color={'text.primary'}
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
            width={'230px'}
            // noWrap={true}
          >
            {deal.sub_title}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'hidden' }} />

        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
            sx={{
              p: 2.5,
            }}
          >
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
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'text.primary' : 'common.white',
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
        </Box>
      </Box>
    </Card>
    // </Link>
  );
}

export default memo(DealItemMarket);
