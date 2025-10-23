import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { cleanPath } from '../utils/queryParams.utils';
import { AppLink } from './AppLink';
import { ImageWrapper } from './ImageWrapper';

/**
 * Top navigation bar component
 */
export const TopBar: React.FC = () => {
  return (
    <AppBar
      color="default"
      position="static"
      component="nav"
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderBottomColor: 'grey.300',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <AppLink to="/">
            <ImageWrapper height={40}>
              <img
                src={cleanPath(`${import.meta.env.BASE_URL}/dwr-logo.jpg`)}
              />
            </ImageWrapper>
          </AppLink>
          <AppLink to="/">
            <Typography variant="h6" component="div" fontWeight="bold">
              HRL Data Platform
            </Typography>
          </AppLink>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              alignItems: 'center',
              paddingLeft: '20px',
            }}
          >
            <AppLink to="/about">
              <Typography variant="body1" component="div">
                About
              </Typography>
            </AppLink>
            <AppLink to="/reports">
              <Typography variant="body1" component="div">
                Reports
              </Typography>
            </AppLink>
            <AppLink to="/learning-hub">
              <Typography variant="body1" component="div">
                Learning Hub
              </Typography>
            </AppLink>
          </Stack>
        </Stack>
        <IconButton size="large" edge="start" color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
