import { Typography } from '@mui/material';
import { useFields } from 'src/muiEazy';
import { primaryFont } from 'src/theme/typography';
import { DividerNode, TypographyNode } from '../../style';
import { useFormConfig_contactDeatil, useFormConfig_address } from './config';

const AboutYouSection = ({ defaultValues }: { defaultValues: any }) => {
  const contactDeatilConfig = useFormConfig_contactDeatil({
    defaultValues: defaultValues,
  });
  const addressConfig = useFormConfig_address({
    defaultValues: defaultValues,
  });
  const { formNode: formNode0, methods: methods0 } = useFields(contactDeatilConfig, {
    sx: {
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      },
    },
  });
  const { formNode: formNode1, methods: methods1 } = useFields(addressConfig, {
    sx: {
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(2, 1fr)',
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
        <TypographyNode>Contact details</TypographyNode>
        {formNode0}
        <DividerNode />
      </>
      <>
        <TypographyNode>Address</TypographyNode>
        {formNode1}
        <DividerNode />
      </>
    </>
  );
};

export default AboutYouSection;
