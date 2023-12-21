'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import FormProvider, { RHFTextField } from 'src/commonOld/components/hook-form';
import Iconify from 'src/commonOld/components/iconify';
import Image from 'src/commonOld/components/image';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import { useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------------

export default function VerifyView() {
  const { emailVerificationAct, email_verification_result, resendEmailVerificationAct } =
    useFlatInject('authStore');

  const defaultValues = {
    code: '',
  };

  return (
    <>
      <Image
        alt="email inbox"
        src="/assets/icons/ic_email_inbox.svg"
        sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
      />

      <Typography variant="h3">Email verified</Typography>

      <Typography variant="body2" sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
        You have successfully verified your email address.
      </Typography>

      <Link
        component={RouterLink}
        href={paths.loginCover}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="carbon:chevron-left" width={16} sx={{ mr: 1 }} />
        Return to sign in
      </Link>
    </>
  );
}
