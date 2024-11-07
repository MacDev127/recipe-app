import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Ingredients.css';
import Title from '../Title/Title';
import { IngredientSelectionProps, OptionType } from './ingredientTypes';

const IngredientSelection: React.FC<IngredientSelectionProps> = ({
  selectedIngredients,
  handleIngredientSelect,
  dropdownOptions,
}) => {
  return (
    <div className="ingredient__selection">
      <div className="ingredient__selection-section">
        <Title>Select Ingredients</Title>

        <div className="ingredient__selection--dropdown-container">
          {/* Map through each dropdown option provided in the props */}
          {dropdownOptions.map(({ label, options, placeholder }) => (
            <Dropdown
              key={label}
              label={label}
              options={options}
              onChange={(selectedOptions) => {
                // get values from selected options
                const selectedValues = (
                  (selectedOptions as unknown as OptionType[] | null) || []
                ).map((option) => {
                  if (
                    option &&
                    typeof option === 'object' &&
                    'value' in option
                  ) {
                    return option.value as string;
                  }
                  return option as unknown as string;
                });

                // Update the selected ingredients without duplicates
                handleIngredientSelect([
                  ...new Set([...selectedIngredients, ...selectedValues]),
                ]);
              }}
              placeholder={placeholder}
              isMulti={true}
              selectedValues={selectedIngredients}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientSelection;
