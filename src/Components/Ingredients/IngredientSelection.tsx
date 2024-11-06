import React, { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Ingredients.css';
import Title from '../Title/Title';
import { CSSTransition } from 'react-transition-group';

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
}) => {
  const [isMainIngredientSelected, setMainIngredientSelected] = useState(false);
  const [isAdditionalIngredientSelected, setAdditionalIngredientSelected] =
    useState(false);

  const handleMainIngredientSelect = (ingredientName: string) => {
    handleMainIngredientChange(ingredientName);
    setMainIngredientSelected(true);
  };

  const handleAdditionalIngredientSelect = (ingredientName: string) => {
    toggleAdditionalIngredient(ingredientName);
    setAdditionalIngredientSelected(true);
  };

  return (
    <div className="ingredient__selection">
      <CSSTransition
        in={!isMainIngredientSelected}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="ingredient__section">
          <Title>Select Main Ingredient</Title>
          <div className="ingredient__selection--dropdown-container">
            {dropdownOptions.map(({ label, options, placeholder }) => (
              <Dropdown
                key={label}
                label={label}
                options={options}
                onChange={handleMainIngredientSelect}
                placeholder={placeholder}
              />
            ))}
          </div>
        </div>
      </CSSTransition>

      {mainIngredient && (
        <CSSTransition
          in={!isAdditionalIngredientSelected}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="ingredient__section">
            <Title>Add Additional Ingredients</Title>
            <div className="ingredient__selection--dropdown-container">
              {dropdownOptions.map(({ label, options, placeholder }) => (
                <Dropdown
                  key={label}
                  label={label}
                  options={options}
                  onChange={handleAdditionalIngredientSelect}
                  placeholder={placeholder}
                />
              ))}
            </div>
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

export default IngredientSelection;
