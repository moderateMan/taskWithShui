import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Iconify from 'src/commonOld/components/iconify';
import { useResponsive } from 'src/commonOld/hooks/use-responsive';
import { RouterLink } from 'src/routes/components';
import { useActiveLink } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import UploadAvatar from './upload-avatar';

// ----------------------------------------------------------------------
const navigations = [
  {
    title: 'Personal Info',
    path: paths.account.personal,
    icon: <Iconify icon="carbon:user" />,
  },
  {
    title: 'Favorites',
    path: paths.account.wishlist,
    icon: <Iconify icon="carbon:favorite" />,
  },
  {
    title: 'My Deals',
    path: paths.account.deals,
    icon: <Iconify icon="mdi:handshake-outline" />,
  },
  {
    title: 'Post a Deal',
    path: paths.account.postDeal,
    icon: <Iconify icon="mdi:file-chart-check" />,
  },
  // {
  //   title: 'Post a Opportunity',
  //   path: paths.account.opportunity,
  //   icon: <Iconify icon="mdi:file-chart-check" />,
  // },
  {
    title: 'Notifications',
    path: paths.account.notification,
    icon: <Iconify icon="mdi:bell-badge" />,
  },
  {
    title: 'My Connections',
    path: paths.account.connection,
    icon: <Iconify icon="mdi:human-greeting-proximity" />,
  },
];

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function Nav({ open, onClose }: Props) {
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(mdUp && {
          width: 280,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <UploadAvatar />
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavItemProps = {
  item: {
    title: string;
    path: string;
    icon: React.ReactNode;
  };
};

function NavItem({ item }: NavItemProps) {
  const active = useActiveLink(item.path);

  return (
    <Link
      component={RouterLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
      onClick={() => {
        if (paths.account.postDeal == item.path) {
          window.location.href = item.path;
        }
      }}
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}
