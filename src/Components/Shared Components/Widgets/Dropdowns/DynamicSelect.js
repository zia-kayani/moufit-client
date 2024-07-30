import { TextField, MenuItem } from '@mui/material';
import React from 'react';

const DynamicSelect = ({ label, value, options, onChange }) => (
  <TextField
    select
    label={label}
    value={value || ''}
    onChange={onChange}
    placeholder={`Select ${label}`}
    variant="outlined"
    margin="normal"
    fullWidth
  >
    {options &&
      options.map((option) => (
        <MenuItem key={option.code} value={option.code}>
          {option.name}
        </MenuItem>
      ))}
  </TextField>
);

export default DynamicSelect;
