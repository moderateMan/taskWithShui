import Container from '@mui/material/Container';
import { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ReviewNewForm from 'src/common/components/review-new-form';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { useFlatInject } from 'src/service';
import ReviewList from './comment-list';
import ReviewToolbar from './comment-toolbar';

// ----------------------------------------------------------------------

export default function Comment() {
  const [sort, setSort] = useState('latest');
  const { comments, findByDealIDAct } = useFlatInject('commentStore');

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      findByDealIDAct({
        deal_id: parseInt(params.id),
      });
    }
  }, [params.id]);

  const formOpen = useBoolean();

  const handleChangeSort = useCallback((event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  }, []);

  return (
    <>
      <Container sx={{ overflow: 'hidden', pt: 10 }}>
        <Grid xs={12} md={7} lg={8}>
          <ReviewToolbar sort={sort} onChangeSort={handleChangeSort} onOpenForm={formOpen.onTrue} />
        </Grid>

        <Grid container spacing={8} direction="row-reverse">
          <Grid xs={12} md={12} lg={12}>
            <ReviewList comments={comments} />
          </Grid>
        </Grid>
      </Container>

      <ReviewNewForm open={formOpen.value} onClose={formOpen.onFalse} />
    </>
  );
}
