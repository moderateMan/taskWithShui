import {
  Autocomplete,
  Divider,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ConnectionListItem } from './connection-list-item';
import { useFlatInject } from 'src/service';
import useIsMobile from 'src/common/hooks/useIsMobile';
import { secondaryFont } from 'src/theme/typography';
import { ConnectionRequestedListItem } from './connection-requested-list-item';

export const ConnectionList = () => {
  const { userInfo } = useFlatInject('authStore');
  // 这个inputValue局限于在本组件内部， 完全不会与外面的数据交互
  const [inputValue, setInputValue] = useState<string>('');

  const {
    connection,
    connectionQueryAct,
    connectionFilter,
    setConenctionFilter,
    connectionRequests,
    connectionRequested,
    connectionRequestsQueryAct,
    connectionRequestedQueryAct,
  } = useFlatInject('connectionStore');

  const [connection_sort, setConnection_sort] = useState<string>('latest');

  const handleSort = (event: SelectChangeEvent<string>) => {
    setConnection_sort(event.target.value as string);
  };

  const isMobile = useIsMobile();

  useEffect(() => {
    connectionQueryAct();
    connectionRequestedQueryAct();
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            value={connectionFilter}
            onChange={(event: any, newValue: string | null) => {
              if (newValue) {
                setConenctionFilter(newValue);
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log('newInputValue', newInputValue);
              setInputValue(newInputValue);
            }}
            options={connection.map((item: any) => {
              return `${item.first_name} ${item.last_name}`;
            })}
            renderInput={(params) => <TextField {...params} label="Search..." />}
            style={{ width: '100%' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
              }
            }}
          />
        </Stack>

        <Stack spacing={1}>
          {connection.map((item) => {
            if (connectionFilter) {
              return connectionFilter === `${item?.first_name} ${item?.last_name}` ? (
                <ConnectionListItem {...item} />
              ) : null;
            }
            return <ConnectionListItem {...item} />;
          })}
        </Stack>

        <Divider textAlign="center">
          <Typography
            color={'#637381'}
            fontSize={'12px'}
            fontWeight={480}
            fontStyle={'normal'}
            lineHeight={'22px'}
            fontFamily={secondaryFont.style.fontFamily}
          >
            Connection Requests
          </Typography>
        </Divider>

        <Stack spacing={1}>
          {connectionRequested.map((item) => (
            <ConnectionRequestedListItem {...item} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};
