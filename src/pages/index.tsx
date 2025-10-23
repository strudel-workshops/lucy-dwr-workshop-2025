import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import { AppLink } from '../components/AppLink';
import { ImageWrapper } from '../components/ImageWrapper';

export const Route = createFileRoute('/')({
  component: Index,
});

/**
 * Home page component that renders at the root route /
 */
function Index() {
  const PaperWithHover: React.FC<PropsWithChildren> = ({ children }) => (
    <Paper
      sx={{
        padding: 2,
        transition: '0.25s',
        '&:hover': {
          backgroundColor: 'grey.200',
        },
      }}
    >
      {children}
    </Paper>
  );

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#E3F2FD',
          height: '250px',
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Stack
            alignItems="center"
            justifyContent="center"
            height="100%"
            spacing={2}
          >
            <ImageWrapper height={80}>
              <img
                src="dwr-logo.png"
                alt="California Department of Water Resources logo"
              />
            </ImageWrapper>
            <Stack alignItems="center" spacing={0}>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                textAlign="center"
              >
                Healthy Rivers and Landscapes
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                textAlign="center"
              >
                Data Platform
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <AppLink to="/search-data-repositories">
              <PaperWithHover>
                <Stack spacing={1}>
                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    Find Data
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Search and browse HRL datasets
                  </Typography>
                </Stack>
              </PaperWithHover>
            </AppLink>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppLink to="/contribute-data">
              <PaperWithHover>
                <Stack spacing={1}>
                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    Contribute Data
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Submit data to the HRL program
                  </Typography>
                </Stack>
              </PaperWithHover>
            </AppLink>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppLink to="/explore-data">
              <PaperWithHover>
                <Stack spacing={1}>
                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    Explore Projects
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Browse habitat restoration and flow measure projects
                  </Typography>
                </Stack>
              </PaperWithHover>
            </AppLink>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppLink to="/run-computation">
              <PaperWithHover>
                <Stack spacing={1}>
                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    Run Models
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interactive modeling and scenario analysis
                  </Typography>
                </Stack>
              </PaperWithHover>
            </AppLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
