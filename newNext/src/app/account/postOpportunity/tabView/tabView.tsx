import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { useCallback, useLayoutEffect, useState } from 'react';
import { TabViewItem, TabViewPanelProps, TabViewProps } from './types';
import { uuidv4 } from 'src/muiEazy';

export function TabView({ tabs, tabId, handleTabChange, ...rest }: TabViewProps) {
  // TAB 处理逻辑
  const [tabViewValue, setTabs] = useState<TabViewItem[]>([]);
  const handleChangeTab = useCallback((_: any, newValue: string) => {
    handleTabChange(newValue);
  }, []);

  useLayoutEffect(() => {
    const temp: TabViewItem[] = [];
    tabs.forEach((item, index) => {
      let tempItem: TabViewItem = {} as TabViewItem;
      temp.push(tempItem);
      if (!item.id) {
        temp[index].id = uuidv4();
      }
      Object.assign(temp[index], item);
    });
    // temp[0].id && handleTabChange?.(temp[0].id);
    setTabs(temp);
  }, [tabs]);
  return (
    <>
      <Tabs
        scrollButtons={false}
        onChange={handleChangeTab}
        style={{
          marginBottom: '20px',
        }}
        {...rest}
        value={tabId}
      >
        {tabViewValue.map(({ id, label }) => (
          <Tab key={label || id} value={id} label={label} />
        ))}
      </Tabs>
      {tabViewValue.map(({ id, node }) => (
        <CustomTabPanel value={tabId} index={id!} key={id!}>
          {node}
        </CustomTabPanel>
      ))}
    </>
  );
}

function CustomTabPanel(props: TabViewPanelProps) {
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
