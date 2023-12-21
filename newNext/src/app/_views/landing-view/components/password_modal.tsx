import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { useFlatInject } from 'src/service';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function PasswordModal() {
  const sessionPasswordToken = sessionStorage.getItem('auth');
  const [open, setOpen] = React.useState(sessionPasswordToken ? false : true);
  const handleClose = () => setOpen(false);
  const [passws, setPasswd] = useState('');
  const { landing_temp_password } = useFlatInject('authStore');

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        disableEscapeKeyDown={false}
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Input your password
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={2}
            alignContent={'center'}
            mt="20px"
          >
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={passws}
              size="small"
              onChange={(e) => {
                setPasswd(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (passws == landing_temp_password) {
                  sessionStorage.setItem('auth', 'true');
                  handleClose();
                }
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
