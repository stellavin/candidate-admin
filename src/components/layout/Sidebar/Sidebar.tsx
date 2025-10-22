import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { People, Settings } from '@mui/icons-material';
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

/**
 * Navigation item component with active state highlighting.
 * @param {NavItemProps} props - Component props
 * @returns {JSX.Element} Styled navigation item
 */
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
      <ListItemIcon className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`}>
        {icon}
      </ListItemIcon>
      <ListItemText 
        primary={label}
        primaryTypographyProps={{
          className: styles.navLabel,
          fontWeight: isActive ? 600 : 500
        }}
      />
    </ListItemButton>
  );
}

/**
 * Application sidebar navigation component.
 * Renders as a temporary drawer on mobile and permanent drawer on desktop.
 * @param {SidebarProps} props - Component props
 * @returns {JSX.Element} Responsive sidebar navigation
 */
export function Sidebar({ open, onClose }: SidebarProps) {
  const drawerContent = (
    <Box className={styles.drawerContent}>
      <Box className={styles.brandSection}>
        <Box className={styles.logoContainer}>
          <Typography className={styles.logoText}>
            Popp
          </Typography>
        </Box>
      </Box>
      
      <Box className={styles.navContainer}>
        <Typography variant="overline" className={styles.navLabel}>
          Main Menu
        </Typography>
        <List className={styles.navList}>
          <NavItem
            to={ROUTES.CANDIDATES}
            icon={<People />}
            label="Candidates"
            onClick={onClose}
          />
        </List>
      </Box>

      <Box className={styles.spacer} />

      <Box className={styles.bottomNav}>
        <List className={styles.navList}>
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

