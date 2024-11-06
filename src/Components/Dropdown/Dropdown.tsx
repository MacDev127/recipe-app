import React from 'react';
import './Dropdown.css';
import Select, { SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface DropdownProps {
  label: string;
  options: { idIngredient: string; strIngredient: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}
type IngredientOption = {
  value: string;
  label: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onChange,
  placeholder = 'Select an option',
}) => {
  // Map options to the structure that react-select expects
  const formattedOptions = options.map((option) => ({
    value: option.idIngredient,
    label: option.strIngredient,
  }));

  return (
    <div className="dropdown" style={{ width: '290px', padding: '10px' }}>
      <label htmlFor={label}>{label}</label>
      <Select
        options={formattedOptions}
        components={animatedComponents}
        placeholder={placeholder}
        onChange={(selectedOption) =>
          onChange(
            (selectedOption as SingleValue<IngredientOption>)?.value || ''
          )
        }
        isClearable
      />
    </div>
  );
};

export default Dropdown;
