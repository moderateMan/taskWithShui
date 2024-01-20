import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { FormConfig, useFields } from 'src/muiEazy';
import { primaryFont } from 'src/theme/typography';
import { FromRefType } from './modal';

export const FormView = ({
  formConfig,
  formRef,
  id,
}: {
  id: string
  formRef: React.MutableRefObject<Record<PropertyKey, FromRefType>>;
  formConfig: FormConfig
}) => {

  const { formNode, methods } = useFields(formConfig);
  useEffect(() => {
    formRef.current[id] = methods;
  }, [methods]);
  return (
    <>
      <Typography
        fontFamily={primaryFont.style.fontFamily}
        fontSize={'14px'}
        fontStyle={'normal'}
        fontWeight={400}
        lineHeight={'22px'}
        mb={'24px'}
      >
        * Required information
      </Typography>
      {formNode}
    </>
  );
};
