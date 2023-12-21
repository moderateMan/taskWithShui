'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import notify from 'src/common/utils/notify';
import FormProvider, {
  RHFAutocompleteGoogle,
  RHFSelect,
  RHFTextField,
} from 'src/commonOld/components/hook-form';
import Iconify from 'src/commonOld/components/iconify';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { useFlatInject } from 'src/service';
import { IUser } from 'src/service/model';
import { Role, UpdateUserRequest } from 'src/service/model/model';
import * as Yup from 'yup';

type FormKey = keyof (UpdateUserRequest & {
  oldPassword: string;
  confirmNewPassword: string;
  country: string;
});
interface FormConfigItem {
  type?: 'string' | 'select' | 'autoCompleteGoogle';
  schema?: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
  defaultValue?: unknown;
  name?: string;
  label?: string;
  group?: string;
  isHidden?: boolean;
  fieldConfig?: {};
  config?: {
    options?: string[] | { key: string; value: string; label: string }[];
  };
}

enum SubmitEnum {
  'Save Profile',
  'Update Password',
}

// ----------------------------------------------------------------------

const TABS = ['My Information', 'My Enquiry', 'My Companies', 'Comments', 'Feedback'];

export default function UserPersonalView() {
  const { userInfo, userUpdateAct, changePasswdAct } = useFlatInject('authStore');

  //  按钮处理逻辑
  const [submit, setSubmit] = useState<SubmitEnum | null>(null);

  const passwordShow = useBoolean();
  let defaultValues: { [key: string]: any } = {};

  // TAB 处理逻辑
  const [tab, setTab] = React.useState('My Information');
  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  }, []);

  const fromConfig = useMemo<
    Partial<{
      [key in FormKey]: FormConfigItem;
    }>
  >(
    () => ({
      first_name: { label: 'First Name' },
      last_name: { label: 'Last Name' },
      nick_name: { label: 'Nick Name' },
      title: { label: 'Title' },
      mobile: { label: 'Mobile' },
      email: { label: 'Email' },
      oldPassword: { group: 'Change Password' },
      address: {
        type: 'autoCompleteGoogle',
        label: 'Address',
      },
      postcode: { label: 'Postcode' },
      password: { group: 'Change Password' },
      confirmNewPassword: { group: 'Change Password' },
      // role: {
      //   schema: Yup.string<Role>().optional(),
      //   label: 'Role',
      // },
      country: {
        label: 'Country',
        schema: Yup.string<Role>().optional(),
        defaultValue: 'Australia',
      },
    }),
    []
  );

  let yupShape: {
    [key in keyof typeof fromConfig]: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
  } = {} as {
    [key in keyof typeof fromConfig]: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
  };
  Object.entries(fromConfig).forEach(([key, value]) => {
    const { schema, defaultValue = '', type = 'string' } = value;
    yupShape[key as FormKey] = type ? Yup.string().optional() : schema;
    defaultValues[key] = defaultValue;
  });
  const PersonalSchema = Yup.object().shape(yupShape);
  const methods = useForm({
    resolver: yupResolver(PersonalSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (userInfo) {
      if (submit == SubmitEnum['Save Profile']) {
        const payload = {
          address: data.address,
          first_name: data.first_name,
          last_name: data.last_name,
          mobile: data.mobile,
          nick_name: data.nick_name,
          title: data.title,
          postcode: data.postcode,
        };
        userUpdateAct({ ...payload, id: userInfo.id || 0 }).finally(() => {
          reset();
        });
      }
      if (submit == SubmitEnum['Update Password']) {
        const payload = {
          old_password: data.oldPassword,
          new_password: data.newPassword,
        };

        if (data.newPassword !== data.confirmNewPassword) {
          notify.error('New Password and Confirm New Password must be the same');
          return;
        }

        changePasswdAct({
          old_password: data.oldPassword,
          new_password: data.newPassword,
        }).finally(() => {
          reset();
        });
      }
    }
  });

  useEffect(() => {
    if (userInfo) {
      Object.entries(fromConfig).forEach(([key, value]) => {
        let formValue = userInfo[key as keyof IUser];
        formValue && setValue(key as FormKey, formValue);
      });
    }
  }, [userInfo]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        User Profile
      </Typography>

      <Box
        my={5}
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        {Object.entries(fromConfig).map(([key, item]) => {
          const { isHidden, group, type, name = key, label = key, config } = item;
          if (isHidden || group) return;
          if (type == 'select') {
            return (
              <RHFSelect name={name} label={label} key={key}>
                {config?.options?.map((item) => {
                  return (
                    <MenuItem
                      key={typeof item == 'string' ? item : item.key}
                      value={typeof item == 'string' ? item : item.value}
                    >
                      {typeof item == 'string' ? item : item.label}
                    </MenuItem>
                  );
                })}
              </RHFSelect>
            );
          }
          if (type == 'autoCompleteGoogle') {
            return <RHFAutocompleteGoogle name={name} label={label} key={key} />;
          }
          return <RHFTextField name={name} label={label} key={key} />;
        })}
      </Box>
      <LoadingButton
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={() => {
          setSubmit(SubmitEnum['Save Profile']);
        }}
      >
        Save Profile
      </LoadingButton>

      <Stack spacing={3} sx={{ my: 5 }}>
        <Typography variant="h5"> Change Password </Typography>
        <Stack spacing={2.5}>
          <RHFTextField
            name="oldPassword"
            label="Old Password"
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
            name="newPassword"
            label="New Password"
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
            name="confirmNewPassword"
            label="Confirm New Password"
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
        </Stack>
      </Stack>

      <LoadingButton
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={() => {
          setSubmit(SubmitEnum['Update Password']);
        }}
      >
        Update Password
      </LoadingButton>
    </FormProvider>
  );
}
