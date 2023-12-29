import { Stack, Typography } from '@mui/material';
import { DividerNode, TypographyNode } from '../styles';
import IconTip from 'src/common/components/icon-tip';

export const FromWrapper = ({
  name,
  tipInfo,
  children,
  isShowDivider = true,
}: {
  name?: string;
  tipInfo?: string;
  children: React.ReactNode;
  isShowDivider?: boolean;
}) => {
  return (
    <>
      {name && (
        <Stack alignItems={'center'} direction="row" spacing={2}>
          <TypographyNode>
            {name}
            {tipInfo && (
              <IconTip
                info={
                  <Typography
                    sx={{
                      color: '#59745D',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '18px',
                    }}
                  >
                    {tipInfo}
                  </Typography>
                }
              />
            )}
          </TypographyNode>
        </Stack>
      )}
      {children}
      {isShowDivider && <DividerNode />}
    </>
  );
};
