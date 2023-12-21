'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginCoverView from './view';

// ----------------------------------------------------------------------

export default function LoginCoverPage() {
  return (
    <GoogleOAuthProvider
      clientId={'38432423945-ceavc9g6m7b5ae655hb5vblt4hns8bj1.apps.googleusercontent.com'}
    >
      <LoginCoverView />
    </GoogleOAuthProvider>
  );
}
