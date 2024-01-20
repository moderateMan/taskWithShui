import { Stack } from '@mui/material';
import { talkjs_token } from 'configs';
import { useEffect, useRef, useState } from 'react';
import useIsMobile from 'src/common/hooks/useIsMobile';
import { useFlatInject } from 'src/service';
import Talk from 'talkjs';

export interface ConnectionChatProps {
  oppositeUser: {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    welcomeMessage: string;
    role?: string;
  };
}

export const ConnectionChatBox = (props: ConnectionChatProps) => {
  const isMobile = useIsMobile();
  const [chatBoxLoaded, setChatBoxLoaded] = useState<boolean>(false);
  const { userInfo } = useFlatInject('authStore');
  const chatboxEl = useRef(null);

  useEffect(() => {
    if (userInfo) {
      // initiate local user
      const localUser = new Talk.User({
        id: userInfo.id.toString(),
        name: userInfo.first_name || userInfo.email,
        email: userInfo.email,
        photoUrl: userInfo?.metadata?.avatar || 'https://demo.talkjs.com/img/11.jpg',
        welcomeMessage: 'Hey, how can I help?',
        role: 'default',
      });

      // initiate opposite user
      const oppositeUser = new Talk.User({
        id: props.oppositeUser.id,
        name: props.oppositeUser.name,
        email: props.oppositeUser.email,
        photoUrl: props.oppositeUser.photoUrl,
        welcomeMessage: props.oppositeUser.welcomeMessage,
        role: 'default',
      });

      Talk.ready.then(() => {
        setChatBoxLoaded(true);

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
        chatbox.mount(chatboxEl.current);

        return () => session.destroy();
      });
    }
  }, []);

  return (
    <Stack>
      <div
        ref={chatboxEl}
        style={{
          height: ' 800px',
        }}
      />
    </Stack>
  );
};

const ReactionButton = (props: any) => {};
