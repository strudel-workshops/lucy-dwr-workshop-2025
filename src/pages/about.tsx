import { Box, Container, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

/**
 * About page - Overview of the HRL Science Program
 */
function About() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          About HRL Science
        </Typography>
        <Typography variant="body1" paragraph>
          Overview of the Healthy Rivers and Landscapes Science Program.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Content coming soon...
        </Typography>
      </Box>
    </Container>
  );
}
