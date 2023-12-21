import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { IDealTeamMember } from 'src/types/deal';
import ElearningTeamItem from './deal-team-item';

// ----------------------------------------------------------------------

type Props = {
  members: IDealTeamMember[];
};

export default function DealTeamAbout({ members }: Props) {
  return (
    <Container sx={{ py: { xs: 8, md: 15 } }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          mb: { xs: 8, md: 10 },
        }}
      >
        {members?.length > 0 ? 'Team' : 'No Team'}
      </Typography>
      {members?.length < 5 ? (
        <Box
          sx={{
            columnGap: 3,
            display: 'flex',
            rowGap: { xs: 4, md: 5 },
            justifyContent: 'center',
          }}
        >
          {members.map((member, index) => (
            <ElearningTeamItem
              sx={{
                width: 300,
              }}
              key={index}
              member={member}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            columnGap: 3,
            display: 'grid',
            rowGap: { xs: 4, md: 5 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
            },
          }}
        >
          {members?.map((member, index) => (
            <ElearningTeamItem
              sx={{
                border: '1px solid var(--components-divider, rgba(145, 158, 171, 0.24))',
                boxShadow:
                  '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
              }}
              key={index}
              member={member}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
