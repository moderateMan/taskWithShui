import { FormConfig } from 'src/muiEazy';
import { useEffect, useMemo } from 'react';
import { useFlatInject } from 'src/service';

export const useFormConfig_contactDeatil = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  const { categoryFindAllAct, allPrimeCategory = [] } = useFlatInject('categoryStore');
  useEffect(() => {
    categoryFindAllAct();
  }, []);
  const config = useMemo<FormConfig>(() => {
    return {
      company_name: {
        label: 'Company name',
        fieldConfig: {
          required: true,
        },
      },
      first_name: {
        label: 'First name',
        fieldConfig: {
          required: true,
        },
      },
      surname: {
        label: 'Surname',
        fieldConfig: {
          required: true,
        },
      },
      position: {
        label: 'Position',
        fieldConfig: {
          required: true,
        },
      },
      email: {
        label: 'Email',
        fieldConfig: {
          required: true,
        },
      },
      mobile_number: {
        label: 'Mobile number',
        fieldConfig: {
          required: true,
        },
      },
    };
  }, [allPrimeCategory, defaultValues]);
  for (let i in config) {
    config[i].defaultValue = defaultValues?.[i];
  }
  return config;
};

export const useFormConfig_address = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  const { categoryFindAllAct, allPrimeCategory = [] } = useFlatInject('categoryStore');
  useEffect(() => {
    categoryFindAllAct();
  }, []);
  const config = useMemo<FormConfig>(() => {
    return {
      street: {
        label: 'Street',
        fieldConfig: {
          required: true,
          sx: {
            gridColumn: '1 / -1',
          },
        },
      },
      apt: {
        label: 'Apt, suit, unit, etc',
        fieldConfig: {
          required: true,
        },
      },
      city_Suburb: {
        label: 'City/Suburb',
        fieldConfig: {
          required: true,
        },
      },
      state: {
        label: 'State',
        fieldConfig: {
          required: true,
        },
      },
      postcode: {
        label: 'Postcode',
        fieldConfig: {
          required: true,
        },
      },
    };
  }, [allPrimeCategory, defaultValues]);
  for (let i in config) {
    config[i].defaultValue = defaultValues?.[i];
  }
  return config;
};
