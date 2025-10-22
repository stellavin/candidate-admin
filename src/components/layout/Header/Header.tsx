import { AppBar, Toolbar, IconButton, Box, Avatar, Menu, MenuItem, Divider, ListItemIcon, Typography } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7, AccountCircle, Logout, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useThemeMode } from '@/app/providers/ThemeProvider';
import { APP_NAME, ROUTES } from '@/lib/constants';
import styles from './Header.module.css';

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * Application header component with navigation menu, theme toggle, and user menu.
 * @param {HeaderProps} props - Component props
 * @returns {JSX.Element} Header with navigation controls
 */
export function Header({ onMenuClick }: HeaderProps) {
  const { mode, toggleColorMode } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    console.log('Logout clicked');
  };

  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open navigation"
          edge="start"
          onClick={onMenuClick}
          className={styles.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to={ROUTES.HOME}
          className={styles.title}
        >
          {APP_NAME}
        </Typography>

        <Box className={styles.spacer} />

        <IconButton
          color="inherit"
          onClick={toggleColorMode}
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          className={styles.themeToggle}
        >
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>

        <IconButton
          onClick={handleClick}
          size="small"
          aria-label="User menu"
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="menu"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
            <AccountCircle />
          </Avatar>
        </IconButton>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              admin@example.com
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

