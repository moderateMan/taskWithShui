import { SelectChangeEvent, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import useIsMobile from 'src/common/hooks/useIsMobile';
import { useFlatInject } from 'src/service';
import { ConnectionRequestListItem } from './connection-request-list-item';
import { ConnectionRequestedListItem } from './connection-requested-list-item';


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
      </Stack>
    </>
  );
};
