'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/commonOld/components/hook-form';
import Iconify from 'src/commonOld/components/iconify';
import { SplashScreen } from 'src/commonOld/components/loading-screen';
import Logo from 'src/commonOld/components/logo';
import MySwitch from 'src/commonOld/components/switch-user-type';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import * as Yup from 'yup';

export default function LoginCoverView() {
  const passwordShow = useBoolean();
  const { setLoading, loading, isPartner, setIsPartner, loginAct, googleLoginAct } =
    useFlatInject('authStore');
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password should be of minimum 6 characters length'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    loginAct(data).finally(() => {
      reset();
      setLoading(false);
    });
  });

  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (userInfo) => {
      await googleLoginAct(userInfo.access_token);
    },
    onError: (error) => {
      // 添加错误处理提示， 比如 GOOGLE登陆失败 这种
      console.log(error);
    },
  });

  const renderHead = (
    <Stack
      sx={{
        pb: 5,
        pt: { xs: 5, md: 10 },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Typography variant="h3" sx={{ color: 'common.black' }} paragraph>
        Login
        {/* Login as{' '}
        <MySwitch
          onChange={() => {
            setIsPartner(!isPartner);
          }}
          checked={isPartner}
        /> */}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Don’t have an account? `}
        <Link component={RouterLink} href={paths.registerCover} variant="subtitle2" color="primary">
          Get Started
        </Link>
      </Typography>
    </Stack>
  );

  const renderSocials = (
    <Stack direction="row" spacing={2} my={4}>
      <Button
        onClick={() => {
          // 弃用302转跳的方式登陆，还是用2次请求的方式
          // googleLoginAct();
          onGoogleLogin();
        }}
        fullWidth
        size="large"
        color="inherit"
        variant="outlined"
      >
        <Iconify icon="logos:google-icon" width={24} />
      </Button>

      <Button fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="carbon:logo-facebook" width={24} sx={{ color: '#1877F2' }} />
      </Button>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5} alignItems="flex-end">
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

        {/* <Link
          component={RouterLink}
          href={paths.verify}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Verify Email
        </Link> */}

        <Link
          component={RouterLink}
          href={paths.forgotPassword}
          variant="body2"
          underline="always"
          // color="text.secondary"
          color="primary"
        >
          Forgot password?
        </Link>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      <Logo />
      {renderHead}
      {renderSocials}
      {renderForm}
      {loading && <SplashScreen />}
    </>
  );
}
