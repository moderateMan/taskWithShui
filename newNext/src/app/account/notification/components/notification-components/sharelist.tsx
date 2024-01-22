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

export default function CongratsShareMenu({ deal_id }: { deal_id: number }) {
  // construct the shared url
  const shared_url = `${process.env.NEXT_PUBLIC_DOMAIN_URI}/marketplace/share/${deal_id}`;

  // status of copy to clipboard
  const [copied, setCopied] = React.useState(false);

  // copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shared_url);
    setCopied(true);
  };

  return (
    <Stack direction={'row'} spacing={'5px'}>
      <FacebookShareButton
        url={shared_url}
        quote={'next-share is a social share buttons for your next React apps.'}
        hashtag={'#nextshare'}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
          <FacebookIcon size={24} round />
        </Stack>
      </FacebookShareButton>
      <WhatsappShareButton url={shared_url}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
          <WhatsappIcon size={24} round />
        </Stack>
      </WhatsappShareButton>
      <InstapaperShareButton url={shared_url}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
          <InstagramIcon size={24} round />
        </Stack>
      </InstapaperShareButton>
      <LinkedinShareButton url={shared_url}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
          <LinkedinIcon size={24} round />
        </Stack>
      </LinkedinShareButton>
      <MenuItem
        onClick={(e) => {
          copyToClipboard();
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify icon="iconoir:copy" sx={{ width: 24, height: 24 }} />
          {copied && <strong>Copied!</strong>}
        </Stack>
      </MenuItem>
    </Stack>
  );
}
