import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { Iconify } from 'src/muiEazy';
import { fShortenNumber } from 'src/common/utils/format-number';
import ReviewProgress from 'src/common/components/review-progress';

// ----------------------------------------------------------------------

type Props = {
  reviewNumber: number;
  ratingNumber: number;
  onOpenForm: VoidFunction;
};

export default function ReviewSummary({ reviewNumber, ratingNumber, onOpenForm }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 4, pr: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h1"> {ratingNumber}</Typography>

          <Stack spacing={0.5}>
            <Rating value={ratingNumber} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {fShortenNumber(reviewNumber)} reviews
            </Typography>
          </Stack>
        </Stack>

        <RadioGroup>
          <ReviewProgress />
        </RadioGroup>

        <Button
          size="large"
          fullWidth
          startIcon={<Iconify icon="carbon:edit" width={24} />}
          onClick={onOpenForm}
        >
          Write a Comment
        </Button>
      </Stack>
    </Paper>
  );
}
