import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
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

interface GenderChartProps {
  customers: Customer[];
}

const GenderChart: React.FC<GenderChartProps> = ({ customers }) => {
  const genderCount = customers.reduce((acc, customer) => {
    acc[customer.Gender] = (acc[customer.Gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(genderCount),
    datasets: [
      {
        data: Object.values(genderCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gender Distribution',
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Gender Distribution
      </Typography>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default GenderChart; 