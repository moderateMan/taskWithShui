import { SelectChangeEvent, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ConnectionRequestListItem } from './connection-request-list-item';
import { ConnectionRequestedListItem } from './connection-requested-list-item';
import { useFlatInject } from 'src/service';
import useIsMobile from 'src/common/hooks/useIsMobile';
dayjs.extend(require('dayjs/plugin/relativeTime'));

export const ConnectionRequestsList = () => {
  const { userInfo } = useFlatInject('authStore');
  const {
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
    connectionRequestsQueryAct();
    connectionRequestedQueryAct();
  }, []);

  console.log('connectionRequests', connectionRequests);
  console.log('connectionRequested', connectionRequested);

  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={1}>
          {connectionRequests.map((item: any) => (
            <ConnectionRequestListItem {...item} />
          ))}
        </Stack>

        <Stack spacing={1}>
          {connectionRequested.map((item) => (
            <ConnectionRequestedListItem {...item} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};
