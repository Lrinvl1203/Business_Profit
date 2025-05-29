import React from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';
import { useLanguage } from '../LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120, ml: 2 }}>
      <Select
        value={language}
        onChange={handleLanguageChange}
        sx={{
          backgroundColor: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.1)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <MenuItem value="ko">한국어</MenuItem>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="ja">日本語</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector; 