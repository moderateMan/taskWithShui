import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { debounce } from 'lodash-es';
import { Iconify } from 'src/muiEazy';
import { memo, useCallback } from 'react';
import Image from 'src/common/components/image';
import { fCurrency } from 'src/common/utils/format-number';
import TextMaxLine from 'src/commonOld/components/text-max-line';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import { IOpportunity } from 'src/service/model';

// ----------------------------------------------------------------------

type Props = {
  opportunity: IOpportunity;
};

function TravelTourItem({ opportunity }: Props) {
  const {
    title: slug,
    scalingPrice: price,
    marketPrice: priceSale,
    wished: favorited = false,
    pics,
    id,
  } = opportunity || {};

  const { opportunityWishAct } = useFlatInject('opportunityStore');
  const isF = useBoolean(favorited);

  const handleChangeFavorite = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
      isF.onToggle();
      opportunityWishAct({
        id,
      });
    },
    []
  );

  return (
    <Link component={RouterLink} href={paths.travel.tour + '?id=' + id} color="inherit">
      <Card
        sx={{
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
          }}
        >
          <Stack
            spacing={0.5}
            direction="row"
            sx={{
              px: 1,
              borderRadius: 0.75,
              typography: 'subtitle2',
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            }}
          >
            {priceSale > 0 && (
              <Box
                sx={{
                  color: 'grey.500',
                  textDecoration: 'line-through',
                  mr: 0.5,
                }}
              >
                {fCurrency(priceSale)}
              </Box>
            )}
            {fCurrency(price)}
          </Stack>

          <Checkbox
            color="error"
            checked={isF.value}
            onChange={(e) =>
              debounce(() => {
                handleChangeFavorite(e, id);
              }, 1000)()
            }
            icon={<Iconify icon="carbon:favorite" />}
            checkedIcon={<Iconify icon="carbon:favorite-filled" />}
            sx={{ color: 'common.white' }}
          />
        </Stack>

        <Image alt={slug} src={pics?.[0]} ratio="1/1" />

        <Stack spacing={0.5} sx={{ p: 2.5 }}>
          <TextMaxLine variant="h6" persistent>
            {slug}
          </TextMaxLine>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" sx={{ p: 2.5 }}>
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
}

export default memo(TravelTourItem);
