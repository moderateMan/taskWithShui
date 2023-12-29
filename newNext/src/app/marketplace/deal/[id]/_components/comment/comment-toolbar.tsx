import { Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Iconify, useResponsive } from 'src/muiEazy';
import { useFlatInject } from 'src/service';
import { secondaryFont } from 'src/theme/typography';

// ----------------------------------------------------------------------
type Props = {
  sort: string;
  onChangeSort: (event: SelectChangeEvent) => void;
  onOpenForm: VoidFunction;
};

export default function ReviewToolbar({ sort, onChangeSort, onOpenForm }: Props) {
  const { dealDetail } = useFlatInject('ecommerceStore');
  const { comments, findByDealIDAct } = useFlatInject('commentStore');

  const mdUp = useResponsive('up', 'md');

  return (
    <Stack spacing={5} alignItems="center" direction="column" sx={{ mb: 5 }}>
      <Typography
        fontFamily={secondaryFont.style.fontStyle}
        sx={{
          color: '#14417D',
          fontSize: '24px',
          fontWeight: 700,
          fontStyle: 'normal',
          lineHeight: '48px',
          marginBottom: '80px',
        }}
      >
        {dealDetail && dealDetail.title + ' ' + 'Forum'}
      </Typography>

      <Stack
        direction={mdUp ? 'row' : 'column'}
        spacing={2}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Typography
          fontFamily={secondaryFont.style.fontStyle}
          sx={{
            color: '#232323',
            fontSize: '20px',
            fontWeight: 600,
            fontStyle: 'normal',
            lineHeight: '28px',
          }}
        >
          {comments.length} {comments.length > 1 ? 'Comments' : 'Comment'}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent={'flex-start'}>
          <Button
            variant="outlined"
            sx={{
              border: 'none',
              minWidth: '150px',
              padding: '11px 22px',
              background: 'var(--transparent-grey-8, rgba(145, 158, 171, 0.08))',
            }}
            endIcon={<Iconify icon="iconoir:nav-arrow-down" />}
            onClick={() => {
              if (dealDetail && dealDetail.id) {
                findByDealIDAct({
                  deal_id: dealDetail.id,
                });
              }
            }}
          >
            Most recent
          </Button>
          <Button
            variant="contained"
            sx={{
              padding: '11px 22px',
            }}
            onClick={onOpenForm}
          >
            Write a Review
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
