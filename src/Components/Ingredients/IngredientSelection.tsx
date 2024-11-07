import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Ingredients.css';
import Title from '../Title/Title';
import { IngredientSelectionProps, OptionType } from './ingredientTypes';

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
                  const selectedValues = (
                    (selectedOptions as unknown as OptionType[] | null) || []
                  ).map((option) => {
                    if (
                      option &&
                      typeof option === 'object' &&
                      'value' in option
                    ) {
                      return option.value as string; // Explicitly cast option.value to string
                    }
                    return option as unknown as string;
                  });

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
      )}
    </div>
  );
};

export default IngredientSelection;
