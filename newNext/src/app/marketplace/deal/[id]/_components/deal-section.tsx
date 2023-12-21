import { Divider, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Markdown from 'src/commonOld/components/markdown';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import { IDealGeneralComponent } from 'src/types/deal';
import Gallery from 'src/common/components/gallery';

// ----------------------------------------------------------------------

type Props = { data: IDealGeneralComponent };

export default function DealSection({ data }: Props) {
  const { image = [], title = '', content = '', description, sub_title, name } = data;
  return (
    <Stack
      spacing={4}
      sx={{
        py: { xs: 5, md: 2 },
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="h3"
          fontFamily={secondaryFont.style.fontFamily}
          sx={{
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '28px',
            color: '#14417D',
            marginBottom: '16px',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h4"
          fontFamily={secondaryFont.style.fontFamily}
          sx={{
            color: 'var(--text-primary, #14417D)',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '28px',
          }}
        >
          {title}
        </Typography>

        <Typography
          fontFamily={primaryFont.style.fontFamily}
          sx={{
            color: 'var(--text-primary, #14417D)',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            fontSize: '16px',
          }}
        >
          {sub_title}
        </Typography>
        {/* <Grid xs={12} md={8}>
          <Markdown
            sx={{
              width: '60%',
            }}
            content={content}
          />
          <Gallery images={[...image, ...image]} />
        </Grid> */}
      </Stack>
      <Divider
        sx={{
          marginBottom: '60px',
        }}
      />
    </Stack>
  );
}
