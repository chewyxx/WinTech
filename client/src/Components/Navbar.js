import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Popular Destinations', 'My Trips'];
const settings = ['Profile','Logout'];

export default function NavBar({ user, logout }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: '#9FEDD7',
        color: 'black'
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const navigationBar = (command) => {
    if (command === "Popular Destinations") {
        // navigate to popular destinations page (react router)
        handleCloseUserMenu();
    } else if (command === "My Trips") {
        // navigate to my trips page (react router)
        handleCloseUserMenu();
    }
  }
  const settingsBar = (command) => {
    if (command === "Logout") {
        logout();
    } else if (command === "Profile") {
        // navigate to profile page (react router)
        handleCloseUserMenu();
    }
  }

  return (
    <AppBar position="static"  style={{ background: '#026670' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BonVoyage
          </Typography>

          <Box sx={{ flexGrow: 0.03, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigationBar(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Open settings">
              <IconButton 
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true" 
                onClick={handleOpenUserMenu} 
                sx={{ p: 0 }}
              >
                <Avatar {...stringAvatar(user)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => settingsBar(setting)}>
                    <Typography textAlign="center">
                        {setting}
                    </Typography> 
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
