'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import FormProvider, { RHFTextField } from 'src/commonOld/components/hook-form';
import Image from 'src/commonOld/components/image';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';

// ----------------------------------------------------------------------

export default function ResendEmailVerificationView() {
  const { resendEmailVerificationAct, email_verification_result } = useFlatInject('authStore');
  const [info, setInfo] = useState('');

  const VerifySchema = Yup.object().shape({
    email: Yup.string().email().required('Verification Code is required'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      resendEmailVerificationAct(data.email);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Image
        alt="email inbox"
        src="/assets/icons/ic_email_inbox.svg"
        sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
      />

      <Typography variant="h3">Resend Email Verification Token</Typography>

      <Typography variant="body2" sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
        We will send you a verification code to your email address. Please enter the email address.
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          {/* <RHFCode name="code" /> */}
          <RHFTextField name="email" label={'Your Email address'} />

          {email_verification_result !== '' && (
            <Alert
              severity="success"
              sx={{ display: email_verification_result ? 'block' : 'none' }}
            >
              {email_verification_result}
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
            Send Verification Token to Email
          </LoadingButton>
        </Stack>
      </FormProvider>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        {`Don’t have a code? `}
        <Link
          variant="subtitle2"
          underline="none"
          href={paths.verify}
          sx={{
            cursor: 'pointer',
          }}
        >
          Return to Verification Page
        </Link>
      </Typography>
    </>
  );
}
