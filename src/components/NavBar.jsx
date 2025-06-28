import React, { useContext, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, MenuItem, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { userData, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = userData
    ? [
        { text: 'Dashboard', path: '/' },
        { text: 'Profile', path: '/profile-settings' },
        { text: 'Payment', path: '/payment' },
      ]
    : [
        { text: 'Login', path: '/login' },
        { text: 'Signup', path: '/signup' },
      ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ABOSS
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {userData && (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textDecoration: 'none' }} component={Link} to="/" color="inherit">
            ABOSS
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path}>
                {item.text}
              </Button>
            ))}
            {userData && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>

          <IconButton color="inherit" edge="end" sx={{ display: { sm: 'none' },justifyContent:'end' }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
