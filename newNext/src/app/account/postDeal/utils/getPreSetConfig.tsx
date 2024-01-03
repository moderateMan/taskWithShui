import { FormConfig, getValueByPath } from 'src/muiEazy';
import { FromWrapper } from '../components/wrapper';
import * as Yup from 'yup';
export const getPresetConfig = ({
  defaultValues = {},
  name,
  tipInfo,
  titleLabel,
}: {
  defaultValues: any;
  name: string;
  titleLabel?: string;
  tipInfo?: string;
}): FormConfig => {
  let str = name.replaceAll('.', '-');
  ;
  return {
    [name + '.title']: {
      defaultValue: getValueByPath(str, defaultValues, {})?.title || '',
      label: 'Title (optional)',
      fieldConfig: {
        required: true,
      },
      wrapper: ({ children }) => {
        return (
          <FromWrapper isShowDivider={false} name={titleLabel} tipInfo={tipInfo}>
            {children}
          </FromWrapper>
        );
      },
    },
    [name + '.sub_title']: {
      defaultValue: getValueByPath(str, defaultValues, {})?.sub_title || '',
      label: 'Body text (optional)',
      type: 'string',
      fieldConfig: {
        multiline: true,
        minRows: 4,
      },
      wrapper: ({ children }) => {
        return <FromWrapper isShowDivider={true}>{children}</FromWrapper>;
      },
    },
  };
};
