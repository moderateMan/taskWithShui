import MainLayout from 'src/common/layouts/main';
import SupportView from './view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Support',
};

export default function SupportPage() {
  return (
    <MainLayout>
      <SupportView />
    </MainLayout>
  );
}
