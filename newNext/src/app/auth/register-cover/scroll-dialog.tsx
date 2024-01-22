import { useCallback, useEffect, useRef, useState } from 'react';
// @mui
import { Box, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { TabView } from 'src/muiEazy';

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
      <Link onClick={handleClickOpen('paper')} color="text.primary" href="#">
        Terms of Service
      </Link>
      {` and `}
      <Link onClick={handleClickOpen('paper')} color="text.primary" href="#">
        Privacy Policy.
      </Link>

      <Dialog
        open={dialog.value}
        onClose={dialog.onFalse}
        scroll={scroll}
        sx={{
          overflow: 'hidden',
          '& .MuiDialog-paper': {
            width: '80%',
            maxWidth: '80%',
            height: '80%',
            maxHeight: '80%',
            margin: 0,
            overflow: 'hidden',
            borderRadius: '10px',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Policy</DialogTitle>

        <DialogContent dividers={scroll === 'paper'}>
          <TabView
            tabs={[
              {
                id: '1',
                label: 'Privacy Policy',
                node: (
                  <Box
                    sx={{
                      width: '100%',
                      height: 'calc(80vh - 286px)',
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
                      width: '100%',
                      height: 'calc(80vh - 286px)',
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
