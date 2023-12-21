'use client';

import { Stack, Box } from '@mui/material';
import { useFlatInject } from 'src/service';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/commonOld/components/hook-form';
import FormProvider from 'src/commonOld/components/hook-form/form-provider';
import { IUserCompany } from 'src/service/model';
import * as Yup from 'yup';

// ----------------------------------------------------------------------

type Props = {
  companies: IUserCompany[];
};

export default function UserProfileCompanyCreateForm({ companies }: Props) {
  const { userUpdateAct, userInfo } = useFlatInject('authStore');

  const PersonalSchema = Yup.object().shape({
    name: Yup.string().required('Name is required to create a user company'),
    address: Yup.object().shape({
      postcode: Yup.string().optional(),
      area: Yup.string().optional(),
      state: Yup.string().optional(),
      country: Yup.string().optional(),
      googleAddress: Yup.string().optional(),
    }),
    email: Yup.string().optional(),
    website: Yup.string().optional(),
  });

  const defaultValues = {
    name: '',
    address: {
      postcode: '',
      area: '',
      state: '',
      country: '',
      googleAddress: '',
    },
    email: '',
    website: '',
  };

  const methods = useForm({
    resolver: yupResolver(PersonalSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const new_companies = [...companies, values];
      if (userInfo) {
        await userUpdateAct({ id: userInfo.id || 0, companies: new_companies });
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Stack spacing={2.5}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <RHFTextField name="name" label="Company Name" placeholder="Company Name" />
          <RHFTextField name="address.postcode" label="Postcode" placeholder="Postcode" />
          {/* <RHFTextField name='address.area' label="Area" placeholder="Area" />
            <RHFTextField name='address.state' label="State" placeholder="State" />
            <RHFTextField name='address.country' label="Country" placeholder="Country" /> */}
          <RHFTextField name="address.googleAddress" label="Address" placeholder="Address" />
          <RHFTextField name="email" label="Email" placeholder="Email" />
          <RHFTextField name="website" label="Website" placeholder="Website" />
        </Box>
        <LoadingButton
          sx={{ mt: 3 }}
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Changes
        </LoadingButton>
      </FormProvider>
    </Stack>
  );
}
