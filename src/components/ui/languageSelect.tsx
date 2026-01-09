import {
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface LanguageOption {
  label: string;
  value: string;
}

interface LanguageSelectProps {
  fullWidth?: boolean;
}

export default function LanguageSelect({
  fullWidth = true,
}: LanguageSelectProps) {
  const { i18n } = useTranslation();

  const languages: LanguageOption[] = [
    { label: "English", value: "en-US" },
    { label: "Italiano", value: "it" },
  ];

  const handleChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <Select
        value={i18n.language}
        onChange={handleChange}
        size="small"
        MenuProps={{
          disableScrollLock: true,
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.value} value={lang.value}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
