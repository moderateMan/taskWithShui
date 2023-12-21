import { Avatar, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { IConnection } from 'src/service/model';
import { secondaryFont } from 'src/theme/typography';
import { ConnectionChatModal } from './connection-chat-popup';
import useIsMobile from 'src/common/hooks/useIsMobile';
dayjs.extend(require('dayjs/plugin/relativeTime'));

export interface ConnectionListItemProps extends IConnection {}

export const ConnectionListItem = (props: ConnectionListItemProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={{ xs: 1, sm: 4, md: 4 }}
        p={'10px 20px 10px 20px'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        sx={{
          minHeight: '102px',
          backgroundColor: '#F4F6F8',
          borderRadius: '10px',
          '&:hover': { boxShadow: '0px 0px 2px 0px gray' },
        }}
      >
        {props?.connected_user_avatar ? (
          <Avatar sizes="100px" src={props?.connected_user_avatar} alt="tester-005" />
        ) : (
          <Avatar sizes="100px" alt="tester-005">
            {props?.first_name ? props?.first_name[0] : 'N/A'}
          </Avatar>
        )}
        <Typography
          width={isMobile ? '100%' : '150px'}
          fontFamily={secondaryFont.style.fontFamily}
          color={'#14417D'}
          fontSize={'14px'}
          fontWeight={700}
          fontStyle={'normal'}
        >
          {props?.first_name + ' ' + props?.last_name}
        </Typography>
        <Stack direction={'column'} spacing={1} minWidth={isMobile ? '100%' : '200px'}>
          <Typography
            color={'#637381'}
            fontSize={'14px'}
            fontWeight={600}
            fontStyle={'normal'}
            lineHeight={'22px'}
            fontFamily={secondaryFont.style.fontFamily}
          >
            {props?.title ? props?.title : 'User title not available'}
          </Typography>
          <Typography
            color={'#637381'}
            fontSize={'12px'}
            fontWeight={400}
            fontStyle={'normal'}
            lineHeight={'22px'}
            fontFamily={secondaryFont.style.fontFamily}
          >
            {
              // @ts-ignore
              'Connected' + ' ' + 'since' + ' ' + dayjs(props.created_at).fromNow()
            }
          </Typography>
        </Stack>

        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <ConnectionChatModal
            oppositeUser={{
              id: props.connected_user_id,
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};
