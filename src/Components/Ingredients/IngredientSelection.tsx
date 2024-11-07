import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Ingredients.css';
import Title from '../Title/Title';
import { IngredientSelectionProps } from './ingredientTypes';

const IngredientSelection: React.FC<IngredientSelectionProps> = ({
  selectedIngredients,
  handleIngredientSelect,
  dropdownOptions,
  isSearchTriggered,
}) => {
  return (
    <div className="ingredient__selection">
      {!isSearchTriggered && (
        <div className="ingredient__section">
          <Title>Select Ingredients</Title>
          <div className="ingredient__selection--dropdown-container">
            {dropdownOptions.map(({ label, options, placeholder }) => (
              <Dropdown
                key={label}
                label={label}
                options={options}
                onChange={(selectedOptions) => {
                  // Ensure selectedOptions is an array of objects with value properties
                  const selectedValues = (selectedOptions || []).map((option) =>
                    typeof option === 'object' ? option.value : option
                  );
                  handleIngredientSelect([
                    ...new Set([...selectedIngredients, ...selectedValues]),
                  ]);
                }}
                placeholder={placeholder}
                isMulti={true} // Enable multi-select functionality
                selectedValues={selectedIngredients} // Pass selected values
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSelection;
