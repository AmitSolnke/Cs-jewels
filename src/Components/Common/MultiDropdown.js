import CancelIcon from '@mui/icons-material/Cancel';
import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { genderList } from '../../utilities/filterContants';

export default function MultiDropdown({ genders, setGenders }) {
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;

    setGenders(value);
  };

  return (
    <div style={{ width: '100%' }}>
      <FormControl sx={{ mt: '0.4rem', width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Gender</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={genders}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Gender" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const label =
                  genderList.find((g) => g.value === value)?.label || value;
                return (
                  <Box
                    key={value}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Chip
                      label={label}
                      sx={{
                        backgroundColor: '#6D3439',
                        color: '#fff',
                        '& .MuiChip-deleteIcon': {
                          color: '#fff',
                          transition: 'color 0.2s ease'
                        },
                        '&:hover .MuiChip-deleteIcon': {
                          color: '#ffb3b3'
                        }
                      }}
                      deleteIcon={<CancelIcon />}
                      onDelete={() => {
                        setGenders(genders.filter((g) => g !== value));
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          )}
        >
          {genderList.map((gender) => (
            <MenuItem key={gender?.label} value={gender?.value}>
              <Checkbox checked={genders.indexOf(gender?.value) > -1} />
              <ListItemText primary={gender?.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
