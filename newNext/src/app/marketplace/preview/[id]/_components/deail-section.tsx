import { Box, Link, Stack, Typography } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { DealEntity } from 'src/types/deal';

const Bg = styled(Box)(() => ({
  padding: '32px 20px',
  width: '100%',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '24px',
  opacity: 'var(--textfield-standard-input-small-pt, 1)',
  background: 'var(--background-neutral, #F9FAFB)',
  marginBottom: '16px',
}));

const Title = styled(Typography)(() => ({
  color: '#14417D',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '30px' /* 150% */,
}));

const NameItem = styled(Typography)(() => ({
  color: '#232323',
  fontFamily: 'Public Sans',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '18px' /* 150% */,
  textTransform: 'uppercase',
  marginBottom: '8px',
}));

const InfoItem = styled(Typography)(() => ({
  color: '#232323',
  fontFamily: 'Public Sans',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px' /* 150% */,
}));

const FileItem = styled(Box)(() => ({
  borderRadius: '8px',
  background: 'var(--transparent-grey-8, rgba(145, 158, 171, 0.08))',
}));

const DeailSection = ({ deal }: { deal: DealEntity }) => {
  const { created_at, expire_at, amount, title, components, attachments = [] } = deal || {};
  return (
    <>
      <Bg>
        <Title>Deal details</Title>
        <Stack>
          <NameItem>Company name</NameItem>
          <InfoItem>Magpie Marketing</InfoItem>
        </Stack>
        <Stack>
          <NameItem>Company name</NameItem>
          <InfoItem>{`$${amount}`}</InfoItem>
        </Stack>
        {created_at && (
          <Stack>
            <NameItem>Deal posted</NameItem>
            <InfoItem>{dayjs(created_at).format('YYYY-MM-DD')}</InfoItem>
          </Stack>
        )}
        {expire_at && (
          <Stack>
            <NameItem>time Left to invest</NameItem>
            <InfoItem>{dayjs(expire_at).diff(dayjs(), 'day')} days</InfoItem>
          </Stack>
        )}
      </Bg>

      <Bg>
        <Title>Documents</Title>
        {attachments?.map((item, index) => {
          return (
            <FileItem
              sx={{
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                padding: '11px 22px',
              }}
              key={index}
            >
              <Box display={'flex'} overflow={'hidden'}>
                <Box marginRight={'8px'} component={'img'} src={'/assets/start icon.svg'} />
                <a href={item} download>
                  {item}
                </a>
              </Box>
            </FileItem>
          );
        })}
      </Bg>
    </>
  );
};

export default DeailSection;
