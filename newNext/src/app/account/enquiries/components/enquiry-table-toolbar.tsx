import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/commonOld/components/iconify';

// ----------------------------------------------------------------------

interface Props {
  rowCount: number;
  numSelected: number;
  onSelectAllRows: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EquiryTableToolbar({
  rowCount,
  numSelected,
  onSelectAllRows,
}: Props) {
  if (!numSelected) {
    return null;
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        pr: 2,
        pl: 1,
        top: 0,
        left: 0,
        width: 1,
        zIndex: 9,
        height: 58,
        borderRadius: 1,
        position: 'absolute',
        bgcolor: 'text.primary',
        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
      }}
    >
      <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllRows}
        inputProps={{
          'aria-label': 'select all desserts',
        }}
      />

      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
        {numSelected} selected
      </Typography>

      <Tooltip title="Delete">
        <IconButton color="inherit">
          <Iconify icon="carbon:trash-can" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
