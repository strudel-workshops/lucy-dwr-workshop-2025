import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { cleanPath } from '../utils/queryParams.utils';
import { ImageWrapper } from './ImageWrapper';

/**
 * Bottom footer component
 */
export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: 4,
      }}
    >
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="flex-end"
            >
              <Typography>California Department of Water Resources</Typography>
              <Box>
                <ImageWrapper height={70}>
                  <img
                    src={cleanPath(`${import.meta.env.BASE_URL}/dwr-logo.png`)}
                    alt="California Department of Water Resources logo"
                    style={{ objectFit: 'contain' }}
                  />
                </ImageWrapper>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
