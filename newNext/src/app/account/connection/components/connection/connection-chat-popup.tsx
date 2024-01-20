import { Box, Button, Modal, Stack } from '@mui/material';
import { talkjs_token } from 'configs';
import React, { useEffect, useRef, useState } from 'react';
import useIsMobile from 'src/common/hooks/useIsMobile';
import Iconify from 'src/commonOld/components/iconify';
import { useFlatInject } from 'src/service';
import Talk from 'talkjs';

// styling of the modal
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '15%',
  boxRadius: '10px',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface ConnectionChatProps {
  oppositeUser: {
    id: number;
  };
}

export const ConnectionChatModal = (props: ConnectionChatProps) => {
  const isMobile = useIsMobile();
  const [chatBoxLoaded, setChatBoxLoaded] = useState<boolean>(false);
  const { userInfo } = useFlatInject('authStore');
  const { user_talkjs, userQueryByIDAct } = useFlatInject('userStore');
  const chatboxEl = useRef(null);

  // modal controll
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = async () => {
    setChatBoxLoaded(false);
    await userQueryByIDAct(props.oppositeUser.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (userInfo && user_talkjs) {
      // initiate local user
      const localUser = new Talk.User({
        id: userInfo.id.toString(),
        name: userInfo.first_name || userInfo.email,
        email: userInfo.email,
        photoUrl: userInfo?.metadata?.avatar || 'https://demo.talkjs.com/img/11.jpg',
        welcomeMessage: 'Hey, Let us start to make a deal',
        role: 'default',
      });

      // initiate opposite user
      const oppositeUser = new Talk.User({
        id: props.oppositeUser.id,
        name: user_talkjs.first_name || user_talkjs.email,
        email: user_talkjs.email,
        photoUrl: user_talkjs.avatar || null,
        welcomeMessage: 'Hello world',
        role: 'default',
      });
      Talk.ready.then(() => {
        // initiate talk session
        const session = new Talk.Session({
          appId: talkjs_token,
          me: localUser,
        });

        // initiate conversation
        const conversation_id = Talk.oneOnOneId(localUser, oppositeUser);
        const converation = session.getOrCreateConversation(conversation_id);
        // set the participants of this conversation
        converation.setParticipant(localUser);
        converation.setParticipant(oppositeUser);

        // initiate chatbox
        const chatbox = session.createChatbox();
        chatbox.select(converation);

        // mount chatbox
        chatbox.mount(chatboxEl.current).then(() => {
          setChatBoxLoaded(true);
        });
        return () => session.destroy();
      });
    }
  }, [userInfo, open]);

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={{ width: '200px' }}>
        Message
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop
        sx={{
          border: 'none',
        }}
      >
        <>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              bottom: isMobile ? '0px' : '20px',
              right: isMobile ? '0px' : '20px',
              boxRadius: '10px',
              width: isMobile ? '100vw' : '400px',
              border: 'none',
              p: isMobile ? 1 : 0,
            }}
          >
            <Stack justifyContent={'flex-end'}>
              {chatBoxLoaded && (
                <Iconify
                  icon={'mdi:close'}
                  onClick={handleClose}
                  fontSize={isMobile ? '60px' : '40px'}
                  sx={{
                    position: 'absolute' as 'absolute',
                    top: '20px',
                    right: '20px',
                    cursor: 'pointer',
                  }}
                />
              )}
              <div
                ref={chatboxEl}
                style={{
                  height: ' 800px',
                }}
              ></div>
            </Stack>
          </Box>
        </>
      </Modal>
    </>
  );
};

const ReactionButton = (props: any) => { };
