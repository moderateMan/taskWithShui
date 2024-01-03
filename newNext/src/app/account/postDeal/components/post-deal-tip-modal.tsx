import {
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  TypographyProps,
} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Iconify } from 'src/muiEazy/components/iconify';

interface IPostDealTipModalProps {
  open?: boolean;
  onClose?: () => void;
}

const normalTypographyProps = { color: '#141414', align: 'center' } as TypographyProps,
  boldTypographyProps = {
    variant: 'h6',
    component: 'span',
    sx: { mx: 0.8 },
  } as TypographyProps;

const steps = [
  {
    title: 'Create your deal',
    desc: (
      <Typography {...normalTypographyProps}>
        Start by choosing the type of deal you want to create, give your deal a name and click the
        <Typography {...boldTypographyProps}>Save</Typography>
        button below.
      </Typography>
    ),
    cover: '/assets/images/account/ipad_howto_01 1.png',
  },
  {
    title: 'Preview your deal',
    desc: (
      <Typography {...normalTypographyProps}>
        Next, fill out all of the mandatory fields on each tab and add optional additional
        information as you wish.
        <Typography {...boldTypographyProps}>Save</Typography>
        as you go so you won’t lose your work.
      </Typography>
    ),
    cover: '/assets/images/account/ipad_howto_02 1.png',
  },
  {
    title: 'Submit for approval',
    desc: (
      <Typography {...normalTypographyProps}>
        Lastly, when you’re ready, click the
        <Typography {...boldTypographyProps}>Submit for approval</Typography>
        button.
      </Typography>
    ),
    cover: '/assets/images/account/ipad_howto_03 1.png',
  },
  {
    title: 'Submitted',
    desc: (
      <Typography {...normalTypographyProps}>
        Your Deal will then be reviewed by the Scaling Success Team usually within 1 business day.
        If we think it needs more work, we may send it back to you with a notice advising what you
        will need to change or improve on and resubmit.
      </Typography>
    ),
    cover: '/assets/images/account/ipad_howto_04 1.png',
  },
  {
    title: 'Approved',
    desc: (
      <Typography {...normalTypographyProps}>
        Once the deal is fully approved by the team, you will receive a notification and an email
        letting you know that it is active and in Scaling.
      </Typography>
    ),
    cover: '/assets/images/account/ipad_howto_05 1.png',
  },
];

const lastStepIndex = steps.length - 1;

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'text.primary',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'text.primary',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : 'rgba(145, 158, 171, 0.24)',
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

function StepIcon(props: StepIconProps) {
  const { active, completed } = props;

  if (active)
    return <Iconify icon="fluent-mdl2:location-dot" color="text.primary" fontSize="24px" />;

  if (completed) return <Iconify icon="octicon:check-16" color="text.primary" fontSize="24px" />;

  return <Iconify icon="fluent-mdl2:location-dot" color="#696969" fontSize="24px" />;
}

export default function PostDealTipModal(props: IPostDealTipModalProps) {
  const { open, onClose } = props;
  const [stepIndex, setStepIndex] = useState(0);

  const renderStepContent = () => {
    return (
      <>
        <Box sx={{ px: 4 }}>{steps[stepIndex]?.desc}</Box>
        <img src={steps[stepIndex]?.cover} alt={steps[stepIndex]?.title} />
      </>
    );
  };
  return (
    <Stack
      justifyContent={'center'}
      sx={{
        width: '100wh',
        height: '100%',
      }}
    >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        disableEscapeKeyDown={false}
        open={!!open}
        closeAfterTransition
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Fade in={!!open}>
          <Stack
            sx={{
              bgcolor: 'background.paper',
              padding: { xs: '16px 12px', md: '30px 45px' },
              borderRadius: '10px',
              width: { xs: 0.95, md: '900px' },
              maxHeight: '95%',
              overflow: 'auto',
            }}
            alignItems={'center'}
            spacing={{ xs: 1, md: 4 }}
          >
            <Typography variant="h6" component="h2" color="#141414">
              How to create a deal.
            </Typography>
            <Box
              sx={{
                textWrap: 'nowrap',
                width: 1,
                overflow: 'auto',
                minHeight: '68px',
              }}
            >
              <Stepper alternativeLabel activeStep={stepIndex} connector={<QontoConnector />}>
                {steps.map((step) => (
                  <Step key={step.title}>
                    <StepLabel StepIconComponent={StepIcon}>{step.title}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            {renderStepContent()}
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Button
                onClick={onClose}
                sx={{
                  bgcolor: 'rgba(20, 65, 125, 0.10)',
                  color: '#14417D',
                }}
              >
                Skip help
              </Button>
              <Box>
                <Button
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={() => setStepIndex((idx) => (idx <= 0 ? 0 : idx - 1))}
                >
                  Previous
                </Button>
                {stepIndex >= lastStepIndex ? (
                  <Button variant="contained" onClick={onClose}>
                    Get started
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() =>
                      setStepIndex((idx) => (idx >= lastStepIndex ? lastStepIndex : idx + 1))
                    }
                  >
                    Next step
                  </Button>
                )}
              </Box>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </Stack>
  );
}
