import { Avatar, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { TextFieldTooltip } from 'src/common/components/tooltip';
import notify from 'src/common/utils/notify';
import Iconify from 'src/commonOld/components/iconify';
import SvgColor from 'src/commonOld/components/svg-color';
import { useResponsive } from 'src/commonOld/hooks/use-responsive';
import { usePathname } from 'src/routes/hooks';
import { useFlatInject } from 'src/service';
import { primaryFont, secondaryFont } from 'src/theme/typography';

export default function DealConnectionMaker({ name, deal_id }: { name: string; deal_id: number }) {
  const { connectionRequestAct, connection, connectionQueryAct } =
    useFlatInject('connectionStore');
  const { dealDetail } = useFlatInject('dealStore');
  const { userInfo } = useFlatInject('authStore');
  const [connected, setConnected] = React.useState<boolean>(false);
  const [current_user_ownDeal, setCurrentUserOwnDeal] = React.useState<boolean>(false);
  const pathName = usePathname();
  const previewFlag = pathName.includes('preview');
  const shareFlag = pathName.includes('share');
  const mdUp = useResponsive('up', 'md');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [note, setNote] = React.useState<string>('');

  React.useEffect(() => {
    connectionQueryAct();
    console.log('connection triggered', connection);

    if (connection && dealDetail && userInfo) {
      const isConnected = connection?.find(
        (item) => item?.connected_user_id === dealDetail?.user_id
      );

      const isCurrentUserOwnDeal = userInfo?.id === dealDetail?.user_id;

      if (isCurrentUserOwnDeal) {
        setCurrentUserOwnDeal(true);
      } else {
        setCurrentUserOwnDeal(false);
      }

      if (isConnected) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    }
  }, [userInfo]);

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Button
        fullWidth={!mdUp}
        size="large"
        color="inherit"
        variant="contained"
        disabled={connected || current_user_ownDeal || previewFlag || shareFlag}
        onClick={() => {
          handleOpen();
        }}
        sx={{
          width: '100%',
          mt: 5,
          background: 'text.primary',
        }}
        startIcon={
          <SvgColor
            src="/assets/icons/ic_users_group.svg"
            color="#FFD600"
            sx={{
              height: '22px',
              width: '22px',
            }}
          />
        }
      >
        {connected ? `Already Connected` : `Connect with ${name}`}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: mdUp ? '590px' : '100%',
            height: 'auto',
            bgcolor: 'background.paper',
            boxShadow: '5px 5px 10px rgba(0,0,0,0.2)',
            borderRadius: '16px',
            border: '1px solid #14417D',
            p: 4,
          }}
        >
          <Iconify
            icon="mdi:close"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}
          />

          <Stack spacing={'40px'} justifyContent={'center'} width={'100%'}>
            <Stack
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              spacing={'10px'}
              marginTop={'20px'}
            >
              <Avatar
                src={userInfo?.metadata?.avatar}
                alt="N/A"
                sx={{
                  width: '114px',
                  height: '114px',
                }}
              />
              <img
                src={
                  'https://fileservicescaling.s3.ap-southeast-2.amazonaws.com/website_media_pic/Frame+171.png'
                }
                alt="connector"
                height="20px"
              />
              <Avatar
                src={dealDetail?.logo || ''}
                alt="N/A"
                sx={{
                  width: '114px',
                  height: '114px',
                }}
              />
            </Stack>
            <Stack>
              <Typography
                fontFamily={secondaryFont.style.fontFamily}
                fontSize={'32px'}
                lineHeight={'48px'}
                fontWeight={700}
                textAlign={'center'}
                color={'#14417D'}
              >
                Connect with {dealDetail?.title}
              </Typography>
              <Typography
                fontFamily={primaryFont.style.fontFamily}
                fontSize={'16px'}
                lineHeight={'24px'}
                fontWeight={400}
                textAlign={'center'}
                color={'#6A6A6A'}
              >
                {dealDetail?.sub_title}
              </Typography>
            </Stack>
            <Stack spacing={'5px'}>
              <TextField
                multiline
                value={note}
                maxRows={4}
                minRows={4}
                variant="outlined"
                placeholder="Enter the message here"
                label={'Message for connection request'}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
              <TextFieldTooltip text="200 characters max" />
            </Stack>

            <Stack direction={'row'} spacing="10px" justifyContent={'center'}>
              <Button
                fullWidth={!mdUp}
                size="large"
                color="inherit"
                variant="contained"
                onClick={() => {
                  if (!note || !dealDetail?.user_id) {
                    alert('Please leave your notes');
                  } else {
                    connectionRequestAct({
                      note,
                      target_user_id: dealDetail?.user_id,
                      deal_name: dealDetail.title,
                    }).then(() => {
                      notify.success('Connection request sent');
                      setNote('');
                      handleClose();
                    });
                  }
                }}
                sx={{
                  width: mdUp ? '40%' : '100%',
                }}
              >
                Send message
              </Button>
              <Button
                fullWidth={!mdUp}
                size="large"
                color="inherit"
                variant="outlined"
                onClick={() => {
                  setNote('');
                  handleClose();
                }}
                sx={{
                  width: mdUp ? '40%' : '100%',
                }}
              >
                Cancel request
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
