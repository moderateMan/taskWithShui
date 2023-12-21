import { FormConfig } from 'mui-eazy';
import { useEffect, useMemo } from 'react';
import { useFlatInject } from 'src/service';

export const useFormConfig_subcategorie = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  const { categoryFindAllAct, allPrimeCategory = [] } = useFlatInject('categoryStore');
  useEffect(() => {
    categoryFindAllAct();
  }, []);
  const config = useMemo<FormConfig>(() => {
    return {
      category_id: {
        label: 'Subcategory 1',
        type: 'select',
        fieldConfig: {
          required: true,
        },
        config: {
          options: allPrimeCategory.map((item) => {
            const { id, name } = item;
            return {
              value: id,
              key: id,
              label: name,
            };
          }),
        },
      },
      category_id2: {
        label: 'Subcategory 2',
        type: 'select',
        fieldConfig: {
          required: true,
        },
        config: {
          options: allPrimeCategory.map((item) => {
            const { id, name } = item;
            return {
              value: id,
              key: id,
              label: name,
            };
          }),
        },
      },
    };
  }, [allPrimeCategory, defaultValues]);
  for (let i in config) {
    config[i].defaultValue = defaultValues?.[i];
  }
  return config;
};
