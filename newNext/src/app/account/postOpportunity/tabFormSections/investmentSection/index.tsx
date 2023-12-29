import { Typography } from '@mui/material';
import { useFields } from 'src/muiEazy';
import { primaryFont } from 'src/theme/typography';
import { DividerNode, TypographyNode } from '../../style';
import { useFormConfig_subcategorie } from './config';
import PriceCard from './common/PriceCard';
import Container from './common/PartnerStepContainer.style';

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
        <TypographyNode>Investment</TypographyNode>
        <Container>
          <div className="card-area-desktop">
            <div className="wrapper">
              <PriceCard className="each" title={'National'}></PriceCard>
              <PriceCard className="each" title={'State'}></PriceCard>
              <PriceCard className="each" title={'Regional'}></PriceCard>
              <PriceCard className="each" title={'Area'}></PriceCard>
            </div>
          </div>
        </Container>
      </>
    </>
  );
};

export default SubcategoriesSection;
