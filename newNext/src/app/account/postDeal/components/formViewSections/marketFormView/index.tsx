import { Typography } from '@mui/material';
import { MutableRefObject, useEffect } from 'react';
import { useFields } from 'src/muiEazy';
import { primaryFont } from 'src/theme/typography';
import { FromRefType } from '../../../formViewNew';
import { useFormConfig } from './useFormConfig';
import { useFlatInject } from 'src/service';

export const MarketFormView = ({
  defaultValues = {},
  formRef,
}: {
  defaultValues: any;
  formRef: MutableRefObject<FromRefType | undefined>;
}) => {
  const formConfig = useFormConfig({ defaultValues });
  const { formNode, methods } = useFields(formConfig);
  useEffect(() => {
    formRef.current = methods;
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
