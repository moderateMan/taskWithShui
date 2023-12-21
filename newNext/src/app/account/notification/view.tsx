'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFlatInject } from 'src/service';
import { NotificationListItem } from './components/notification-components/notification-list-item';


// ----------------------------------------------------------------------

const notification_sort_option = [
  {
    value: 'latest',
    label: 'Latest',
  },
];

// ----------------------------------------------------------------------

export default function UserNotificationView() {
  const { userInfo } = useFlatInject('authStore');
  const { notification, count, notificationQueryAct } = useFlatInject('notificationStore');
  const [notification_sort, setNotification_sort] = useState<string>('latest');

  const handleSort = (event: SelectChangeEvent<string>) => {
    setNotification_sort(event.target.value as string);
  };

  useEffect(() => {
    notificationQueryAct();
  }, []);

  // todo: now working on
  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Notifications
      </Typography>

      <Stack spacing={3}>
        {/* <Select fullWidth value={notification_sort} onChange={handleSort}>
          {notification_sort_option.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select> */}

        <Stack spacing={1}>
          {notification.map((item) => (
            <NotificationListItem {...item} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
