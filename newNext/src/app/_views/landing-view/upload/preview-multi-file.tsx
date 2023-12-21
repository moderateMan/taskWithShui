import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import { FileThumbnail } from '../file-thumbnail';
import { Iconify } from '../iconify';
import { Box } from '@mui/material';
import { UploadProps } from './types';

// ----------------------------------------------------------------------

export default function MultiFilePreview({ fileNameList, onRemove, sx }: UploadProps) {
  return (
    <Box>
      {fileNameList?.map((file) => {
        return (
          <Stack
            key={file}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              my: 1,
              py: 1,
              px: 1.5,
              borderRadius: 1,
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
              ...sx,
            }}
          >
            <FileThumbnail file={file} />

            <ListItemText
              primary={file}
              secondary={''}
              secondaryTypographyProps={{
                component: 'span',
                typography: 'caption',
              }}
            />

            {onRemove && (
              <IconButton
                size="small"
                onClick={() => {
                  onRemove(file);
                }}
              >
                <Iconify icon="mingcute:close-line" width={16} />
              </IconButton>
            )}
          </Stack>
        );
      })}
    </Box>
  );
}
