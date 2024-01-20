import { useEffect, useMemo } from 'react';
import { FormConfig } from 'src/muiEazy';
import { useFlatInject } from 'src/service';
import { FromWrapper } from '../../wrapper';
import * as Yup from 'yup';
import { DealFileComponentType } from 'src/service/model';
import storageHelper from 'src/common/utils/storageHelper';
import { FileType } from 'src/service/model/appStoreModel';
import { DealType } from 'src/types/deal';

export const useFormConfig = ({
  defaultValues,
  type,
}: {
  id?: string;
  defaultValues?: any;
  type?: DealType;
}): FormConfig => {
  const { categoryFindAllAct, allPrimeCategory = [] } = useFlatInject('categoryStore');
  const { getUploadUrlAct, targetType } = useFlatInject('dealStore');

  useEffect(() => {
    categoryFindAllAct();
  }, []);
  if (defaultValues?.['sub_title']) {
  }
  return useMemo<FormConfig>(() => {
    // Ask: 对于Capitail Raising和Sell A Business为必须
    const isAckRequired = [DealType.CAPITAL_RAISING, DealType.SELL_A_BUSINESS].includes(targetType!);
    // Ask Description
    //  1.  对于Startup pitch为必须
    // 2.  对于Capitail Raising，Equity, Sell A Business为非必须
    // 3.  对于Partnerships因为不显示 所以不存在校验
    const isAckDescriptionRequired = targetType == DealType.STARTUP_PITCH
    const isAckDescriptionHidden = targetType == DealType.PARTNERSHIPS
    let config: FormConfig = {
      sub_title: {
        defaultValue: defaultValues?.['sub_title'],
        label: 'Sub-heading',
        schema: Yup.string().max(50).min(2),
        fieldConfig: {
          required: true,
        },
        wrapper: ({ children }) => {
          return (
            <FromWrapper
              isShowDivider={false}
              name="Deal details"
              tipInfo="The Sub-heading is your opportunity to complete the headline with a punchy and
                          brief description. This is your chance to provide a little more context or
                          excitement about your deal. Think of it as a tagline that adds flavor to your
                          Deal Title. Keep it concise but compelling, giving potential investors or
                          partners a sneak peek into what makes your opportunity special. Make them want
                           to read more!"
            >
              {children}
            </FromWrapper>
          );
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
        wrapper: ({ children }) => {
          return <FromWrapper>{children}</FromWrapper>;
        },
      },
      highlights: {
        name: 'components.highlights',
        defaultValue: defaultValues?.['components']?.['highlights'] || ["", "", ""],
        label: 'Highlights',
        type: 'multiple',
        fieldConfig: {
          addLabel: 'Add highlight',
          label: 'highlights',
          validateFunc: (file) => {
            let flag = true;
            let info = '';
            if (file.size > 6 * 1024 * 1024) {
              flag = false;
              info =
                'The file size cannot be larger than 2M';
            }
            return [flag, info];
          },
          itemFieldConfig: {
            label: "Enter highlights",
            required: true,
          },
        },
        schema: Yup.array().of(Yup.string().max(200).required("This is a required field")).test({
          test(value, ctx) {
            if (
              value!?.length >= 3
            ) {
              return true;
            } else {
              return ctx.createError({ message: 'You need to create at least 3 Highlights!' });
            }
          },
        }),
        wrapper: ({ children }) => {
          return (
            <FromWrapper
              name="Highlights"
              tipInfo="This is your chance to grab attention quickly. Use bullet points to highlight
              the key features or benefits of your deal. Keep it concise and impactful.
              Minimum 3."
            >
              {children}
            </FromWrapper>
          );
        },
      },
      amount: {
        defaultValue: defaultValues?.['amount'] || '0',
        schema: [DealType.CAPITAL_RAISING, DealType.SELL_A_BUSINESS].includes(type!)
          ? Yup.number().min(0, 'Amount must be greater than or equal to 0')
          : null,
        fieldConfig: {
          required: isAckRequired,
          type: 'number',
        },
        label: `Amount ${[DealType.CAPITAL_RAISING, DealType.SELL_A_BUSINESS].includes(type!) ? '' : '(optional)'
          }`,
        wrapper: ({ children }) => {
          return (
            <FromWrapper
              isShowDivider={false}
              name="Ask"
              tipInfo="Be explicit about what you're seeking from potential investors or partners.
              Whether it's funding, expertise, resources, or something else, clarity is
              key."
            >
              {children}
            </FromWrapper>
          );
        },
      },
      ask_desc: {
        isHidden: isAckDescriptionHidden,
        defaultValue: defaultValues?.['ask_desc'] || '',
        schema: Yup.string().max(1000, 'Description must be less than 1000 characters'),
        fieldConfig: {
          multiline: true,
          minRows: 4,
          type: 'textarea',
          required: isAckDescriptionRequired,
        },
        label: `Ask Description ${[DealType.STARTUP_PITCH].includes(type!) ? '' : '(optional)'}`,
        wrapper: ({ children }) => {
          return <FromWrapper isShowDivider={true}>{children}</FromWrapper>;
        },
      },
      pics: {
        type: 'upload',
        label: 'Upload logo (optional)',
        name: 'components.pics',
        defaultValue: defaultValues?.['components']?.['pics'] || [],
        schema: Yup.array().test({
          test(value, ctx) {
            if (
              value!?.length >= 3
            ) {
              return true;
            } else {
              return ctx.createError({ message: 'You need to create at least 3 Pictures!' });
            }
          },
        }),
        fieldConfig: {
          isCrop: true,
          multiple: true,
          validateFunc: (file) => {
            let flag = true;
            let info = '';
            if (file.size > 6 * 1024 * 1024) {
              flag = false;
              info =
                'The file size cannot be larger than 6M';
            }
            return [flag, info];
          },
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
            })
            return fileUrl;
          },
        },
      },
      logo: {
        type: 'upload',
        label: 'Upload logo (optional)',
        name: 'components.logo',
        defaultValue: defaultValues?.['components']?.['logo'] || null,
        fieldConfig: {
          required: true,
          sx: {
            width: '200px',
          },
          multiple: false,
          validateFunc: (file) => {
            let flag = true;
            let info = '';
            if (file.size > 2 * 1024 * 1024) {
              flag = false;
              info =
                'The file size cannot be larger than 2M';
            }
            return [flag, info];
          },
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

    return config
  }, [allPrimeCategory, defaultValues, targetType]);
};
