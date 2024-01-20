'use client';

import { FormConfig } from 'src/muiEazy';
import { useEffect, useMemo } from 'react';
import storageHelper from 'src/common/utils/storageHelper';
import { useFlatInject } from 'src/service';
import { DealFileComponentType } from 'src/service/model';
import { FileType } from 'src/service/model/appStoreModel';
import { DealType } from 'src/types/deal';
import * as Yup from 'yup';
const DealTypeOption = [
  {
    label: 'Capital Raising',
    value: DealType.CAPITAL_RAISING,
  },
  {
    label: 'Equity',
    value: DealType.EQUITY,
  },
  {
    label: 'Startup Pitch',
    value: DealType.STARTUP_PITCH,
  },
  {
    label: 'Partnerships',
    value: DealType.PARTNERSHIPS,
  },
  {
    label: 'Sell A Business',
    value: DealType.SELL_A_BUSINESS,
  },
];
export const useFormConfig_1_1 = ({
  defaultValues,
  type,
}: {
  id?: string;
  defaultValues?: any;
  type?: string;
}): FormConfig => {
  return useMemo<FormConfig>(() => {
    return {
      title: {
        label: 'Market',
        defaultValue: defaultValues?.['title'],
        fieldConfig: {
          required: true,
        },
      },
      title1: {
        label: 'Deal Name',
        defaultValue: defaultValues?.['title'],
        fieldConfig: {
          required: true,
        },
      },
      title2: {
        label: 'Deal Name',
        defaultValue: defaultValues?.['title'],
        fieldConfig: {
          required: true,
        },
      },
      title3: {
        label: 'Deal Name',
        defaultValue: defaultValues?.['title'],
        fieldConfig: {
          required: true,
        },
      },
      title4: {
        label: 'Deal Name',
        defaultValue: defaultValues?.['title'],
        fieldConfig: {
          required: true,
        },
      },
    };
  }, []);
};
export const useFormConfig_1 = ({
  defaultValues,
}: {
  id?: string;
  defaultValues?: any;
}): FormConfig => {
  return useMemo<FormConfig>(() => {
    return {
      type: {
        type: 'radio',
        label: 'Deal Type',
        defaultValue: defaultValues?.['type'],
        config: {
          options: Object.values(DealTypeOption).map((item) => {
            return {
              key: item.value.toString(),
              value: item.value.toString(),
              label: item.label,
            };
          }),
        },
        fieldConfig: {
          disabled: storageHelper.getItem('DEAL_ID'),
          sx: {
            width: '300px',
          },
          required: true,
        },
      },
    };
  }, [defaultValues]);
};

export const useFormConfig_detail = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  const { categoryFindAllAct, allPrimeCategory = [] } = useFlatInject('categoryStore');
  useEffect(() => {
    categoryFindAllAct();
  }, []);
  const config = useMemo<FormConfig>(() => {
    return {
      sub_title: {
        defaultValue: defaultValues?.['sub_title'],
        label: 'Sub-heading',
        fieldConfig: {
          required: true,
        },
      },
      category_id: {
        defaultValue: defaultValues?.['category_id'],
        label: 'Business sector',
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

export const useFormConfig_Highlights = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  ;
  const config = useMemo<FormConfig>(() => {
    ;
    return {
      highlights: {
        defaultValue: defaultValues?.['components']?.['highlights'],
        label: 'Highlights',
        type: 'multiple',
        fieldConfig: {
          //TODO 设置highlights的placeholder
          label: 'highlights',
        },
        schema: Yup.array().test({
          test(value, ctx) {
            if (
              value!?.filter((item) => {
                return item;
              }).length >= 3
            ) {
              return true;
            } else {
              return ctx.createError({ message: 'You need to create at least 3 Highlights!' });
            }
          },
        }),
      },
    };
  }, [defaultValues]);

  return config;
};

export const useFormConfig_ask = ({
  defaultValues,
  type,
}: { id?: string; defaultValues?: any; type?: DealType } = {}): FormConfig => {
  return useMemo<FormConfig>(() => {
    let hidden = [DealType.PARTNERSHIPS].includes(type!) ? true : false;
    const config: FormConfig = {
      amount: {
        defaultValue: defaultValues?.['amount'] || '0',
        schema: [DealType.CAPITAL_RAISING, DealType.SELL_A_BUSINESS].includes(type!)
          ? Yup.number().min(0, 'Amount must be greater than or equal to 0')
          : null,
        fieldConfig: {
          // disabled: disabled,
          required: [DealType.CAPITAL_RAISING, DealType.SELL_A_BUSINESS].includes(type!)
            ? true
            : false,
          type: 'number',
        },
        label: `Amount ${
          [DealType.CAPITAL_RAISING, DealType.SELL_A_BUSINESS].includes(type!) ? '' : '(optional)'
        }`,
        isHidden: hidden,
      },
      ask_desc: {
        defaultValue: defaultValues?.['ask_desc'] || '',
        schema: Yup.string().max(1000, 'Description must be less than 1000 characters'),
        isHidden: hidden,
        fieldConfig: {
          // disabled: xxx
          multiline: true,
          minRows: 4,
          type: 'textarea',
          required: [DealType.STARTUP_PITCH].includes(type!) ? true : false,
        },
        label: `Ask Description ${[DealType.STARTUP_PITCH].includes(type!) ? '' : '(optional)'}`,
      },
    };
    if (type == DealType.SELL_A_BUSINESS) {
      config.vendor_financing = {
        defaultValue: defaultValues?.['vendor_financing'] || false,
        type: 'checkbox',
        fieldConfig: {},
        label: 'vendor_financing',
      };
    }
    return config;
  }, [type, defaultValues]);
};

export const useFormConfig_baseOther = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  const { getUploadUrlAct } = useFlatInject('dealStore');
  const config = useMemo<FormConfig>(() => {
    return {
      pics: {
        type: 'upload',
        label: 'Images',
        fieldConfig: {
          multiple: true,
          uploadAction: async (file: File) => {
            const {
              payload: { fileUrl },
            } = await getUploadUrlAct({
              content_type: file.type,
              component_type: DealFileComponentType.DEAL_PIC_MAIN,
              file_name: file.name,
              file_size: file.size,
              id: storageHelper.getItem('DEAL_ID'),
              type: FileType.DealPic,
              file,
            });
            return fileUrl;
          },
        },
      },
      logo: {
        type: 'upload',
        label: 'Upload logo (optional)',
        fieldConfig: {
          required: true,
          sx: {
            width: '200px',
          },
          multiple: false,
          uploadAction: async (file: File) => {
            const {
              payload: { fileUrl },
            } = await getUploadUrlAct({
              content_type: file.type,
              component_type: DealFileComponentType.DEAL_LOGO,
              file_name: file.name,
              file_size: file.size,
              id: storageHelper.getItem('DEAL_ID'),
              type: FileType.DealPic,
              file,
            });
            return fileUrl;
          },
        },
      },
    };
  }, [defaultValues]);
  for (let i in config) {
    config[i].defaultValue = defaultValues?.[i];
  }
  return config;
};

export const useFormConfig_nor = ({ defaultValues = {} }: { defaultValues: any }): FormConfig => {
  return useMemo<FormConfig>(() => {
    return {
      title: {
        defaultValue: defaultValues?.['title'] || '',
        label: 'Title (optional)',
        fieldConfig: {},
        //TODO 控制是否显示的问题
        // isHidden: defaultValues.type == DealType.SELL_A_BUSINESS,
      },
      sub_title: {
        defaultValue: defaultValues?.['sub_title'] || '',
        label: 'Body text (optional)',
        type: 'string',
        fieldConfig: {
          multiline: true,
          minRows: 4,
        },
      },
    };
  }, [defaultValues, defaultValues.type]);
};

export const useFormConfig_team = ({
  defaultValue,
}: { id?: string; defaultValue?: any } = {}): FormConfig => {
  const { getUploadUrlAct } = useFlatInject('dealStore');
  return useMemo<FormConfig>(() => {
    return {
      team: {
        label: 'Sub-heading',
        type: 'multiple',
        defaultValue: defaultValue?.['team'],
        fieldConfig: {
          mulType: 'obj',
          childFieldConfig: {
            image: {
              label: 'Upload team member image (optional)',
              type: 'upload',
              fieldConfig: {
                uploadAction: async (file: File) => {
                  const {
                    payload: { fileUrl },
                  } = await getUploadUrlAct({
                    content_type: file.type,
                    component_type: DealFileComponentType.DEAL_TEAM_PIC,
                    file_name: file.name,
                    file_size: file.size,
                    id: storageHelper.getItem('DEAL_ID'),
                    type: FileType.DealPic,
                    file,
                  });
                  return fileUrl;
                },
              },
            },
            name: {
              label: 'Team member name (optional)',
            },
            title: {
              label: 'Team member role (optional)',
            },
          } as FormConfig,
        },
      },
    };
  }, [defaultValue]);
};

export const useFormConfig_Media = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  const { getUploadUrlAct } = useFlatInject('dealStore');
  return useMemo<FormConfig>(() => {
    return {
      attachments: {
        label: 'Upload documents (optional)',
        type: 'upload',
        defaultValue: defaultValues?.['attachments'],
        fieldConfig: {
          multiple: true,
          accept: {},
          uploadAction: async (file: File) => {
            const {
              payload: { fileUrl },
            } = await getUploadUrlAct({
              content_type: file.type,
              component_type: DealFileComponentType.DEAL_ATTACHMENT_FILE,
              file_name: file.name,
              file_size: file.size,
              id: storageHelper.getItem('DEAL_ID'),
              type: FileType.DealPic,
              file,
            });
            return fileUrl;
          },
        },
      },
      linkedin: {
        defaultValue: defaultValues?.['linkedin'],
        label: 'LinkedIn (optional)',
      },
      facebook: {
        defaultValue: defaultValues?.['facebook'],
        label: 'Facebook (optional)',
      },
      instagram: {
        defaultValue: defaultValues?.['instagram'],
        label: 'Instagram (optional)',
      },
    };
  }, [defaultValues]);
};

export const useFormConfig_faq = ({
  defaultValues,
}: { id?: string; defaultValues?: any } = {}): FormConfig => {
  return useMemo<FormConfig>(() => {
    return {
      faq: {
        label: 'Upload documents (optional)',
        type: 'multiple',
        defaultValue: defaultValues?.['components']?.['faq'],
        fieldConfig: {
          mulType: 'obj',
          childFieldConfig: {
            question: {
              label: 'Question (optional)',
            },
            answer: {
              label: 'Answer (optional)',
              // todo: Answer needs to be multiline
              multiline: true,
              minRows: 4,
            },
          } as FormConfig,
        },
      },
    };
  }, []);
};
