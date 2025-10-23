import { Box, Container, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learning-hub')({
  component: LearningHub,
});

/**
 * Learning Hub page - Educational materials, best practices, and methods documentation
 */
function LearningHub() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Learning Hub
        </Typography>
        <Typography variant="body1" paragraph>
          Educational materials, best practices, and methods documentation for
          the HRL Science Program.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Content coming soon...
        </Typography>
      </Box>
    </Container>
  );
}
