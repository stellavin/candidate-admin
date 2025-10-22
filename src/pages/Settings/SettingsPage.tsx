import { Box, Typography, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useThemeMode } from '@/app/providers/ThemeProvider';
import styles from './SettingsPage.module.css';

/**
 * Settings page component.
 * Displays application settings including theme, profile, and app information.
 * @returns {JSX.Element} Settings page with configuration options
 */
export function SettingsPage() {
  const { mode } = useThemeMode();

  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom className={styles.title}>
        Settings
      </Typography>

      <Paper className={styles.section} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom className={styles.sectionTitle}>
          Appearance
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem>
            <ListItemText
              primary="Theme Mode"
              secondary={`Currently using ${mode} mode. Use the theme toggle in the header to switch.`}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper className={styles.section} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom className={styles.sectionTitle}>
          Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary="admin@example.com"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Role"
              secondary="Administrator"
            />
          </ListItem>
        </List>
      </Paper>

      <Paper className={styles.section} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom className={styles.sectionTitle}>
          Application Info
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem>
            <ListItemText
              primary="Version"
              secondary="1.0.0"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Build"
              secondary="Production"
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

