import { FormConfig } from 'mui-eazy';
import { useEffect, useMemo } from 'react';
import { useFlatInject } from 'src/service';

export const useFormConfig_business = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  const { categoryFindAllAct, allPrimeCategory = [] } = useFlatInject('categoryStore');
  useEffect(() => {
    categoryFindAllAct();
  }, []);
  const config = useMemo<FormConfig>(() => {
    return {
      company_desc: {
        label: 'About the company',
        fieldConfig: {
          multiline: true,
          rows: 5,
          required: true,
          sx: {
            gridColumn: '1 / -1',
          },
        },
      },
      industry: {
        label: 'Industry',
        fieldConfig: {
          required: true,
        },
      },
      keyArea: {
        label: 'Key area of expertise',
        fieldConfig: {
          required: true,
        },
      },
      ABN: {
        label: 'ABN',
        fieldConfig: {
          required: true,
        },
      },
      employees: {
        label: 'Number of employees',
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

export const useFormConfig_media = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  const { categoryFindAllAct, allPrimeCategory = [] } = useFlatInject('categoryStore');
  useEffect(() => {
    categoryFindAllAct();
  }, []);
  const config = useMemo<FormConfig>(() => {
    return {
      website: {
        label: 'Website',
        fieldConfig: {
          required: true,
          sx: {
            gridColumn: '1 / 3',
          },
        },
      },
      facebook: {
        label: 'Facebook',
        fieldConfig: {
          required: true,
          sx: {
            gridColumn: '3 / 3',
          },
        },
      },
      linkedIn: {
        label: 'LinkedIn',
        fieldConfig: {
          required: true,
        },
      },
      instagram: {
        label: 'Instagram',
        fieldConfig: {
          required: true,
        },
      },
      twitter: {
        label: 'X / Twitter',
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
