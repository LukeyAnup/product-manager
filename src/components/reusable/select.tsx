import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectComponentProps {
  label?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  fullWidth?: boolean;
}

export default function SelectComponent({
  label,
  value,
  onChange,
  options,
  fullWidth = true,
}: SelectComponentProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;

    const option = options.find((o) => String(o.value) === selectedValue);
    if (option) {
      onChange(option.value);
    }
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select value={String(value)} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={String(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
