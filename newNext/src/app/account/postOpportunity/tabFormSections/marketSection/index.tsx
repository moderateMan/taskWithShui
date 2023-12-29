import { Typography } from '@mui/material';
import { useFields } from 'src/muiEazy';
import { primaryFont } from 'src/theme/typography';
import { useFormConfig_1 } from '../../form-config';
import { TypographyNode, DividerNode } from '../../style';

const MarketSection = ({ defaultValues }: { defaultValues: any }) => {
  const typeConfig = useFormConfig_1({
    defaultValues: defaultValues,
  });
  const { formNode: formNode0, methods: methods0 } = useFields(typeConfig);
  return (
    <>
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
      </>
      <>
        <TypographyNode>Choose the market you wish to service*</TypographyNode>
        {formNode0}
        <DividerNode />
      </>
    </>
  );
};

export default MarketSection;
