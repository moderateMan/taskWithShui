'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import CompactLayout from 'src/common/layouts/compactLayout';
import { MotionContainer, varBounce } from 'src/commonOld/components/animate';
import Image from 'src/commonOld/components/image';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Page Not Found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Image
            alt="404"
            src="/assets/illustrations/illustration_404.svg"
            sx={{
              mx: 'auto',
              maxWidth: 320,
              my: { xs: 5, sm: 8 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/" size="large" color="inherit" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
