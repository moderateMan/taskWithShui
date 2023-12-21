import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import Crop from './crop';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({
  open,
  setOpen,
  name,
  src,
  onComplete,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  onComplete: (file: File) => void;
  src: string;
  name: string;
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const ref = React.useRef(() => {});

  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Crop image
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Crop name={name} src={src} callRef={ref} onComplete={onComplete}></Crop>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              ref.current?.();
              handleClose();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
