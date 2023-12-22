'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import notify from 'src/common/utils/notify';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/commonOld/components/hook-form';
import Iconify from 'src/commonOld/components/iconify';
import Logo from 'src/commonOld/components/logo';
// import MySwitch from 'src/commonOld/components/switch-user-type';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import * as Yup from 'yup';
import ScrollDialog from './scroll-dialog';

// ----------------------------------------------------------------------
const RegisterSchemaPartner = Yup.object().shape({
  companyName: Yup.string()
    .required('Company name is required')
    .min(6, 'Mininum 6 characters')
    .max(30, 'Maximum 30 characters'),
  first_name: Yup.string()
    .required('first name is required')
    .min(6, 'Mininum 6 characters')
    .max(15, 'Maximum 15 characters'),
  last_name: Yup.string()
    .required('last name is required')
    .min(6, 'Mininum 6 characters')
    .max(15, 'Maximum 15 characters'),
  email: Yup.string().required('Email is required').email('That is not an email'),
  mobile: Yup.string().required('Mobile is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should be of minimum 6 characters length'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], "Password's not match"),
});
const defaultValuesPartner = {
  companyName: '',
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
};
const RegisterSchemaUser = Yup.object().shape({
  email: Yup.string().required('Email is required').email('That is not an email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password should be of minimum 6 characters length'),
  first_name: Yup.string()
    .required('first name is required')
    .min(2, 'Mininum 6 characters')
    .max(15, 'Maximum 15 characters'),
  last_name: Yup.string()
    .required('last name is required')
    .min(2, 'Mininum 6 characters')
    .max(15, 'Maximum 15 characters'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], "Password's not match"),
});

const defaultValuesUser = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  confirmPassword: '',
};

const RenderFormUser = () => {
  const passwordShow = useBoolean();
  const authStore = useFlatInject('authStore');
  const [agreed, setAgreed] = useState<boolean>(false);
  const { registerAct, isPartner, loginAct } = authStore;

  const userMethods = useForm<any>({
    resolver: yupResolver(RegisterSchemaUser),
    defaultValues: defaultValuesUser,
  });

  const partnerMethods = useForm<typeof defaultValuesPartner>({
    resolver: yupResolver(RegisterSchemaPartner),
    defaultValues: defaultValuesPartner,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = userMethods;

  const {
    reset: partnerReset,
    handleSubmit: handlePartnerSubmit,
    formState: { isSubmitting: isPartnerSubmitting },
  } = partnerMethods;

  const onSubmit = async (data: typeof defaultValuesUser) => {
    const { confirmPassword, ...rest } = data;
    await registerAct(rest).finally(() => {
      if (isPartner) {
        partnerReset(data);
      } else {
        reset(data);
      }
    });
    notify.success('sucessed !');
    notify.info(
      'A verification email has been sent to your email address. Please check your inbox.',
      {
        autoHideDuration: 10000,
      }
    );
  };

  return (
    <FormProvider
      methods={isPartner ? partnerMethods : userMethods}
      onSubmit={isPartner ? handlePartnerSubmit(onSubmit) : handleSubmit(onSubmit)}
    >
      {isPartner && (
        <Stack spacing={2.5}>
          <>
            <RHFTextField name="companyName" label="Company Name" />
            <RHFTextField name="first_name" label="First Name" />
            <RHFTextField name="last_name" label="Last Name" />
            <RHFTextField name="mobile" label="mobile" />
            <RHFTextField name="email" label="Email address" />
            <RHFTextField
              name="password"
              label="Password"
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
              label="Confirm Password"
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
          </>
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isPartnerSubmitting}
            disabled={!agreed}
          >
            Register
          </LoadingButton>

          <Typography
            variant="caption"
            align="left"
            sx={{ color: 'text.secondary', ml: -1 }}
          >
            <Checkbox
              value={agreed}
              onChange={() => {
                setAgreed(!agreed);
              }}
            />
            {`I agree to `}
            <ScrollDialog />
          </Typography>
        </Stack>
      )}

      {!isPartner && (
        <Stack spacing={2.5}>
          <>
            <RHFTextField name="email" label="Email address" />
            <RHFTextField name="first_name" label="First Name" />
            <RHFTextField name="last_name" label="Last Name" />

            <RHFTextField
              name="password"
              label="Password"
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
              label="Confirm Password"
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
          </>
          <LoadingButton
            disabled={!agreed}
            loading={isSubmitting}
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </LoadingButton>

          <Typography
            variant="caption"
            align="left"
            sx={{ color: 'text.secondary', ml: -1 }}
          >
            <Checkbox
              value={agreed}
              onChange={() => {
                setAgreed(!agreed);
              }}
            />
            {`I agree to  `}

            <ScrollDialog />
          </Typography>
        </Stack>
      )}
    </FormProvider>
  );
};

export default function RegisterCoverView() {
  const authStore = useFlatInject('authStore');
  const { isPartner, setIsPartner, registerAct } = authStore;

  const renderHead = (
    <Stack
      sx={{
        pb: 5,
        pt: { xs: 5, md: 10 },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Typography variant="h3" sx={{ color: 'common.black' }} paragraph>
        Get Started
        {/* Get Started as{' '}
        <MySwitch
          onChange={(e) => {
            setIsPartner(!isPartner);
          }}
          checked={isPartner}
        /> */}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Already have an account? `}
        <Link component={RouterLink} href={paths.loginCover} variant="subtitle2" color="primary">
          Login
        </Link>
      </Typography>
    </Stack>
  );

  // const renderSocials = !isPartner && (
  const renderSocials = (
    <Stack direction="row" spacing={2}>
      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="logos:google-icon" width={24} />
      </Button>

      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
      </Button>
    </Stack>
  );

  return (
    <>
      <Logo />

      {renderHead}

      {renderSocials}

      {/* {!isPartner && ( */}
      <Divider sx={{ py: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          OR
        </Typography>
      </Divider>
      {/* )} */}
      <RenderFormUser />
    </>
  );
}
