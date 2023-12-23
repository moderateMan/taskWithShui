import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IDealTeamMember } from 'src/types/deal';
import ElearningTeamItem from './deal-team-item';
import { Divider, Stack } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  members: IDealTeamMember[];
  title?: string;
};

export default function DealTeamAbout({ members, title }: Props) {
  return (
    <Stack
      spacing={4}
      sx={{
        py: { xs: 5, md: 2 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#14417D',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: '600',
        }}
      >
        {members?.length > 0 ? `${title} Team` : 'No Team'}
      </Typography>
      {members?.length < 5 ? (
        <Box
          sx={{
            columnGap: 3,
            display: 'flex',
            rowGap: { xs: 4, md: 5 },
            // justifyContent: 'center',
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
      <Divider
        sx={{
          marginBottom: '60px',
        }}
      />
    </Stack>
  );
}
