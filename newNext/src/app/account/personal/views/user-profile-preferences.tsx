import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Alert, Divider, Stack, useMediaQuery } from '@mui/material';
import { useFlatInject } from 'src/service';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import React from 'react';
import { Iconify } from 'src/muiEazy';
import { ICategory } from 'src/service/model';
import { all } from 'axios';

const allBusinessSector = [
  {
    id: 1,
    name: 'Capital Raising',
  },
  {
    id: 2,
    name: 'Equity',
  },
  {
    id: 3,
    name: 'Partnerships',
  },
  {
    id: 4,
    name: 'Sell a Business',
  },
  {
    id: 5,
    name: 'Startup Pitch',
  },
];

export default function AccountPreferenceView() {
  const { allPrimeCategory, categoryFindAllAct } = useFlatInject('categoryStore');
  const { userUpdateAct, userInfo, userInfoMemberAct } = useFlatInject('authStore');

  const is_mobile = useMediaQuery('(max-width: 600px)');
  const [selectedNames, setSelectedNames] = React.useState<Array<string>>(() => {
    if (userInfo?.preferences) {
      const selectedCategories = allPrimeCategory.filter(
        (category: ICategory) => userInfo?.preferences?.includes(category.id)
      );
      return selectedCategories.map((category: ICategory) => category.name);
    }
    return [];
  });
  const [selectedIds, setSelectedIds] = React.useState<Array<number>>([]);

  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const handleClose = () => {
    setSuccess(null);
    setError(null);
  };

  React.useEffect(() => {
    if (allPrimeCategory.length === 0) {
      categoryFindAllAct();
    }

    if (userInfo?.preferences) {
      const selectedCategories = allPrimeCategory.filter(
        (category: ICategory) => userInfo?.preferences?.includes(category.id)
      );
      setSelectedNames(selectedCategories.map((category: ICategory) => category.name));
      setSelectedIds(userInfo?.preferences);
    }

  }, [allPrimeCategory, userInfo]);

  return (
    <Stack
      justifyContent={'center'}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Iconify
        icon={'mdi:close'}
        onClick={handleClose}
        sx={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
      />
      {success && (
        <Alert severity="success" sx={{ mt: 2 }} variant="filled">
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="warning" sx={{ mt: 2 }} variant="filled">
          {error}
        </Alert>
      )}

      <Stack spacing={'30px'}>
        <Typography
          id="transition-modal-description"
          fontFamily={primaryFont.style.fontFamily}
          fontSize={'20px'}
          fontStyle={'normal'}
          fontWeight={600}
          lineHeight={'26px'}
          color={'#14417D'}
        >
          Categories
        </Typography>

        <Typography
          id="transition-modal-description"
          fontFamily={primaryFont.style.fontFamily}
          fontSize={'16px'}
          fontStyle={'normal'}
          fontWeight={400}
          lineHeight={'24px'}
          color={'#696969'}
        >
          What type of deal categories are you interested in?
        </Typography>
      </Stack>

      <Stack
        direction={'row'}
        justifyContent={'flex-start'}
        spacing={1}
        gap={2}
        flexWrap={'wrap'}
        sx={{
          mt: 3,
        }}
      >
        {allPrimeCategory.map((item, index) => {
          return (
            <Chip
              size="small"
              key={item.id}
              label={item.name}
              variant={selectedNames.includes(item.name) ? 'filled' : 'outlined'}
              icon={
                selectedNames.includes(item.name) ? (
                  <Iconify icon={'material-symbols-light:check'} />
                ) : undefined
              }
              component={'button'}
              onClick={() => {
                if (selectedNames.includes(item.name)) {
                  setSelectedNames(selectedNames.filter((x) => x !== item.name));
                  setSelectedIds(selectedIds.filter((x) => x !== item.id));
                } else {
                  setSelectedNames([...selectedNames, item.name]);
                  setSelectedIds([...selectedIds, item.id]);
                }
              }}
              sx={{
                borderRadius: '30px',
                borderColor: '#14417D',
                backgroundColor: selectedNames.includes(item.name) ? '#14417D' : 'white',
                color: selectedNames.includes(item.name) ? 'white' : '#14417D',
              }}
            />
          );
        })}
      </Stack>

      <Divider sx={{ mt: 3, mb: 5 }} />

      <Stack spacing={'30px'}>
        <Typography
          id="transition-modal-description"
          fontFamily={primaryFont.style.fontFamily}
          fontSize={'20px'}
          fontStyle={'normal'}
          fontWeight={600}
          lineHeight={'26px'}
          color={'#14417D'}
        >
          Business sectors
        </Typography>

        <Typography
          id="transition-modal-description"
          fontFamily={primaryFont.style.fontFamily}
          fontSize={'16px'}
          fontStyle={'normal'}
          fontWeight={400}
          lineHeight={'24px'}
          color={'#696969'}
        >
          What type of business sectors are you interested in?
        </Typography>
      </Stack>

      <Stack
        direction={'row'}
        justifyContent={'flex-start'}
        spacing={1}
        gap={2}
        flexWrap={'wrap'}
        sx={{
          mt: 3,
        }}
      >
        {allBusinessSector.map((item, index) => {
          return (
            <Chip
              size="small"
              key={item.id}
              label={item.name}
              variant={selectedNames.includes(item.name) ? 'filled' : 'outlined'}
              icon={
                selectedNames.includes(item.name) ? (
                  <Iconify icon={'material-symbols-light:check'} />
                ) : undefined
              }
              component={'button'}
              onClick={() => {
                if (selectedNames.includes(item.name)) {
                  setSelectedNames(selectedNames.filter((x) => x !== item.name));
                  setSelectedIds(selectedIds.filter((x) => x !== item.id));
                } else {
                  setSelectedNames([...selectedNames, item.name]);
                  setSelectedIds([...selectedIds, item.id]);
                }
              }}
              sx={{
                borderRadius: '30px',
                borderColor: '#14417D',
                backgroundColor: selectedNames.includes(item.name) ? '#14417D' : 'white',
                color: '#14417D',
              }}
            />
          );
        })}
      </Stack>

      <Stack direction={'row'} spacing={2} p={4} justifyContent={'right'}>
        <Button
          onClick={() => {
            if (selectedNames.length < 3) {
              setError('Please select at least 3 categories');
              return;
            }
            userUpdateAct({ preferences: selectedIds, id: userInfo?.id })
              .then(() => {
                setError(null);
                setSuccess('Preference updated');
              })
              .catch(() => {
                setSuccess(null);
                setError('Something went wrong');
              })
              .finally(() => {
                userInfoMemberAct();
              });
            setTimeout(() => {
              handleClose();
            }, 3000);
          }}
          variant="contained"
          sx={
            {
              // bgcolor: '#FF7A59',
              // color: '#fff',
            }
          }
        >
          Save preferences
        </Button>
      </Stack>
    </Stack>
  );
}
