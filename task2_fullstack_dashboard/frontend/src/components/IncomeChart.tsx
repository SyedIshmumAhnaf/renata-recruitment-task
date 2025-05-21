import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Customer {
  ID: number;
  'Customer Name': string;
  Division: string;
  Gender: string;
  MaritalStatus: string;
  Age: number;
  Income: number;
}

interface IncomeChartProps {
  customers: Customer[];
}

const IncomeChart: React.FC<IncomeChartProps> = ({ customers }) => {
  const incomeByDivision = customers.reduce((acc, customer) => {
    acc[customer.Division] = (acc[customer.Division] || 0) + customer.Income;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(incomeByDivision),
    datasets: [
      {
        label: 'Total Income by Division',
        data: Object.values(incomeByDivision),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Customer Income Distribution',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Income Distribution
      </Typography>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default IncomeChart; 