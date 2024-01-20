import { Badge, Button, Stack } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Iconify } from 'mui-eazy';
import React, { useState } from 'react';
import { ConnectionChatModal } from 'src/app/account/connection/components/connection/connection-chat-popup';
import { useFlatInject } from 'src/service';
import { useTalkJSNotification } from 'src/service/talkjsProvider';

export const MessageNotificationItemList = () => {
  const { userInfo } = useFlatInject('authStore');
  const [oppositeUser, setOppositeUser] = useState<number | null>(null);

  const { count, messages } = useTalkJSNotification();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {userInfo && (
        <Badge badgeContent={count} color="primary">
          <Iconify
            icon="uiw:message"
            sx={{
              cursor: 'pointer',
            }}
            onClick={handleClick}
            color={count ? 'text.primary' : '#141414'}
          />
        </Badge>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {messages.map((message) => (
          <MenuItem
            onClick={() => {
              setOppositeUser(Number(message.lastMessage.senderId));
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                typography: 'subtitle2',
                backgroundColor:
                  message.lastMessage.senderId === oppositeUser ? 'GrayText' : '-moz-initial',
              }}
            >
              <span>
                {message.lastMessage.sender?.name
                  ? message.lastMessage.sender.name
                  : 'loading user'}
              </span>
              <span>{message.lastMessage.body}</span>
            </Stack>
          </MenuItem>
        ))}
        {oppositeUser === null ? null : (
          <div
            style={{
              marginTop: '10px',
            }}
          >
            <ConnectionChatModal oppositeUser={{ id: Number(oppositeUser) }} />
          </div>
        )}
      </Menu>
    </div>
  );
};
