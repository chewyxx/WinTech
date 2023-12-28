import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";

const pages = ['Popular Destinations', 'My Trips'];
const settings = ['Profile','Logout'];

export default function NavBar() {
  const navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
 
      setUsername(data.user);

      return data.status
        ? null
        : (removeCookie("token"), navigate("/login"));
    };
    
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  function logout() {
    removeCookie("token");
    navigate("/login");
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const profile = () => {
    setAnchorElUser(null);
    navigate("/profile");
  };

  const popularDestinations = () => {
    setAnchorElNav(null);
    navigate("/popular-destinations");
  };

  const myTrips = () => {
    setAnchorElNav(null);
    navigate("/my-trips");
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
        popularDestinations();
    } else if (command === "My Trips") {
        myTrips();
    }
  }
  const settingsBar = (command) => {
    if (command === "Logout") {
        logout();
    } else if (command === "Profile") {
        profile();
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
            href="/"
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
                <Avatar {...stringAvatar(username)} />
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
