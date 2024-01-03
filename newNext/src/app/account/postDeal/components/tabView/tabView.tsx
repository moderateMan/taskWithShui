import { SxProps, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Iconify, uuidv4 } from 'src/muiEazy';
import { TabViewItem, TabViewPanelProps, TabViewProps } from './types';
export function TabView({ tabs, tabId, handleTabChange, errorResult, ...rest }: TabViewProps) {
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
        onChange={handleChangeTab}
        style={{
          marginBottom: '20px',
        }}
        {...rest}
        value={tabId}
      >
        {tabViewValue.map(({ id, label }, index) => (
          <Tab
            icon={
              (errorResult[index - 1] === false && (
                <Iconify color={'red'} icon="material-symbols:error" width={20} />
              )) || (
                <Box
                  sx={{
                    width: 0,
                  }}
                ></Box>
              )
            }
            iconPosition="end"
            key={label || id}
            value={id}
            label={label}
          />
        ))}
      </Tabs>
      {tabViewValue.map(({ id, node }) => {
        return (
          <CustomTabPanel value={tabId} index={id!} key={id!}>
            {node}
          </CustomTabPanel>
        );
      })}
    </>
  );
}

function CustomTabPanel(props: TabViewPanelProps) {
  const { children, value, index, ...other } = props;
  let sxTemp: SxProps = value === index ? {} : { display: 'none' };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ py: 3, ...sxTemp }}>{children}</Box>
    </div>
  );
}
