import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import Iconify from 'src/commonOld/components/iconify';
import { useFlatInject } from 'src/service';
import { IUserCompany } from 'src/service/model';

// ----------------------------------------------------------------------

type Props = {
  card: {
    name: string;
    address?: {
      postcode?: string;
      area?: string;
      state?: string;
      country?: string;
      googleAddress?: string; // google auto complete address
    };
    email?: string;
    website?: string;
  };
  companies: IUserCompany[];
};

export default function UserProfileCompanyCard({ card, companies }: Props) {
  const { userUpdateAct, userInfo } = useFlatInject('authStore');
  const { name, address, email, website } = card;

  let new_companies = [...companies];

  let postcode = address?.postcode || 'not available';

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleDelete = async (name: string) => {
    // find the company by name then delete it
    const index = new_companies.findIndex((company) => company.name === name);
    new_companies.splice(index, 1);
    // update the user info
    await userUpdateAct({
      id: userInfo?.id || 0,
      companies: new_companies,
    });
  };

  return (
    <>
      <Stack
        spacing={3}
        direction={'column'}
        sx={{
          p: 3,
          pr: 1,
          borderRadius: 2,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
          ':hover': {
            border: (theme) => `solid 2px ${alpha(theme.palette.grey[900], 0.24)}`,
          },
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle1' }}>
          <Typography variant="h6">{name}</Typography>
          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </Stack>

        <Stack direction="column" alignItems="left" sx={{ typography: 'subtitle1' }}>
          <Typography variant="body1">{'Address: ' + address?.googleAddress}</Typography>

          <Typography variant="body1">{'Postcode: ' + postcode}</Typography>
        </Stack>
      </Stack>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:edit" sx={{ mr: 1 }} /> Edit
        </MenuItem> */}

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem
          onClick={() => {
            handleDelete(name);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Popover>
    </>
  );
}
