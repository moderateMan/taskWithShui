'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Tab, Tabs } from '@mui/material';
import { useCallback, useState } from 'react';
import { ConnectionList } from './components/connection/connection-list';
import { ConnectionRequestsList } from './components/connection/connection-request-list';

const TABS = ['My Connections', 'My Requests'];

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export default function UserConnectionViewIndex() {
  const [tabSelect, setTabSelect] = useState('My Connections');
  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setTabSelect(newValue);
  }, []);

  // todo: now working on
  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Connection
      </Typography>

      <Tabs
        value={tabSelect}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleTabChange}
        style={{
          marginBottom: '20px',
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab} value={tab} label={tab} />
        ))}
      </Tabs>

      <CustomTabPanel value={tabSelect} index={'My Connections'}>
        <ConnectionList />
      </CustomTabPanel>

      <CustomTabPanel value={tabSelect} index={'My Requests'}>
        <ConnectionRequestsList />
      </CustomTabPanel>
    </>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}
