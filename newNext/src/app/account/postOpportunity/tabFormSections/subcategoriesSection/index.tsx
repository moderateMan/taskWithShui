import { Typography } from '@mui/material';
import { useFields } from 'src/muiEazy';
import { primaryFont } from 'src/theme/typography';
import { DividerNode, TypographyNode } from '../../style';
import { useFormConfig_subcategorie } from './config';

const SubcategoriesSection = ({ defaultValues }: { defaultValues: any }) => {
  const subcategoriesConfig = useFormConfig_subcategorie({
    defaultValues: defaultValues,
  });

  const { formNode: formNode0, methods: methods0 } = useFields(subcategoriesConfig, {
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
        <TypographyNode>Subcategories</TypographyNode>
        {formNode0}
      </>
    </>
  );
};

export default SubcategoriesSection;
