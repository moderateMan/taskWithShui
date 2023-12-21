'use client';

import { InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { _productsTable } from 'src/_mock';
import { getComparator, stableSort } from 'src/common/utils';
import Iconify from 'src/commonOld/components/iconify';
import Scrollbar from 'src/commonOld/components/scrollbar';
import { useFlatInject } from 'src/service';
import { UserEnquiryStatus } from 'src/service/model';
import { QueryUserEnquiryRequest } from 'src/service/model/model';
import EnquiryTableHead from './components/enquiry-table-table-head';
import EnquiryTableRow from './components/enquiry-table-table-row';
import EquiryTableToolbar from './components/enquiry-table-toolbar';

// ----------------------------------------------------------------------

const TABS_new = [
  {
    value: 'All Enquiry',
    label: 'All Enquiry',
  },
  {
    value: UserEnquiryStatus.CONNECTED,
    label: 'Connected',
  },
  {
    value: UserEnquiryStatus.FINISHED,
    label: 'Finished',
  },
  {
    value: UserEnquiryStatus.CLOSED,
    label: 'Closed',
  },
  {
    value: UserEnquiryStatus.ARCHIVED,
    label: 'Archived',
  },
  {
    value: UserEnquiryStatus.PENDING,
    label: 'Pending',
  },
];

const TimeRange = [
  {
    lable: 'All Time',
    value: [
      new Date(new Date().setFullYear(new Date().getFullYear() - 10)).toISOString(),
      new Date().toISOString(),
    ],
  },
  {
    lable: 'Last week',
    value: [
      new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
      new Date().toISOString(),
    ],
  },
  {
    lable: 'Last month',
    value: [
      new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
      new Date().toISOString(),
    ],
  },
  {
    lable: 'Last 3 months',
    value: [
      new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString(),
      new Date().toISOString(),
    ],
  },
  {
    lable: 'Last 6 months',
    value: [
      new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString(),
      new Date().toISOString(),
    ],
  },
];

export const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 100 },
  { id: 'opportunity_name', label: 'Opportunity' },
  { id: 'created_at', label: 'Create Date', width: 160 },
  { id: 'opportunity_scaling_price', label: 'Price', width: 100 },
  { id: 'status', label: 'Status', width: 100 },
];

// ----------------------------------------------------------------------

export default function UserProfileEnquiryView() {
  const [searchParams, setSearchParams] = useState<Partial<QueryUserEnquiryRequest>>({
    include_deleted: false,
  });
  const { totalCount, user_enquiry, enquiriesFindByUserAct } = useFlatInject('user_enquiryStore');

  useEffect(() => {
    enquiriesFindByUserAct(searchParams);
  }, [searchParams]);

  const [tab, setTab] = useState('All Enquiry');

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [orderBy, setOrderBy] = useState('orderId');

  const [selected, setSelected] = useState<number[]>([]);

  const [page, setPage] = useState(0);

  const [dense, setDense] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  }, []);

  const handleSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const handleSelectAllRows = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // const newSelected = _productsTable.map((n) => n.id);
      const newSelected = user_enquiry.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, []);

  const handleSelectRow = useCallback(
    (id: number) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: number[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Enquiries
      </Typography>

      <Tabs
        value={TABS_new[0].value}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {TABS_new.map((category) => (
          <Tab key={category.value} value={category.value} label={category.label} />
        ))}
      </Tabs>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 5, mb: 3 }}>
        <TextField
          onChange={(event) => {
            setSearchParams({
              ...searchParams,
              opportunity_name: event.target.value,
            });
          }}
          hiddenLabel
          placeholder="Search by opportunity partner name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="carbon:search" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems="center">
          <InputLabel id="time-range">Select Time Period</InputLabel>
          <Select
            id="time-range"
            placeholder="Select the time period"
            label="Time Period"
            defaultValue={TimeRange[0].value}
            onChange={(event) => {
              console.log(event.target.value);
              setSearchParams({
                ...searchParams,
                created_at: event.target.value as [string, string],
              });
            }}
            sx={{
              width: 300,
            }}
          >
            {TimeRange.map((option, key) => (
              <MenuItem key={key} value={option.value}>
                {option.lable}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <TableContainer
        sx={{
          overflow: 'unset',
          [`& .${tableCellClasses.head}`]: {
            color: 'text.primary',
          },
          [`& .${tableCellClasses.root}`]: {
            bgcolor: 'background.default',
            borderBottomColor: (theme) => theme.palette.divider,
          },
        }}
      >
        <EquiryTableToolbar
          rowCount={_productsTable.length}
          numSelected={selected.length}
          onSelectAllRows={handleSelectAllRows}
        />

        <Scrollbar>
          <Table
            sx={{
              minWidth: 720,
            }}
            size={dense ? 'small' : 'medium'}
          >
            <EnquiryTableHead
              order={order}
              orderBy={orderBy}
              onSort={handleSort}
              headCells={TABLE_HEAD}
              rowCount={_productsTable.length}
              numSelected={selected.length}
              onSelectAllRows={handleSelectAllRows}
            />

            <TableBody>
              {stableSort(user_enquiry, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <EnquiryTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => handleSelectRow(row.id)}
                    />
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  sx={{
                    height: (dense ? 36 : 57) * emptyRows,
                  }}
                >
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          page={page}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}

const DetailEnquiryView = () => {};
