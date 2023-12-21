'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import UserPersonalView from './views/user-personal-view';
import UserProfileCompany from './views/user-profile-company';
import UserProfileEnquiryView from './views/user-profile-enquiries-view';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

// ----------------------------------------------------------------------

const TABS = [
  'My Information',
  // 'My Enquiry',
  'My Companies',
  // 'Comments',
  // 'Feedback'
];

export default function EcommerceAccountIndexView() {
  // TAB 处理逻辑
  const [tab, setTab] = React.useState('My Information');
  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Account
      </Typography>
      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
        style={{
          marginBottom: '20px',
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab} value={tab} label={tab} />
        ))}
      </Tabs>

      <CustomTabPanel value={tab} index={'My Information'}>
        <UserPersonalView />
      </CustomTabPanel>

      <CustomTabPanel value={tab} index={'My Enquiry'}>
        <UserProfileEnquiryView />
      </CustomTabPanel>

      <CustomTabPanel value={tab} index={'My Companies'}>
        <UserProfileCompany />
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
