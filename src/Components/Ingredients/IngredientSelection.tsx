import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Ingredients.css';

interface IngredientSelectionProps {
  mainIngredient: string | null;
  additionalIngredients: string[];
  handleMainIngredientChange: (ingredientName: string) => void;
  toggleAdditionalIngredient: (ingredientName: string) => void;
  dropdownOptions: {
    label: string;
    options: { idIngredient: string; strIngredient: string }[];
    placeholder: string;
  }[];
}

const IngredientSelection: React.FC<IngredientSelectionProps> = ({
  mainIngredient,
  handleMainIngredientChange,
  toggleAdditionalIngredient,
  dropdownOptions,
}) => (
  <div className="ingredient__selection">
    <h1 className="ingredient__selection-title">Select a Main Ingredient</h1>
    <div className="ingredient__selection--dropdown-container">
      {dropdownOptions.map(({ label, options, placeholder }) => (
        <Dropdown
          key={label}
          label={label}
          options={options}
          onChange={handleMainIngredientChange}
          placeholder={placeholder}
        />
      ))}
    </div>

    {mainIngredient && (
      <>
        <h2 className="ingredient__selection-subtitle">
          Add Additional Ingredients
        </h2>
        <div className="ingredient__selection--dropdown-container">
          {dropdownOptions.map(({ label, options, placeholder }) => (
            <Dropdown
              key={label}
              label={label}
              options={options}
              onChange={toggleAdditionalIngredient}
              placeholder={placeholder}
            />
          ))}
        </div>
      </>
    )}
  </div>
);

export default IngredientSelection;
