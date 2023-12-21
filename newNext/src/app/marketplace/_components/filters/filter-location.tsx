import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { useEffect } from 'react';
import { useFlatInject } from 'src/service';
import Iconify from 'src/commonOld/components/iconify';

// ----------------------------------------------------------------------

export default function FilterLocation() {
 
  const { searchPostCode, setPostCode, setSearchPostCode } = useFlatInject('marketStore');
  const { geoData, geoQueryAct } = useFlatInject('appStore');
  const { userInfo } = useFlatInject('authStore');

  useEffect(() => {
    const func = async () => {
      await geoQueryAct({
        postcode: searchPostCode || undefined,
      });
    };
    func();
  }, [searchPostCode]);

  return (
    <Autocomplete
      onChange={() => {
        setPostCode(searchPostCode);
        setSearchPostCode(undefined);
      }}
      sx={{ width: 0.5 }}
      popupIcon={null}
      options={geoData}
      onInputChange={(_, newInputValue) => {
        let value = Number(newInputValue);
        if (value) {
          setSearchPostCode(value);
        }
      }}
      onBlur={() => {
        setSearchPostCode(undefined);
      }}
      getOptionLabel={(option) => option.name.toString()}
      renderInput={(params) => (
        <InputBase
          {...params.InputProps}
          inputProps={params.inputProps}
          fullWidth
          placeholder="Location"
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={24} icon="carbon:location" sx={{ color: 'text.disabled', mr: 1 }} />
            </InputAdornment>
          }
          sx={{ height: 44, typography: 'subtitle1', color: 'inherit' }}
        />
      )}
      filterOptions={(x) => x}
      renderOption={(props, option) => {
        // if (!option.label) {
        //   return null;
        // }

        return (
          <li {...props} key={option.name}>
            {/* <Iconify
              key={option.label}
              icon={`circle-flags:${option.code.toLowerCase()}`}
              width={28}
              sx={{ mr: 1 }}
            /> */}
            {option.name} ({option.postcode}) +{option.state}
          </li>
        );
      }}
    />
  );
}
