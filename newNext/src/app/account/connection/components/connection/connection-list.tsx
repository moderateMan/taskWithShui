import { Autocomplete, SelectChangeEvent, Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ConnectionListItem } from './connection-list-item';
import { useFlatInject } from 'src/service';
import useIsMobile from 'src/common/hooks/useIsMobile';
dayjs.extend(require('dayjs/plugin/relativeTime'));

export const ConnectionList = () => {
  const { userInfo } = useFlatInject('authStore');
  // 这个inputValue局限于在本组件内部， 完全不会与外面的数据交互
  const [inputValue, setInputValue] = useState<string>('');

  const { connection, connectionQueryAct, connectionFilter, setConenctionFilter } =
    useFlatInject('connectionStore');

  const [connection_sort, setConnection_sort] = useState<string>('latest');

  const handleSort = (event: SelectChangeEvent<string>) => {
    setConnection_sort(event.target.value as string);
  };

  const isMobile = useIsMobile();

  useEffect(() => {
    connectionQueryAct();
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
          {/* <Select
            variant="filled"
            labelId="connection-sort"
            id="connection-sort"
            value={connection_sort}
            onChange={handleSort}
            label="Sort by"
          >
            {connection_sort_option.map((item) => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
          </Select> */}
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
      </Stack>
    </>
  );
};
