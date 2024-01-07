import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(option, optionChosen, theme) {
  return {
    fontWeight:
      optionChosen.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({options, label, onChange, chosen}) {
  const theme = useTheme();
  
  const [optionChosen, setOptionChosen] = React.useState([]);
  if (chosen !== optionChosen && chosen !== undefined && chosen !== null && chosen.length !== 0) {
    setOptionChosen(chosen)
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setOptionChosen(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    onChange(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 400, bgcolor: "#C9E0E7", borderRadius: 2 }}>
        <InputLabel id="demo-multiple-chip-label"><Typography sx ={{ color: "grey" }}>{label}</Typography></InputLabel>
        <Select
          sx={{boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }}}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          autoWidth
          value={optionChosen}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label}/>}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, optionChosen, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}