import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  overflow: 'hidden',
}));

const Title = styled(Typography)(() => ({
  color: '#14417D',
  fontFamily: 'Inter',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '600',
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
const InfoItemSrc = styled(Typography)(() => ({
  color: '#232323',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '24px' /* 150% */,
  ':hover': {
    cursor: 'pointer',
  },
}));
const InfoItem = styled(Typography)(() => ({
  color: '#232323',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px' /* 150% */,
  ':hover': {
    cursor: 'pointer',
  },
}));

const DeailSection = ({ deal }: { deal: DealEntity }) => {
  const { created_at, expire_at, amount, title, components, attachments = [] } = deal || {};

  return (
    <div
      style={{
        position: 'sticky',
        top: '70px',
      }}
    >
      <Bg>
        <Title>Deal details</Title>
        <Stack>
          <NameItem>Company name</NameItem>
          <InfoItem>{deal?.title}</InfoItem>
        </Stack>
        <Stack>
          <NameItem>Amount</NameItem>
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
            <Stack
              key={index}
              direction={'row'}
              sx={{
                width: '100%',
                padding: '12px 22px',
                cursor: 'pointer',
                borderRadius: '8px',
                background: `var(--transparent-grey-8, rgba(145, 158, 171, 0.08))`,
                whiteSpace: 'nowrap',
              }}
              onClick={() => {
                fetch(item);
              }}
              spacing={2}
            >
              <a
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
                href={item}
              >
                <img
                  src="https://fileservicescaling.s3.ap-southeast-2.amazonaws.com/website_media_pic/start+icon.svg"
                  alt=""
                  style={{
                    marginRight: '12px',
                  }}
                />
                <InfoItemSrc>
                  {
                    // split the url to get the file name(the last part of the url)
                    item.split('/').pop()
                  }
                </InfoItemSrc>
              </a>
            </Stack>
          );
        })}
      </Bg>
    </div>
  );
};

export default DeailSection;
