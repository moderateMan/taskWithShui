import { Avatar, Checkbox, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import ProductPrice from 'src/common/components/product-price';
import { useFlatInject } from 'src/service';
import Iconify from 'src/commonOld/components/iconify';
import Image from 'src/commonOld/components/image';
import Label from 'src/commonOld/components/label';
import { useResponsive } from 'src/commonOld/hooks/use-responsive';
import { customFormat } from 'src/commonOld/utils/format-time';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import DealConnectionMaker from './deal-details-connection-maker';
import ShareMenu from './deal-details-share';

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
}: Props) {
  const mdUp = useResponsive('up', 'md');

  const { likeDealAct } = useFlatInject('ecommerceStore');

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
        <Stack direction={'row'}>
          {logo ? (
            <Image
              sx={{
                marginRight: '12px',
              }}
              src={logo}
              height={'40px'}
            ></Image>
          ) : (
            <Avatar>{}</Avatar>
          )}
          <Typography
            fontFamily={primaryFont.style.fontStyle}
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
          <ProductPrice price={price} sx={{ fontSize: '48px', fontWeight: 700 }} />
          <Typography
            variant="caption"
            sx={{ color: '#59745D', fontSize: '18px', fontWeight: '600' }}
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
            sx={{
              color: '#14417D',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '48px' /* 150% */,
            }}
          >
            {expireTime ? customFormat(dayjs(expireTime)) : ''}
          </Typography>
          <Typography
            sx={{
              color: '#272727',
            }}
            variant="subtitle2"
          >
            Deal posted
          </Typography>
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
          <Typography
            sx={{
              color: '#14417D',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '48px' /* 150% */,
            }}
          >
            {expireTime ? `${dayjs(expireTime).diff(dayjs(), 'day')} days` : ''}
          </Typography>
          <Typography
            sx={{
              color: '#272727',
            }}
            variant="subtitle2"
          >
            Left to invest
          </Typography>
        </Grid>
      </Grid>

      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }}>
        <DealConnectionMaker name={name} deal_id={deal_id} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

      <Stack spacing={3} direction="row" justifyContent={{ xs: 'center', md: 'unset' }}>
        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Checkbox
            onClick={() => {
              likeDealAct({
                id: deal_id,
              });
            }}
            checked={liked}
            onChange={(e) => {}}
            icon={<Iconify icon="ph:bookmark-duotone" />}
            checkedIcon={
              <Iconify
                icon="ph:bookmark-fill"
                onClick={() => {
                  likeDealAct({
                    id: deal_id,
                  });
                }}
              />
            }
            sx={{ color: 'primary' }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          {/* <Iconify icon="carbon:share" sx={{ mr: 1 }} /> Share */}
          <ShareMenu />
        </Stack>
      </Stack>
    </>
  );
}
