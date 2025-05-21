import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Container,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import CustomerTable from './CustomerTable';
import IncomeChart from './IncomeChart';
import GenderChart from './GenderChart';
import FilterPanel from './FilterPanel';

const Dashboard: React.FC = () => {
  const { userRole, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value);
    filterCustomers(value, selectedGender);
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
    filterCustomers(selectedDivision, value);
  };

  const filterCustomers = (division = selectedDivision, gender = selectedGender) => {
    const filtered = customers.filter(customer =>
      (division === 'all' || customer.Division === division) &&
      (gender === 'all' || customer.Gender === gender)
    );
    setFilteredCustomers(filtered);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Customer Dashboard
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <FilterPanel
                divisions={Array.from(new Set(customers.map(customer => customer.Division)))}
                genders={Array.from(new Set(customers.map(customer => customer.Gender)))}
                selectedDivision={selectedDivision}
                selectedGender={selectedGender}
                onDivisionChange={handleDivisionChange}
                onGenderChange={handleGenderChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <CustomerTable
                customers={filteredCustomers}
                userRole={userRole}
                refreshCustomers={fetchCustomers}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <IncomeChart customers={filteredCustomers} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <GenderChart customers={filteredCustomers} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;