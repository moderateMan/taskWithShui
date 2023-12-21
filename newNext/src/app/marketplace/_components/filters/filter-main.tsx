import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { useFlatInject } from 'src/service';
import Iconify from 'src/commonOld/components/iconify';

export default function FilterMain() {
  const { opportunityFindMarketplaceAct } = useFlatInject('opportunityStore');
  const { postCode, title, setTitle } = useFlatInject('marketStore');

  return (
    <InputBase
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      fullWidth
      placeholder="Search for your opportunity"
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          opportunityFindMarketplaceAct({
            title,
            postcode: postCode,
          });
        }
      }}
      startAdornment={
        <InputAdornment position="start">
          <Iconify
            width={24}
            icon="ant-design:container-twotone"
            sx={{ color: 'text.disabled', mr: 1 }}
          />
        </InputAdornment>
      }
      sx={{ height: 44, typography: 'subtitle1', color: 'inherit' }}
    />
  );
}
