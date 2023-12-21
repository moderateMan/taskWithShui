import { Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useResponsive } from 'mui-eazy';
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
          fontSize: '32px',
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
            fontSize: '24px',
            fontWeight: 600,
            fontStyle: 'normal',
            lineHeight: '36px',
          }}
        >
          {comments.length} {comments.length > 1 ? 'Comments' : 'Comment'}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent={'flex-start'}>
          <Button
            variant="outlined"
            sx={{
              minWidth: '150px',
            }}
            onClick={() => {
              if (dealDetail && dealDetail.id) {
                findByDealIDAct({
                  deal_id: dealDetail.id,
                });
              }
            }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            sx={{
              minWidth: '150px',
            }}
            onClick={onOpenForm}
          >
            Write a Comment
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
