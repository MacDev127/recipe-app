import React from 'react';
import Select from 'react-select';
import { DropdownProps } from './dropDownTypes';
const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onChange,
  placeholder = 'Select an option',
  isMulti = false,
  selectedValues = [],
}) => {
  // Format options for react-select
  const formattedOptions = options.map((option) => ({
    value: option.idIngredient,
    label: option.strIngredient,
  }));

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    onChange(selectedValues);
  };

  return (
    <div className="dropdown" style={{ width: '290px', padding: '10px' }}>
      <label htmlFor={label}>{label}</label>
      <Select
        options={formattedOptions}
        placeholder={placeholder}
        onChange={handleChange}
        isMulti={isMulti}
        isClearable
        value={formattedOptions.filter((option) =>
          selectedValues.includes(option.value)
        )}
      />
    </div>
  );
};

export default Dropdown;
