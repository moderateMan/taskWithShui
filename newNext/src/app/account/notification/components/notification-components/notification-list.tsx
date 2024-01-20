import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import myDay from 'src/common/myDay';
import useIsMobile from 'src/common/hooks/useIsMobile';
import { INotification } from 'src/service/model';
import { primaryFont } from 'src/theme/typography';


export interface NotificationListItemProps extends INotification {}

export const ConnectionListItem = (props: NotificationListItemProps) => {
  const isMobile = useIsMobile();

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={{ xs: 8, sm: 8, md: 24 }}
      p={'10px 16px 10px 40px'}
      alignItems={isMobile ? 'flex-start' : 'space-between'}
      sx={{
        backgroundColor: '#F4F6F8',
        borderRadius: '10px',
        '&:hover': { boxShadow: '0px 0px 2px 0px gray' },
      }}
    >
      <Stack direction={'row'} spacing={3}>
        <Avatar
          sizes="100px"
          src={'https://gravatar.com/avatar/14a5dee0881c252fb02c7dd9849046e5?s=400&d=robohash&r=x'}
          alt="tester-005"
        />

        <Stack direction={'column'} spacing={1}>
          <Typography
            color={'#14417D'}
            fontSize={'14px'}
            fontWeight={700}
            fontStyle={'normal'}
            fontFamily={primaryFont.style.fontFamily}
          >
            {props.title}
          </Typography>
          <Typography
            color={'#637381'}
            fontSize={'12px'}
            fontWeight={700}
            fontStyle={'normal'}
            fontFamily={primaryFont.style.fontFamily}
            width={isMobile ? '150px' : '450px'}
          >
            {
              // @ts-ignore
              'Connected' + ' ' + 'since' + ' ' + myDay(props.created_at).fromNow()
            }
          </Typography>
        </Stack>
      </Stack>

      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Button variant="contained" endIcon={<Icon icon={'material-symbols:send'} />}>
          Message
        </Button>
        <Box
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <Icon icon={'tabler:dots'} />
        </Box>
      </Stack>
    </Stack>
  );
};

const ReactionButton = (props: any) => {};
