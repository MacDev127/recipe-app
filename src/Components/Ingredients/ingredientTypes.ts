// src/types/ingredientSelectionTypes.ts

export interface DropdownOption {
  idIngredient: string;
  strIngredient: string;
}

export interface DropdownOptions {
  label: string;
  options: DropdownOption[];
  placeholder: string;
}

export interface IngredientSelectionProps {
  selectedIngredients: string[];
  handleIngredientSelect: (ingredients: string[]) => void;
  dropdownOptions: DropdownOptions[];
  isSearchTriggered: boolean;
}

export interface OptionType {
  value: string; // Adjust the type if `value` is something other than a string
  label: string;
}
