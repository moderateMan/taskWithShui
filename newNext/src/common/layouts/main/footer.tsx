import Button, { buttonClasses } from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { Iconify, useResponsive } from 'mui-eazy';
import { useMemo } from 'react';
import Logo from 'src/commonOld/components/logo';
import { useBoolean } from 'src/commonOld/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { usePathname } from 'src/routes/hooks';
import { navConfig, pageLinks } from './config-navigation';
import { NavListProps } from './nav/types';

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

// ----------------------------------------------------------------------

const NewFooter = (props: { mdUp: boolean }) => {
  const containerMargin = useMemo(() => {
    if (props.mdUp) {
      return { paddingTop: '80px', paddingBottom: '80px' };
    } else {
      return { paddingTop: '48px', paddingBottom: '48px' };
    }
  }, [props.mdUp]);

  const titleStyle = {
    color: '#14417D',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '28px',
  };

  return (
    <Container sx={{...containerMargin, color: '#2E2E2E'}}>
      <Stack direction={props.mdUp ? 'row' : 'column-reverse'} gap={props.mdUp ? '220px' : '48px'}>
        <Stack width={'368px'}>
          <Typography sx={titleStyle}>scaling</Typography>
          <Typography sx={{ marginTop: '16px', marginBottom: '40px' }}>
            The starting point for your next project based on easy-to-customize Material-UI © helps
            you build apps faster and better.
          </Typography>
          <Stack direction={'row'} gap={'16px'}>
            <Button sx={{ width: '146px' }} variant="outlined">
              Sign up/ Login
            </Button>
            <Button
              sx={{ width: '146px' }}
              variant="contained"
              startIcon={<Iconify icon={'carbon:rocket'} />}
            >
              Post a deal
            </Button>
          </Stack>
        </Stack>
        <Stack direction={props.mdUp ? 'row' : 'column'} gap={props.mdUp ? '24px' : '48px'}>
          <Stack gap={'20px'} width={'215px'}>
            <Typography sx={titleStyle}>Discover</Typography>
            <Typography>Home</Typography>
            <Typography>About</Typography>
            <Typography>Find Deals</Typography>
            <Typography>FAQ</Typography>
          </Stack>
          <Stack gap={'20px'} width={'215px'}>
            <Typography sx={titleStyle}>Social</Typography>
            <Typography>Instagram</Typography>
            <Typography>LinkedIn</Typography>
            <Typography>Facebook</Typography>
          </Stack>
          <Stack gap={'20px'} width={'215px'}>
            <Typography sx={titleStyle}>Legal</Typography>
            <Typography>Terms of service</Typography>
            <Typography>Cookie notice</Typography>
            <Typography>Community & content guidelines</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default function Footer() {
  const mdUp = useResponsive('up', 'md');

  const pathname = usePathname();

  const mobileList = navConfig.find((i) => i.title === 'Pages') || [];

  const desktopList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const renderLists = mdUp ? desktopList : mobileList;

  const isHome = pathname === '/';

  const simpleFooter = (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Logo single />

      <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
        © 2023. All rights reserved
      </Typography>
    </Container>
  );

  const mainFooter = (
    <>
      <Divider />

      <NewFooter mdUp={mdUp} />

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2023. All rights reserved
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Help Center
            </Link>

            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }: { list: NavListProps }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function ListMobile({ list }: { list: NavListProps }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function AppStoreButton({ ...other }: StackProps) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
      <StyledAppStoreButton startIcon={<Iconify icon="ri:apple-fill" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download on the
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Apple Store
          </Typography>
        </Stack>
      </StyledAppStoreButton>

      <StyledAppStoreButton startIcon={<Iconify icon="logos:google-play-icon" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download from
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Google Play
          </Typography>
        </Stack>
      </StyledAppStoreButton>
    </Stack>
  );
}
