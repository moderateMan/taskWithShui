import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IOpportunity } from 'src/service/model';
import Image from 'src/commonOld/components/image';
import { fCurrency } from 'src/commonOld/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  opportunity: IOpportunity;
  wishlist: boolean;
};

export default function WisListItem({ opportunity, wishlist }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Image
          src={opportunity.pics[0]}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2">{opportunity.title}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Geo Coverage: {opportunity.geo_scope} <br />
            Geo detail: {opportunity.state}
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: 300, overflow: 'hidden' }} px={2}>
        <Typography variant="subtitle2">{opportunity.title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {opportunity.scalingPriceDesc}
        </Typography>
      </Stack>

      <Stack sx={{ width: 120, typography: 'subtitle2' }}>
        {' '}
        {fCurrency(opportunity.scalingPrice)}{' '}
      </Stack>

      {/* <IconButton>
        <Iconify icon="carbon:trash-can" />
      </IconButton>

      {wishlist && (
        <IconButton>
          <Iconify icon="mdi:application-edit" />
        </IconButton>
      )} */}
    </Stack>
  );
}
