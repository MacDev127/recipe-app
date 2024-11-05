import React from 'react';
import Dropdown from '../../Components/Dropdown/Dropdown';

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
  additionalIngredients,
  handleMainIngredientChange,
  toggleAdditionalIngredient,
  dropdownOptions,
}) => (
  <div className="ingredient-selection">
    <h2>Select a Main Ingredient</h2>
    <div className="ingredients">
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

    <h4>Selected Ingredients</h4>
    <p>Main Ingredient: {mainIngredient}</p>
    <p>Additional Ingredients: {additionalIngredients.join(', ')}</p>

    {mainIngredient && (
      <>
        <h2>Add Additional Ingredients</h2>
        <div className="ingredients">
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
