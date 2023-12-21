import MainLayout from 'src/common/layouts/main';
import HomeView from './_views/landing-view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <MainLayout>
      <HomeView />
    </MainLayout>
  );
}
