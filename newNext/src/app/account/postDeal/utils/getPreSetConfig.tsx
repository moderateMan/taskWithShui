import { FormConfig, getValueByPath } from 'src/muiEazy';
import { FromWrapper } from '../components/wrapper';
import * as Yup from 'yup'

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
  return {
    [name + '.title']: {
      defaultValue: getValueByPath(str, defaultValues, {})?.title || '',
      label: 'Title (optional)',
      schema: Yup.string().max(50),
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
      schema: Yup.string().max(1000),
      wrapper: ({ children }) => {
        return <FromWrapper isShowDivider={true}>{children}</FromWrapper>;
      },
      watch(props) {
        const { info: { name: eventName, type }, values } = props;
        const title = getValueByPath(str, values, {})?.title
        if (eventName == name + '.title') {
          if (title) {
            props.currentConfig.fieldConfig!.required = true
            props.currentConfig.label = 'Body text'
          } else {
            props.currentConfig.fieldConfig!.required = false
            props.currentConfig.label = 'Body text (optional)'
          }
        }
      }
    },
  };
};
