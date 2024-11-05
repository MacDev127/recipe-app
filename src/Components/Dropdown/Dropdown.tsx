import React from 'react';

interface DropdownProps {
  label: string;
  options: { idIngredient: string; strIngredient: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onChange,
  placeholder = 'Select an option',
}) => {
  return (
    <div className="dropdown-category">
      <label htmlFor={label}>{label}</label>
      <select
        id={label}
        onChange={(e) => onChange(e.target.value)}
        defaultValue=""
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.idIngredient} value={option.strIngredient}>
            {option.strIngredient}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
