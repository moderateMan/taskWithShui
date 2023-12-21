import { Typography } from '@mui/material';
import { useFields } from 'mui-eazy';
import { primaryFont } from 'src/theme/typography';
import { DividerNode, TypographyNode } from '../../style';
import { useFormConfig_business, useFormConfig_media } from './config';

const YourCompanySection = ({ defaultValues }: { defaultValues: any }) => {
  const businessConfig = useFormConfig_business({
    defaultValues: defaultValues,
  });
  const mediaConfig = useFormConfig_media({
    defaultValues: defaultValues,
  });
  const { formNode: formNode0, methods: methods0 } = useFields(businessConfig, {
    sx: {
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(2, 1fr)',
      },
    },
  });
  const { formNode: formNode1, methods: methods1 } = useFields(mediaConfig, {
    sx: {
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      },
    },
  });
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
        <TypographyNode>Business information</TypographyNode>
        {formNode0}
        <DividerNode />
      </>
      <>
        <TypographyNode>Social media</TypographyNode>
        {formNode1}
        <DividerNode />
      </>
    </>
  );
};

export default YourCompanySection;
