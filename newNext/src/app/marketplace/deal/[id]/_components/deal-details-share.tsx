import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { Iconify, notify } from 'src/muiEazy';

import { Stack } from '@mui/system';
import {
  FacebookIcon,
  FacebookShareButton,
  InstagramIcon,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';

export default function ShareMenu({ deal_id }: { deal_id: number }) {
  // construct the shared url
  const shared_url = `${process.env.NEXT_PUBLIC_DOMAIN_URI}/marketplace/share/${deal_id}`;

  // status of copy to clipboard
  const [copied, setCopied] = React.useState(false);

  // copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shared_url);
    setCopied(true);
  };

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
            url={shared_url}
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
          <WhatsappShareButton url={shared_url}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
              <WhatsappIcon size={24} round />
              <span>Share on Whatsapp</span>
            </Stack>
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <InstapaperShareButton url={shared_url}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
              <InstagramIcon size={24} round />
              <span>Share on Instagram</span>
            </Stack>
          </InstapaperShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LinkedinShareButton url={shared_url}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
              <LinkedinIcon size={24} round />
              <span>Share on Linkedin</span>
            </Stack>
          </LinkedinShareButton>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            copyToClipboard();
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
            <Iconify icon="iconoir:copy" sx={{ width: 24, height: 24 }} />
            <span>{copied ? <strong>Copied!</strong> : "Copy to Clipboard" }</span>
          </Stack>
        </MenuItem>
      </Menu>
    </div>
  );
}
