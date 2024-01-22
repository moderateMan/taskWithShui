import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { useResponsive } from 'src/muiEazy';
import Iconify from 'src/commonOld/components/iconify';
import { useFlatInject } from 'src/service';

export default function SearchMain() {
  const { searchData, setSeachParams, setMarketListPageNum } = useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');
  return (
    <InputBase
      onChange={(e) => {
        setSeachParams(e.target.value);
      }}
      value={searchData}
      fullWidth
      placeholder={mdUp ? 'Search By keyword or Industry' : 'Search'}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          setMarketListPageNum(1);
        }
      }}
      startAdornment={
        <InputAdornment position="start">
          <Iconify width={24} icon="tabler:search" sx={{ color: 'text.disabled', mr: 1 }} />
        </InputAdornment>
      }
      sx={{
        height: 44,
        typography: 'subtitle1',
        color: 'var(--text-disabled, #9FAF9E)',
        fontFamily: 'Public Sans',
        weight: 600,
        fontSize: '16px',
        lineHeight: '24px',
      }}
    />
  );
}
