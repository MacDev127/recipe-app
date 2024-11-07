// src/types/dropdownTypes.ts

export interface DropdownOption {
  idIngredient: string;
  strIngredient: string;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  isMulti?: boolean;
  selectedValues?: string[];
}
