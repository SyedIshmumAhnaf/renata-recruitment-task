import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

interface Customer {
  ID: number;
  'Customer Name': string;
  Division: string;
  Gender: string;
  MaritalStatus: string;
  Age: number;
  Income: number;
}

interface CustomerTableProps {
  customers: Customer[];
  userRole: string | null;
  refreshCustomers: () => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, userRole, refreshCustomers }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Customer>>({});

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.ID);
    setEditValues({
      Age: customer.Age,
      Income: customer.Income,
    });
  };

  const handleSave = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editValues),
      });
      if (!response.ok) {
        throw new Error('Failed to update customer');
      }
      setEditingId(null);
      setEditValues({});
      refreshCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Division</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Marital Status</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Income</TableCell>
            {userRole === 'Admin' && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.ID}>
              <TableCell>{customer.ID}</TableCell>
              <TableCell>{customer['Customer Name']}</TableCell>
              <TableCell>{customer.Division}</TableCell>
              <TableCell>{customer.Gender}</TableCell>
              <TableCell>{customer.MaritalStatus}</TableCell>
              <TableCell>
                {editingId === customer.ID ? (
                  <TextField
                    type="number"
                    value={editValues.Age}
                    onChange={(e) => setEditValues({ ...editValues, Age: Number(e.target.value) })}
                    size="small"
                  />
                ) : (
                  customer.Age
                )}
              </TableCell>
              <TableCell>
                {editingId === customer.ID ? (
                  <TextField
                    type="number"
                    value={editValues.Income}
                    onChange={(e) => setEditValues({ ...editValues, Income: Number(e.target.value) })}
                    size="small"
                  />
                ) : (
                  formatCurrency(customer.Income)
                )}
              </TableCell>
              {userRole === 'Admin' && (
                <TableCell>
                  {editingId === customer.ID ? (
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleSave(customer.ID)}
                        color="primary"
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={handleCancel}
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(customer)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable; 