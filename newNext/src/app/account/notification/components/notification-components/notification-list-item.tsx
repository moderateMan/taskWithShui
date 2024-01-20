import { Box, Button, Stack, Typography } from '@mui/material';
import myDay from 'src/common/myDay';
import useIsMobile from 'src/common/hooks/useIsMobile';
import { useRouter } from 'src/routes/hooks';
import { dp, useFlatInject } from 'src/service';
import { INotification, NotificationType } from 'src/service/stores/notificationStore/model';
import { secondaryFont } from 'src/theme/typography';
import { paths } from 'src/routes/paths';
import { Modal, useBoolean } from 'src/muiEazy';

export interface NotificationListItemProps extends INotification { }

export const NotificationListItem = (props: NotificationListItemProps) => {
  const isMobile = useIsMobile();
  const isShowSubmitModal = useBoolean()
  const { notificationDeleteAct, notificationReadAct } = useFlatInject('notificationStore');
  const { notification_type, comment_place, notification_type_source_id } = props;
  const router = useRouter()
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
        if (notification_type == NotificationType.MEMBER_DEAL_COMMENT) {
          router.push(`${paths.marketplace.deal}/${notification_type_source_id}?commentPlace=${comment_place}`)
        } else if (notification_type == NotificationType.MEMBER_DEAL_PUBLISHED) {
          isShowSubmitModal.onTrue()
        }
        notificationReadAct({ id: props.id });
      }}
    >
      <Stack direction={'column'} spacing={1}>
        <Typography
          width={isMobile ? '100%' : '180px'}
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
          width={isMobile ? '100%' : '450px'}
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
          ' ' + myDay(props.created_at).fromNow()
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
      <Modal
        openFlag={isShowSubmitModal}
        title={''}
        actionConfig={[]}
        handleClose={() => {
        }}
        content={() => {
          return (
            <Box>
              <Typography
                sx={{
                  color: 'var(--Scaling-Blue, #256CCB)',
                  textAlign: 'center',
                  fontSize: '32px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '48px',
                  mb: '8px',
                }}
                textAlign={'center'}
              >
                Congrats!
              </Typography>
              <Typography
                sx={{
                  color: 'var(--Scaling-Black, #141414)',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: '48px',
                  mb: '8px',
                }}
              >
                Your Deal has been published.
              </Typography>
              <Typography
                sx={{
                  color: 'var(--Scaling-Grey2, #696969)',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                  mb: '8px',
                }}
              >
                Your Deal is now visible on the Scaling Marketplace.
                Share with your friends and network!
              </Typography>
              <Stack
                sx={{
                  mt: '32px',
                }}
                justifyContent={'center'}
                direction={'row'}
              >
                <Button
                  sx={{
                    margin: '0 12px',
                  }}
                  variant="contained"
                  onClick={() => {
                    router.push(`${paths.marketplace.share}/${notification_type_source_id}`)
                  }}
                >
                  Share your deal
                </Button>
                <Button
                  sx={{
                    margin: '0 12px',
                  }}
                  onClick={() => {
                    router.push(paths.root)
                  }}
                >
                  View on Scaling
                </Button>
              </Stack>
            </Box>
          );
        }}
      />
    </Stack>
  );
};

const ReactionButton = (props: any) => { };
