import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'src/commonOld/components/image';
import TextMaxLine from 'src/commonOld/components/text-max-line';
import { fDate } from 'src/commonOld/utils/format-time';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------
export interface Card1Post {
  id: string;
  title: string;
  heroUrl: string;
  tags?: string[];
  createdAt: Date;
  category: string;
  coverUrl: string;
  duration: string;
  favorited: boolean;
  description: string;
  author: {
    avatarUrl: string;
    name: '';
  };
}
type Props = {
  post: Card1Post;
};

export default function Card1({ post }: Props) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Image src={post.coverUrl} alt={post.title} ratio="1/1" />

      <Stack direction="row" spacing={3} sx={{ p: 3 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2">{fDate(post.createdAt, 'MMM')}</Typography>

          <Divider sx={{ mt: 1, mb: 0.5 }} />

          <Typography variant="h3">{fDate(post.createdAt, 'dd')}</Typography>
        </Stack>

        <Stack spacing={1}>
          <Link component={RouterLink} href={paths.eLearning.post} color="inherit">
            <TextMaxLine variant="h6" persistent>
              {post.title}
            </TextMaxLine>
          </Link>

          <TextMaxLine variant="body2" persistent color="text.secondary">
            {post.description}
          </TextMaxLine>

          <Stack spacing={1.5} direction="row" alignItems="center" sx={{ pt: 1.5 }}>
            <Avatar src={post.author.avatarUrl} sx={{ width: 40, height: 40 }} />
            <Stack>
              <Typography variant="body2">{post.author.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {post.duration}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
