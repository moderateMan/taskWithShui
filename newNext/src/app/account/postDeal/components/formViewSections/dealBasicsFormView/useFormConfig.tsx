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
  const { getUploadUrlAct } = useFlatInject('dealStore');
  let hidden = [DealType.PARTNERSHIPS].includes(type!) ? true : false;
  useEffect(() => {
    categoryFindAllAct();
  }, []);
  if (defaultValues?.['sub_title']) {
  }
  return useMemo<FormConfig>(() => {
    return {
      sub_title: {
        defaultValue: defaultValues?.['sub_title'],
        label: 'Sub-heading',
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
        defaultValue: defaultValues?.['components']?.['highlights'] || null,
        label: 'Highlights',
        type: 'multiple',
        fieldConfig: {
          addLabel: 'Add highlight',
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
        defaultValue: defaultValues?.['ask_desc'] || '',
        schema: Yup.string().max(1000, 'Description must be less than 1000 characters'),
        isHidden: hidden,
        fieldConfig: {
          multiline: true,
          minRows: 4,
          type: 'textarea',
          required: [DealType.STARTUP_PITCH].includes(type!) ? true : false,
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
        fieldConfig: {
          isCrop: true,
          multiple: true,
          validateFunc: (file) => {
            let flag = true;
            let info = '';
            if (file.size < 0.7 * 1024 * 1024) {
              flag = false;
              info =
                'The file size is too small (worry that the file is too small and the quality is not good)';
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
            });
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
  }, [allPrimeCategory, defaultValues]);
};
