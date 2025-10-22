import { useState } from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import styles from './AdminLayout.module.css';

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box className={styles.root}>
      <Header onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={handleDrawerClose} />

      <Box component="main" className={styles.main} sx={{ bgcolor: 'background.default' }}>
        <Toolbar />
        
        <Container maxWidth={false} className={styles.content}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

