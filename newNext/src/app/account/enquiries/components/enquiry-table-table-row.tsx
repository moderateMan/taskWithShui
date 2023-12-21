import { useCallback, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Iconify from 'src/commonOld/components/iconify';
import Label from 'src/commonOld/components/label';
import { Card } from '@mui/material';
import React from 'react';
import { fCurrency } from 'src/commonOld/utils/format-number';
import { fDate } from 'src/commonOld/utils/format-time';
import { IUserEnquiry, UserEnquiryStatus } from 'src/service/model';

// ----------------------------------------------------------------------

type Props = {
  row: Partial<IUserEnquiry>;
  selected: boolean;
  onSelectRow: VoidFunction;
};

export default function EnquiryTableRow({ row, onSelectRow, selected }: Props) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const inputStyles = {
    pl: 1,
    [`&.${inputBaseClasses.focused}`]: {
      bgcolor: 'action.selected',
    },
  };

  // For enquiry detail
 const [anchorEl, setAnchorEl] = React.useState<EventTarget & HTMLLIElement | null>(null);

  const handleDetailClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDetailClose = () => {
    setAnchorEl(null);
  };

  const openDetail = Boolean(anchorEl);
  const id = openDetail ? 'detail-popover' : undefined;



  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={row.id} sx={inputStyles} />
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={row.opportunity_name} sx={inputStyles} />
        </TableCell>

        <TableCell>{fDate(row.created_at || '')}</TableCell>

        <TableCell sx={{ px: 1 }}>
          <InputBase value={fCurrency(row?.opportunity_scaling_price || "")} sx={inputStyles} />
        </TableCell>

        <TableCell>
          <Label
            color={
              (row.status === UserEnquiryStatus.FINISHED && 'success') ||
              (row.status === UserEnquiryStatus.PENDING && 'warning') ||
              (row.status === UserEnquiryStatus.CONNECTED && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" padding="none">
          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        id='detail-popover'
        open={openDetail}
        anchorEl={anchorEl}
        onClose={handleDetailClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Card>
          <div>{ row.content}</div>
        </Card>
      </Popover>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 160 },
          },
        }}
      >
        <MenuItem onClick={(e) => handleDetailClick(e)}>
          <Iconify icon="carbon:view" sx={{ mr: 1 }} /> View
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Popover>
    </>
  );
}
