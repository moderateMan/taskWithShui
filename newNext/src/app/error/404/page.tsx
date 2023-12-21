import NotFoundView from 'src/app/_views/not-found-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: '404 Page Not Found!',
};

export default function NotFoundPage() {
  return <NotFoundView />;
}
