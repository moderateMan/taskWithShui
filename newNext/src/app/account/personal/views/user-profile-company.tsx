'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFlatInject } from 'src/service';
import UserProfileCompanyCard from '../components/user-profile-company-card';
import UserProfileCompanyCreateForm from '../components/user-profile-company-create-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserProfileCompany() {
  const { userInfo } = useFlatInject('authStore');
  const companies = userInfo?.companies || [];

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Typography variant="h5">User Company</Typography>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          {companies.map((card: any, index: number) => (
            // todo: ts problem
            <UserProfileCompanyCard key={index} card={card} companies={companies} />
          ))}
        </Box>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

      <Stack spacing={3}>
        <Typography variant="h5">Add New Company</Typography>

        <UserProfileCompanyCreateForm companies={companies} />
      </Stack>
    </Stack>
  );
}
