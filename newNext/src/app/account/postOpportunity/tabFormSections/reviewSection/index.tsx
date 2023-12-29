import { Stack, Typography } from '@mui/material';
import { useFields } from 'src/muiEazy';
import { primaryFont } from 'src/theme/typography';
import { DividerNode, TypographyNode } from '../../style';
import { useFormConfig_business, useFormConfig_media } from './config';
import InfoItem from './infoItem';

const ReviewSection = ({ defaultValues }: { defaultValues: any }) => {
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
          About you
        </Typography>
      </>
      <>
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(6, 1fr)',
            },
          }}
        >
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
        </Stack>
        <DividerNode />
      </>
      <>
        <Typography
          fontFamily={primaryFont.style.fontFamily}
          fontSize={'14px'}
          fontStyle={'normal'}
          fontWeight={400}
          lineHeight={'22px'}
          mb={'24px'}
        >
          Your company
        </Typography>
      </>
      <>
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(6, 1fr)',
            },
          }}
        >
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
        </Stack>
        <DividerNode />
      </>
      <>
        <Typography
          fontFamily={primaryFont.style.fontFamily}
          fontSize={'14px'}
          fontStyle={'normal'}
          fontWeight={400}
          lineHeight={'22px'}
          mb={'24px'}
        >
          Subcategories
        </Typography>
      </>
      <>
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(6, 1fr)',
            },
          }}
        >
          <InfoItem></InfoItem>
          <InfoItem></InfoItem>
        </Stack>
        <DividerNode />
      </>
    </>
  );
};

export default ReviewSection;
