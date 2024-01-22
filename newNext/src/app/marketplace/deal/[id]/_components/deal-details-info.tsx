import { Avatar, Button, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';
import { returnTypeBasedOnDealType } from 'src/common/components/deal-landing-item';
import ProductPrice from 'src/common/components/product-price';
import myDay from 'src/common/myDay';
import Iconify from 'src/commonOld/components/iconify';
import Label from 'src/commonOld/components/label';
import { customFormat } from 'src/commonOld/utils/format-time';
import { usePathname, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import { DealType } from 'src/types/deal';
import DealConnectionMaker from './deal-details-connection-maker';
import ShareMenu from './deal-details-share';
import Head from 'next/head';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  { label: '#FA541C', value: 'red' },
  { label: '#754FFE', value: 'violet' },
  { label: '#00B8D9', value: 'cyan' },
  { label: '#36B37E', value: 'green' },
];

const MEMORY_OPTIONS = [
  { label: '128GB', value: '128gb' },
  { label: '256GB', value: '256gb' },
  { label: '512GB', value: '512gb' },
  { label: '1TB', value: '1tb' },
];

// ----------------------------------------------------------------------

type Props = {
  name: string;
  price?: number;
  desc: string;
  expireTime: Date | string;
  logo: string | undefined;
  tags: string[] | undefined;
  deal_id: number;
  liked: boolean;
  type: DealType;
};

export default function DealDetailsInfo({
  name,
  price,
  expireTime,
  desc,
  logo,
  tags,
  deal_id,
  liked,
  type,
}: Props) {
  const pathName = usePathname();
  const { userInfo } = useFlatInject('authStore');
  const previewFlag = pathName.includes('preview');
  const shareFlag = pathName.includes('share');
  const router = useRouter();
  const { likeDealAct } = useFlatInject('dealStore');
  const [color, setColor] = useState('red');
  const [memory, setMemory] = useState('128gb');
  const handleChangeColor = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColor((event.target as HTMLInputElement).value);
  }, []);

  const handleChangeMemory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMemory((event.target as HTMLInputElement).value);
  }, []);

  return (
    <>
      {tags ? (
        <Stack direction={'row'} spacing={1}>
          {tags.map((tag) => {
            return (
              <Label key={tag} variant="filled" color="success" sx={{ mb: 3 }}>
                {tag}
              </Label>
            );
          })}
        </Stack>
      ) : (
        <Label variant="filled" color="success" sx={{ mb: 3 }}>
          No Tags Available
        </Label>
      )}

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Stack
          spacing={0.5}
          direction="row"
          alignItems={'center'}
          fontFamily={primaryFont.style.fontFamily}
          width="fit-content"
          sx={{
            px: 1,
            borderRadius: 0.75,
            typography: 'subtitle2',
            bgcolor: '#256CCB14',
            color: (theme) => (theme.palette.mode === 'light' ? 'text.primary' : 'common.white'),
            fontSize: '12px',
            fontStyle: 'normal',
            lineHeight: '20px',
            fontWeight: 400,
            mb: '24px',
          }}
        >
          {returnTypeBasedOnDealType(type)}
        </Stack>
        <Head>
          <meta property="og:title" content={name} key="title" />
          <meta property="og:description" content={desc} key="description" />
        </Head>
        <Stack direction={'row'}>
          {logo ? <img src={logo} height={'40px'} width={'40px'}></img> : <Avatar>{}</Avatar>}
          <Typography
            fontFamily={secondaryFont.style.fontFamily}
            sx={{
              color: '#141414',
              fontSize: '32px',
              fontWeight: 700,
              ml: 1.5,
            }}
          >
            {name}
          </Typography>
        </Stack>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '16px' }}>
            {desc}
          </Typography>
        </Stack>
      </Stack>

      {price && (
        <Stack spacing={2}>
          <ProductPrice
            price={price}
            sx={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#14417D',
              fontFamily: secondaryFont.style.fontFamily,
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: '#696969', fontSize: '18px', fontWeight: '600' }}
          >
            Ask price
          </Typography>
        </Stack>
      )}
      <Grid
        container
        justifyContent="space-between"
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={'center'}
        sx={{
          mb: 2,
          mt: 2,
        }}
      >
        <Grid item xs={12} md={5} lg={5}>
          <Typography
            fontFamily={secondaryFont.style.fontFamily}
            sx={{
              color: '#14417D',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '48px' /* 150% */,
            }}
          >
            {expireTime ? customFormat(myDay(expireTime)) : ''}
          </Typography>
          <Typography variant="subtitle2" color="#696969" fontWeight={400}>
            Deal posted
          </Typography>
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
          <Typography
            fontFamily={secondaryFont.style.fontFamily}
            sx={{
              color: '#14417D',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '48px' /* 150% */,
            }}
          >
            {expireTime ? `${myDay(expireTime).diff(myDay(), 'day')} days` : ''}
          </Typography>
          <Typography color="#696969" fontWeight={400} variant="subtitle2">
            Left to invest
          </Typography>
        </Grid>
      </Grid>

      <Stack
        onClick={() => {
          if (shareFlag && !userInfo) {
            router.push(paths.loginCover);
          }
        }}
        spacing={2}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
      >
        <DealConnectionMaker name={name} deal_id={deal_id} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

      <Stack spacing={3} direction="row" justifyContent={{ xs: 'center', md: 'unset' }}>
        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Button
            disabled={previewFlag}
            onClick={() => {
              if (shareFlag && !userInfo) {
                router.push(paths.loginCover);
              } else {
                likeDealAct({
                  id: deal_id,
                });
              }
            }}
            sx={{ fontSize: '16px', lineHeight: '22px', fontWeight: 400 }}
            startIcon={
              liked ? (
                <Iconify icon="iconoir:bookmark-solid" />
              ) : (
                <Iconify icon="iconoir:bookmark" />
              )
            }
          >
            Wishlist
          </Button>
        </Stack>

        {!previewFlag && (
          <Stack
            onClick={() => {
              if (shareFlag && !userInfo) {
                router.push(paths.loginCover);
              }
            }}
            direction="row"
            alignItems="center"
            sx={{ typography: 'subtitle2' }}
          >
            <ShareMenu deal_id={deal_id} deal_name={name} />
          </Stack>
        )}
      </Stack>
    </>
  );
}
