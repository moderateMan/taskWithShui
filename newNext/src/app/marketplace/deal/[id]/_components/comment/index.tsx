import Container from '@mui/material/Container';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { useCallback, useEffect, useState } from 'react';
import ReviewNewForm from 'src/common/components/review-new-form';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { useSearchParams } from 'src/routes/hooks';
import { useFlatInject } from 'src/service';
import ReviewList from './comment-list';
import ReviewToolbar from './comment-toolbar';

// ----------------------------------------------------------------------

export default function Comment() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState('latest');
  const { comments, currentDealId, setDealComentPagination, dealComentPagination } = useFlatInject('dealStore');
  const { pageCount, pageNum, pageSize } = dealComentPagination;
  const formOpen = useBoolean();
  const handleChangeSort = useCallback((event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  }, []);

  useEffect(() => {
    if (!currentDealId) return;
    let commentPlace = JSON.parse(searchParams.get('commentPlace')!);
    if (commentPlace) {
      document.getElementById('COMMENT')?.scrollIntoView()
    }
    setDealComentPagination({
      pageNum: commentPlace ? Math.ceil(Number(commentPlace) / pageSize) : 1
    })
  }, [currentDealId])

  return (
    <>
      <Container id="COMMENT" sx={{ overflow: 'hidden', pt: 10 }}>
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
      {pageCount > 0 && <Pagination
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
        onChange={(_, page) => {
          setDealComentPagination({ pageNum: page });
        }}
        page={pageNum}
        count={Math.ceil(pageCount / pageSize)}
      />}
    </>
  );
}
