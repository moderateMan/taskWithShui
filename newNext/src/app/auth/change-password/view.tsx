'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
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
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { IconButton, InputAdornment } from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';
import { set } from 'nprogress';

// ----------------------------------------------------------------------

export default function VerifyView() {
  const { changePasswdFromResetPasswdpageAct, changePasswordResponse } = useFlatInject('authStore');
  const [info, setInfo] = useState('');
  const [infoType, setInfoType] = useState('success');
  const passwordShow = useBoolean(false);

  const VerifySchema = yup.object({
    password: yup.string().min(8).max(20).required('Password is required'),
    confirmPassword: yup.string().min(8).max(20).required('Confirm Password is required'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const token = useSearchParams().get('token');

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        setInfoType('error');
        setInfo('Password and Confirm Password must match');
        return;
      }

      if (!token || token === '') {
        setInfoType('error');
        setInfo('Authentication token is not represented');
        return;
      }

      setInfoType('success');
      setInfo('');
      // changePasswordAct(data.code);
      changePasswdFromResetPasswdpageAct({
        new_password: data.password,
        token: token,
      }).then((res) => {
        setTimeout(() => {
          // delete search params
          window.history.replaceState(null, '', window.location.pathname);
          // refresh page
          window.location.reload();
        }, 3000);
      });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (changePasswordResponse) {
      setInfoType('success');
      setInfo('Password changed successfully');
    }
  }, [changePasswordResponse]);

  return (
    <>
      <Image
        alt="email inbox"
        src="/assets/icons/ic_email_inbox.svg"
        sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
      />

      <Typography variant="h3">Password Change</Typography>

      <Typography variant="body2" sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
        Please Change your password to continue
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          <RHFTextField
            name="password"
            label={'Password'}
            helperText={'Password must match your Comfirm Password.'}
            type={passwordShow.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={passwordShow.onToggle} edge="end">
                    <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            label={'Confirm Password'}
            type={passwordShow.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={passwordShow.onToggle} edge="end">
                    <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {info !== '' && (
            <Alert severity={infoType as any} sx={{ display: info ? 'block' : 'none' }}>
              {info}
            </Alert>
          )}

          <LoadingButton
            fullWidth
            size="large"
            color="inherit"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 3 }}
          >
            Confirm Update
          </LoadingButton>
        </Stack>
      </FormProvider>

      {/* <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        {`Don’t have a code? `}
        <Link
          variant="subtitle2"
          underline="none"
          href={paths.ResendEmailVerification}
          sx={{
            cursor: 'pointer',
          }}
        >
          Resend code
        </Link>
      </Typography> */}

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
