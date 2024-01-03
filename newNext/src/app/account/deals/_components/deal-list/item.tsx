import { Divider, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Iconify, Image } from 'src/muiEazy';
import { DealEntity, DealStatus } from 'src/types/deal';
import CustomPopover, { usePopover } from '../custom-popover';
import dayjs from 'dayjs';
import { DealStatistics } from 'src/service/stores/dealStore/model';
import { renewalCaculator } from 'src/common/utils/renewal-caculator';
import { useFlatInject } from 'src/service';

// ----------------------------------------------------------------------

type Props = {
  itemData: DealEntity;
  wishlist: boolean;
  handleAction?: (params: DealEntity) => void;
  handleRenewal?: (params: DealEntity) => void;
  statistic: DealStatistics;
};

export default function EcommerceCartItem({
  itemData,
  wishlist,
  handleAction,
  handleRenewal,
  statistic,
}: Props) {
  const popover = usePopover();
  const {} = useFlatInject('dealStore');

  console.log('itemData', itemData);

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
          src={itemData.logo || ''}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2" textOverflow={'clip'} width={160}>
            {itemData.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {itemData.sub_title}
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: 90 }}>
        <Typography variant="subtitle2">
          {itemData.expire_at ? dayjs(itemData.expire_at).format('DD/MM/YYYY') : 'N/A'}
        </Typography>
      </Stack>
      <Stack sx={{ width: 90 }}>
        <Typography variant="subtitle2">{statistic?.view}</Typography>
      </Stack>
      <Stack sx={{ width: 90 }}>
        <Typography variant="subtitle2">{statistic?.click}</Typography>
      </Stack>
      <Stack sx={{ width: 75 }}>
        <Typography variant="subtitle2">{statistic?.liked}</Typography>
      </Stack>

      {DealStatusPatch(itemData.status)}

      <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleAction?.(itemData);
          }}
        >
          <Iconify icon="basil:edit-solid" />
          Edit
        </MenuItem>
        {itemData.status === DealStatus.ACTIVE && (
          <MenuItem
            // expire date is less than 5 days
            disabled={
              itemData.expire_at ? dayjs(itemData.expire_at).diff(dayjs(), 'day') > 5 : false
            }
            onClick={() => {
              handleRenewal?.(itemData);
            }}
          >
            <Iconify icon="ic:baseline-autorenew" />
            Renew
          </MenuItem>
        )}
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={() => {}} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Archive
        </MenuItem>
      </CustomPopover>
      {wishlist && (
        <IconButton>
          <Iconify icon="carbon:shopping-cart-plus" />
        </IconButton>
      )}
    </Stack>
  );
}

const DealStatusPatch = (dealStatus: DealStatus) => {
  switch (dealStatus) {
    case DealStatus.ACTIVE:
      return (
        <Stack sx={{ width: 120, typography: 'subtitle2' }}>
          <Typography variant="subtitle2" color={'green'}>
            Active
          </Typography>
        </Stack>
      );
      break;
    case DealStatus.DRAFTING:
      return (
        <Stack sx={{ width: 120, typography: 'subtitle2' }}>
          <Typography variant="subtitle2" color={'textGrey'}>
            Drafting
          </Typography>
        </Stack>
      );
      break;
    case DealStatus.PENDING:
      return (
        <Stack sx={{ width: 120, typography: 'subtitle2' }}>
          <Typography variant="subtitle2" color={'textGrey'}>
            Pending
          </Typography>
        </Stack>
      );
      break;
    case DealStatus.REJECTED:
      return (
        <Stack sx={{ width: 120, typography: 'subtitle2' }}>
          <Typography variant="subtitle2" color={'red'}>
            Rejected
          </Typography>
        </Stack>
      );
      break;
    case DealStatus.DEACTIVATED:
      return (
        <Stack sx={{ width: 120, typography: 'subtitle2' }}>
          <Typography variant="subtitle2" color={'error.main'}>
            Expired
          </Typography>
        </Stack>
      );

    default:
      break;
  }
};
