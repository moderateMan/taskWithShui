import styled from '@emotion/styled';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import useIsMobile from 'src/common/hooks/useIsMobile';
import { useFlatInject } from 'src/service';
import { IConnection } from 'src/service/model';
import { primaryFont, secondaryFont } from 'src/theme/typography';
dayjs.extend(require('dayjs/plugin/relativeTime'));

export interface ConnectionRequestListItemProps extends IConnection {}

export const ConnectionRequestedListItem = (props: ConnectionRequestListItemProps) => {
  const isMobile = useIsMobile();
  const { connectionAcceptAct } = useFlatInject('connectionStore');

  return (
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
      <Avatar sizes="100px" alt="tester-005">
        {props?.first_name ? props?.first_name[0] : 'N/A'}
      </Avatar>
      <Typography
        width={'150px'}
        color={'#14417D'}
        fontSize={'14px'}
        fontWeight={700}
        fontStyle={'normal'}
        fontFamily={primaryFont.style.fontFamily}
      >
        {props?.first_name + ' ' + props?.last_name}
      </Typography>
      <Stack direction={'column'} spacing={1} minWidth={'300px'}>
        <Typography
          color={'#637381'}
          fontSize={'14px'}
          fontWeight={400}
          fontStyle={'normal'}
          lineHeight={'22px'}
          fontFamily={secondaryFont.style.fontFamily}
          width={isMobile ? '100%' : '180px'}
          textOverflow={'wrap'}
        >
          {'Notes:' + ' ' + props?.note}
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
            'Connection Request Sent' + ' ' + dayjs(props.created_at).fromNow()
          }
        </Typography>
      </Stack>

      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <CustomisedButton
          variant="contained"
          onClick={() => {
            connectionAcceptAct({ connection_id: props.id });
          }}
        >
          Accept Request
        </CustomisedButton>
        <Button
          variant="outlined"
          onClick={() => {
            connectionAcceptAct({ connection_id: props.id });
          }}
        >
          Ignore Request
        </Button>
      </Stack>
    </Stack>
  );
};

const CustomisedButton = styled(Button)({
  boxShadow: 'none',
  height: '30px',
  minWidth: '130px',
  textTransform: 'none',
  fontSize: 13,
  padding: '4px 10px 4px 10px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#14417D',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#14417D',
    borderColor: '#0062cc',
    boxShadow: '0px 1px 1px 1px gray',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});
