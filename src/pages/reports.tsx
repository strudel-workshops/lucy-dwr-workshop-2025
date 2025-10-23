import { Box, Container, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/reports')({
  component: Reports,
});

/**
 * Reports page - Annual Reports, Triennial Reports, publications, and Year 7 Ecological Outcomes Analysis
 */
function Reports() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Reports & Publications
        </Typography>
        <Typography variant="body1" paragraph>
          Access Annual Reports, Triennial Reports, peer-reviewed publications,
          and the Year 7 Ecological Outcomes Analysis.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Content coming soon...
        </Typography>
      </Box>
    </Container>
  );
}
