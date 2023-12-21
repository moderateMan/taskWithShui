import { Alert, Stack, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Iconify } from 'mui-eazy';
import * as React from 'react';
import { useFlatInject } from 'src/service';
import { primaryFont, secondaryFont } from 'src/theme/typography';
import { setTimeout } from 'timers';

export default function PreferenceView(props: { is_open: boolean }) {
  const { allPrimeCategory, categoryFindAllAct } = useFlatInject('categoryStore');
  const { userUpdateAct, userInfo, userInfoMemberAct } = useFlatInject('authStore');
  const [open, setOpen] = React.useState(props.is_open);
  const is_mobile = useMediaQuery('(max-width: 600px)');
  const [selectedNames, setSelectedNames] = React.useState<Array<string>>([]);
  const [selectedIds, setSelectedIds] = React.useState<Array<number>>([]);

  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuccess(null);
    setError(null);
  };

  React.useEffect(() => {
    if (allPrimeCategory.length === 0) {
      categoryFindAllAct();
    }
  }, [allPrimeCategory]);

  return (
    <Stack
      justifyContent={'center'}
      sx={{
        width: '100wh',
        height: '100%',
      }}
    >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          width: "100%",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: is_mobile ? '95%' : '40%',
              height: is_mobile ? '80%' : '70%',
              bgcolor: 'background.paper',
              borderRadius: '10px',
              border: 'none',
              p: 4,
              overflow: 'hidden',
            }}
          >
            <Iconify
              icon={'mdi:close'}
              onClick={handleClose}
              sx={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
            />
            <Typography
              id="transition-modal-description"
              fontFamily={secondaryFont.style.fontFamily}
              fontSize={'32px'}
              fontStyle={'normal'}
              fontWeight={700}
              lineHeight={'48px'}
            >
              Welcome to Scaling.
            </Typography>
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
                fontFamily={secondaryFont.style.fontFamily}
                fontSize={'18px'}
                fontStyle={'normal'}
                fontWeight={600}
                lineHeight={'28px'}
                color={'#141414'}
              >
                Select your preferences
              </Typography>

              <Typography
                id="transition-modal-description"
                fontFamily={primaryFont.style.fontFamily}
                fontSize={'16px'}
                fontStyle={'normal'}
                fontWeight={400}
                lineHeight={'24px'}
                color={'#141414'}
              >
                Start by choosing the type of deal you want to create, give your deal a name and
                click the <strong>Save</strong> Button below.
              </Typography>

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
                    size="medium"
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

            <Stack direction={'row'} spacing={2} p={4}>
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
                Save
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                }}
                variant="outlined"
                sx={
                  {
                    // bgcolor: '#fff',
                    // color: '#FF7A59',
                  }
                }
              >
                Skip
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Stack>
  );
}
