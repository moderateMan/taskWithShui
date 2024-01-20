import { Session, useSession, useUnreads } from '@talkjs/react';
import { talkjs_token } from 'configs';
import { useCallback, useEffect, useState } from 'react';
import Talk from 'talkjs';

interface IUserTalkJSSession {
  children: React.ReactNode;
  user: { id: number; name: string; email: string; photoUrl: string };
}

export function useTalkJSSession(props: IUserTalkJSSession) {
  const syncUser = useCallback(
    () =>
      // regular TalkJS JavaScript code here
      new Talk.User({
        id: props.user.id.toString(),
        name: props.user.name,
        photoUrl: props.user.photoUrl,
        email: props.user.email,
      }),
    []
  );

  return (
    <Session appId={talkjs_token} syncUser={syncUser}>
      {props.children}
    </Session>
  );
}

export function useTalkJSNotification() {
  const unreads = useUnreads(); // Talk.UnreadConversation[] | undefined

  return {
    count: unreads ? unreads.length : 0,
    messages: unreads ? unreads : []
  };
}
