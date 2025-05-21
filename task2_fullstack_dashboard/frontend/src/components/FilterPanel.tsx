import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

interface FilterPanelProps {
  divisions: string[];
  genders: string[];
  selectedDivision: string;
  selectedGender: string;
  onDivisionChange: (value: string) => void;
  onGenderChange: (value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  divisions,
  genders,
  selectedDivision,
  selectedGender,
  onDivisionChange,
  onGenderChange,
}) => {
  const handleReset = () => {
    onDivisionChange('all');
    onGenderChange('all');
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Division</InputLabel>
        <Select
          value={selectedDivision}
          label="Division"
          onChange={(e) => onDivisionChange(e.target.value)}
        >
          <MenuItem value="all">All Divisions</MenuItem>
          {divisions.map((division) => (
            <MenuItem key={division} value={division}>
              {division}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={selectedGender}
          label="Gender"
          onChange={(e) => onGenderChange(e.target.value)}
        >
          <MenuItem value="all">All Genders</MenuItem>
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        fullWidth
        onClick={handleReset}
        sx={{ mt: 2 }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterPanel; 