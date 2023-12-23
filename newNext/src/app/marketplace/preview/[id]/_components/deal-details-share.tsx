import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, IconButton } from '@mui/material';
import { Iconify } from 'mui-eazy';

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  InstagramIcon,
  InstapaperShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';
import { Stack } from '@mui/system';

export default function ShareMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Iconify icon="carbon:share" />
      </IconButton> */}
      <Button
        onClick={handleClick}
        sx={{ fontSize: '16px', lineHeight: '22px', fontWeight: 400 }}
        startIcon={<Iconify icon="carbon:share" />}
      >
        Share
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <FacebookShareButton
            url={'https://github.com/next-share'}
            quote={'next-share is a social share buttons for your next React apps.'}
            hashtag={'#nextshare'}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
              <FacebookIcon size={24} round />
              <span>Share on Facebook</span>
            </Stack>
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton url={''}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
              <WhatsappIcon size={24} round />
              <span>Share on Whatsapp</span>
            </Stack>
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <InstapaperShareButton url={''}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
              <InstagramIcon size={24} round />
              <span>Share on Instagram</span>
            </Stack>
          </InstapaperShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LinkedinShareButton url={''}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
              <LinkedinIcon size={24} round />
              <span>Share on Linkedin</span>
            </Stack>
          </LinkedinShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
