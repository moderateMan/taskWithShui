import { useState, useRef, useEffect, useCallback } from 'react';
// @mui
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { Box, Link } from '@mui/material';
import { TabView } from 'mui-eazy';

// ----------------------------------------------------------------------

export default function ScrollDialog() {
  const dialog = useBoolean();

  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const handleClickOpen = useCallback(
    (scrollType: DialogProps['scroll']) => () => {
      dialog.onTrue();
      setScroll(scrollType);
    },
    [dialog]
  );

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (dialog.value) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement) {
        descriptionElement.focus();
      }
    }
  }, [dialog.value]);

  return (
    <>
      <Link onClick={handleClickOpen('paper')} color="text.primary" href="#" underline="always">
        Terms & Conditions
      </Link>
      {` and `}
      <Link onClick={handleClickOpen('paper')} color="text.primary" href="#" underline="always">
        Privacy Policy.
      </Link>

      <Dialog
        open={dialog.value}
        onClose={dialog.onFalse}
        scroll={scroll}
        sx={{
          overflow: 'hidden',
          '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            margin: 0,
            borderRadius: 0,
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Policy</DialogTitle>

        <DialogContent
          dividers={scroll === 'paper'}
          sx={{
            overflow: 'hidden',
          }}
        >
          <TabView
            tabs={[
              {
                id: '1',
                label: 'Privacy Policy',
                node: (
                  <Box
                    sx={{
                      width: '1980px',
                      height: '1080px',
                      overflow: 'hidden',
                    }}
                  >
                    <embed
                      style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                      }}
                      type="application/pdf"
                      src={
                        'https://fileservicescaling.s3.ap-southeast-2.amazonaws.com/website_media_pic/FINAL+privacy-policy-Scaling_Version1_0_20231117.docx+(1).pdf'
                      }
                    />
                  </Box>
                ),
              },
              {
                id: '2',
                label: 'Terms & Conditions',
                node: (
                  <Box
                    sx={{
                      width: '1980px',
                      height: '1080px',
                      overflow: 'hidden',
                    }}
                  >
                    <embed
                      style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                      }}
                      type="application/pdf"
                      src={
                        'https://fileservicescaling.s3.ap-southeast-2.amazonaws.com/website_media_pic/Scaling+_+Terms+And+Conditions+-+MERGED_BB202311120_e_Version1_0.pdf'
                      }
                    />
                  </Box>
                ),
              },
            ]}
          ></TabView>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={dialog.onFalse}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
