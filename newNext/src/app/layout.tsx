import 'mui-eazy/dist/style.css';
import Script from 'next/script';
import MotionLazy from 'src/commonOld/components/animate/motion-lazy';
import MessageProvider from 'src/commonOld/components/message';
import ProgressBar from 'src/commonOld/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from 'src/commonOld/components/settings';
import 'src/global.css';
import { LocalizationProvider } from 'src/locales';
import NotificationProvider from 'src/service/notificationProvider';
import ServiceProvider from 'src/service/serviceProvider';
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
import { Session } from '@talkjs/react';
import { talkjs_token } from 'configs';
import { useTalkJSSession } from 'src/service/talkjsProvider';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Scaling',
  description: 'We are striving to serve the SMEs.',
  keywords: 'SMEs,service,platform,membership,business,community',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {

  return (
    <html lang="en" className={primaryFont.className}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-39H5XT7LPV" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-39H5XT7LPV');
        `}
      </Script>
      <body>
        <Script
          id="ze-snippet"
          src="https://static.zdassets.com/ekr/snippet.js?key=a1e639ba-bd15-435e-ae24-153bdcc74c8d"
        ></Script>

        <NotificationProvider>
          <ServiceProvider>
            <LocalizationProvider>
              <SettingsProvider
                defaultSettings={{
                  themeMode: 'light', // 'light' | 'dark'
                  themeDirection: 'ltr', //  'rtl' | 'ltr'
                  themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                }}
              >
                <ThemeProvider>
                  <MotionLazy>
                    <ProgressBar />
                    <SettingsDrawer />
                    <MessageProvider> {children}</MessageProvider>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </ServiceProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
