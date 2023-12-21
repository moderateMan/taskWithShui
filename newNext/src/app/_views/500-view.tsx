'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import CompactLayout from 'src/common/layouts/compactLayout';
import { MotionContainer, varBounce } from 'src/commonOld/components/animate';
import Image from 'src/commonOld/components/image';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function Error500View() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Image
            alt="500"
            src="/assets/illustrations/illustration_500.svg"
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
