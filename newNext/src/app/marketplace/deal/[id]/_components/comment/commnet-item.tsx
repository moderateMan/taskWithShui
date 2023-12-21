import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Iconify } from 'mui-eazy';
import { useState } from 'react';
import { fDate } from 'src/common/utils/format-time';
import notify from 'src/common/utils/notify';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { useFlatInject } from 'src/service';
import { IComment } from 'src/service/stores/commentStore/model';
import { primaryFont } from 'src/theme/typography';

// ----------------------------------------------------------------------

const AVATAR_SIZE = '48px';

const WIDTH = `calc(100% - ${AVATAR_SIZE + 20}px)`;

type IProps = Partial<IComment>;

interface Props extends IProps {
  hasReply?: boolean;
}

export default function ReviewItem({
  deal_id,
  user_name,
  content,
  created_at,
  hasReply,
  avatar,
  likes = 0,
  id,
}: Props) {
  const { createReplyAct, likeDealByIDAct, findByDealIDAct } = useFlatInject('commentStore');
  const { dealDetail } = useFlatInject('ecommerceStore');
  const openReply = useBoolean();
  const helpfulClicked = useBoolean();

  const [reply, setReply] = useState<string>('');

  return (
    <>
      <Stack
        direction="row"
        sx={{
          py: 3,
          alignItems: 'flex-start',
          ...(hasReply && {
            ml: '40px',
            width: WIDTH,
          }),
        }}
      >
        <Avatar
          alt={user_name}
          src={avatar}
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, mr: 2.5 }}
        />

        <Stack sx={{ width: 1 }}>
          <Stack
            spacing={1}
            alignItems={{ sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ sm: 'space-between' }}
          >
            <Typography
              fontFamily={primaryFont.style.fontFamily}
              fontSize={'14px'}
              fontStyle={'normal'}
              fontWeight={600}
              lineHeight={'22px'}
              sx={{
                color: '#14417D',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              {user_name}
            </Typography>
          </Stack>

          {created_at && (
            <Typography
              fontFamily={primaryFont.style.fontFamily}
              fontSize={'14px'}
              fontStyle={'normal'}
              fontWeight={400}
              lineHeight={'22px'}
              sx={{
                mb: 1,
                mt: { xs: 1, sm: 0.5 },
                color: 'text.disabled',
              }}
            >
              {fDate(created_at)}
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{
              color: hasReply ? '#14417D' : 'black',
            }}
          >
            {content}
          </Typography>

          {!hasReply && (
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <Button
                size="small"
                color={helpfulClicked.value ? 'primary' : 'inherit'}
                onClick={() => {
                  helpfulClicked.onToggle();
                  likeDealByIDAct({
                    comment_id: id || 0,
                  });
                }}
                startIcon={<Iconify icon="carbon:thumbs-up" />}
                sx={{
                  fontWeight: 'blod',
                  color: '#14417D',
                  fontSize: '13px',
                }}
              >
                Like ({likes})
              </Button>

              <Box
                sx={{
                  width: 4,
                  height: 4,
                  bgcolor: 'text.disabled',
                  borderRadius: '50%',
                }}
              />

              <Button
                size="small"
                sx={{
                  fontWeight: 'blod',
                  color: '#14417D',
                  fontSize: '13px',
                }}
                onClick={async () => {
                  openReply.onToggle();
                  if (reply === '') {
                    return;
                  }

                  if (openReply.value && id && deal_id) {
                    if (reply?.length < 2) {
                      notify.error('Please write a comment');
                    } else {
                      await createReplyAct({
                        content: reply,
                        deal_id: deal_id || 0,
                        parent_id: id || 0,
                      });
                      await findByDealIDAct({
                        deal_id: deal_id || 0,
                      });
                      setReply('');
                      notify.success('Reply review successfully!');
                    }
                  }
                }}
              >
                {openReply.value ? 'Send Reply' : 'Reply'}
              </Button>
            </Stack>
          )}

          {!hasReply && openReply.value && (
            <TextField
              fullWidth
              hiddenLabel
              placeholder="Write reply..."
              InputProps={{ sx: { height: 48 } }}
              sx={{ mt: 3 }}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          )}
        </Stack>
      </Stack>

      <Divider sx={{ ml: 'auto', width: WIDTH }} />
    </>
  );
}
