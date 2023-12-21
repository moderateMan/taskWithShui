import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Card1, { Card1Post } from './card-1';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { secondaryFont, primaryFont } from 'src/theme/typography';
import { Iconify, useResponsive } from 'mui-eazy';

function Section3({ posts }: { posts: Card1Post[] }) {
  const mdUp = useResponsive('up', 'md');

  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={paths.eLearning.posts}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      View All
    </Button>
  );

  return (
    <Container
      sx={{
        py: { xs: 10, md: 15 },
        backgroundColor: 'rgba(54, 179, 126, 0.08)',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        sx={{
          mb: { xs: 8, md: 10 },
        }}
      >
        <Typography variant="h3">Scaling newsfeed</Typography>

        {mdUp && viewAllBtn}
      </Stack>

      {mdUp ? (
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {posts
            .slice(0, 3)
            .map((post) =>
              mdUp ? <Card1 key={post.id} post={post} /> : <Card1 key={post.id} post={post} />
            )}
        </Box>
      ) : (
        <MobileView posts={posts} />
      )}

      {!mdUp && (
        <Stack alignItems="center" sx={{ mt: 8 }}>
          {viewAllBtn}
        </Stack>
      )}
    </Container>
  );
}

export default Section3;

const MobileView = ({ posts }: { posts: Card1Post[] }) => {
  return (
    <Stack spacing={3}>
      {posts.map((post) => (
        <Stack direction={'row'} spacing={3}>
          <Box
            component={'img'}
            src={post.heroUrl}
            width={'80px'}
            height={'80px'}
            borderRadius={'5px'}
          ></Box>
          <Stack alignContent={'space-between'} height={'100%'}>
            <Typography
              fontFamily={secondaryFont.style.fontFamily}
              fontSize={'17px'}
              fontWeight={600}
              lineHeight={'26px'}
              color={'#14417D'}
              noWrap={true}
            >
              {post.title}
            </Typography>
            <Typography
              fontFamily={primaryFont.style.fontFamily}
              fontSize={'12px'}
              fontWeight={400}
              lineHeight={'18px'}
              color={'#9FAF9E'}
            >
              {post.createdAt.toISOString().split('T')[0]}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
