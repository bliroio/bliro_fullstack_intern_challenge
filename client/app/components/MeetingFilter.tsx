import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

interface MeetingFilterProps {
  filter: string;
  sort: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

const MeetingFilter: React.FC<MeetingFilterProps> = ({ filter, sort, onFilterChange, onSortChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: "2rem", marginBottom: '1rem', p: 1 }}>
      <TextField 
        label="Filter by title" 
        value={filter} 
        onChange={event => onFilterChange(event.target.value.toLowerCase())} 
        helperText="Enter a title to filter meetings"
      />
      <FormControl>
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select 
          labelId="sort-label" 
          value={sort} 
          onChange={event => onSortChange(event.target.value)}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="participants">Number of Participants</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MeetingFilter;
