import { Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import useIsMobile from 'src/common/hooks/useIsMobile';
import { useFlatInject } from 'src/service';
import { INotification } from 'src/service/stores/notificationStore/model';
import { secondaryFont } from 'src/theme/typography';
dayjs.extend(require('dayjs/plugin/relativeTime'));

export interface NotificationListItemProps extends INotification {}

export const NotificationListItem = (props: NotificationListItemProps) => {
  const isMobile = useIsMobile();
  const { notificationDeleteAct, notificationReadAct } = useFlatInject('notificationStore');

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={{ xs: 1, sm: 4, md: 4 }}
      p={'10px 20px 10px 20px'}
      alignItems={isMobile ? 'flex-start' : 'center'}
      sx={{
        minHeight: '102px',
        backgroundColor: props.is_read ? '#F4F6F8' : '#daf0e1',
        borderRadius: '10px',
        '&:hover': { boxShadow: '0px 0px 2px 0px gray' },
      }}
      onClick={() => {
        notificationReadAct({ id: props.id });
      }}
    >
      <Stack direction={'column'} spacing={1}>
        <Typography
          width={isMobile ? '100%' : '250px'}
          fontFamily={secondaryFont.style.fontFamily}
          color={'#14417D'}
          fontSize={'14px'}
          fontWeight={700}
          fontStyle={'normal'}
        >
          {props.title}
        </Typography>
        <Typography
          color={'#637381'}
          fontSize={'12px'}
          fontWeight={400}
          fontStyle={'normal'}
          lineHeight={'22px'}
          width={isMobile ? '100%' : '650px'}
          fontFamily={secondaryFont.style.fontFamily}
        >
          {props?.content}
        </Typography>
      </Stack>

      <Typography
        color={'#637381'}
        fontSize={'12px'}
        fontWeight={400}
        fontStyle={'normal'}
        lineHeight={'22px'}
        width={isMobile ? '100%' : '100px'}
        fontFamily={secondaryFont.style.fontFamily}
      >
        {
          // @ts-ignore
          ' ' + dayjs(props.created_at).fromNow()
        }
      </Typography>
      <Stack
        direction={'row'}
        spacing={1}
        justifyContent={'flex-end'}
        width={isMobile ? '100%' : '80px'}
      >
        <Button
          variant="text"
          onClick={() => {
            notificationDeleteAct({ id: props.id });
          }}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

const ReactionButton = (props: any) => {};
