import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectYear({ year, onChange }) {

  const rendering = () => {
    const result = [];
    const thisYear = new Date().getFullYear();

    for (let i = thisYear; i >= 2022; i--) {
      result.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return result;
  };

  return (
    <FormControl sx={{minWidth: 180 }}>
      <InputLabel id="demo-select-small-label">년도</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-simple-select"
        value={year}
        label="년도"
        onChange={onChange}
        sx={{fontSize: 20, p:1}}
      >
        {rendering()}
      </Select>
    </FormControl>
  );
}

export default SelectYear;