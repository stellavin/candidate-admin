import { Drawer, Toolbar, Box, Divider, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, Settings } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { ROUTES } from '@/lib/constants';
import styles from './Sidebar.module.css';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

function NavItem({ to, icon, label, onClick }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <ListItemButton
      component={Link}
      to={to}
      onClick={onClick}
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      <ListItemIcon className={styles.icon}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const drawerContent = (
    <Box className={styles.drawerContent}>
      <Toolbar />
      
      <Box className={styles.navContainer}>
        <List>
          <NavItem
            to={ROUTES.DASHBOARD}
            icon={<Dashboard />}
            label="Dashboard"
            onClick={onClose}
          />
          <NavItem
            to={ROUTES.CANDIDATES}
            icon={<People />}
            label="Candidates"
            onClick={onClose}
          />
        </List>

        <Divider className={styles.divider} />

        <List>
          <NavItem
            to={ROUTES.SETTINGS}
            icon={<Settings />}
            label="Settings"
            onClick={onClose}
          />
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        className={`${styles.drawer} ${styles.drawerMobile}`}
        classes={{ paper: styles.drawerPaper }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        className={`${styles.drawer} ${styles.drawerDesktop}`}
        classes={{ paper: styles.drawerPaper }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

