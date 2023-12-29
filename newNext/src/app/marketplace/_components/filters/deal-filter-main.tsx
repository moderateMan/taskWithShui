import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { useResponsive } from 'src/muiEazy';
import Iconify from 'src/commonOld/components/iconify';
import { useFlatInject } from 'src/service';

export default function DealFilterMain() {
  const { marketplaceDealQueryAct } = useFlatInject('dealStore');
  const { seachParams, setSeachParams } = useFlatInject('marketStore');
  const mdUp = useResponsive('up', 'md');
  return (
    <InputBase
      onChange={(e) => {
        setSeachParams({
          ...seachParams,
          name: e.target.value,
        });
      }}
      value={seachParams.name}
      fullWidth
      placeholder={mdUp ? 'Search By keyword or Industry' : 'Search'}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          marketplaceDealQueryAct({
            title: seachParams.name ? seachParams.name : undefined,
            category: seachParams.category ? seachParams.category : undefined,
            order: {
              created_at: 'desc',
            },
          });
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
