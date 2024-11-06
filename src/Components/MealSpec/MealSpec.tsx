import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './MealSpec.css';
import Title from '../Title/Title';

interface MealSpecProps {
  setMealCategory: (category: string) => void;
  categories: { idCategory: string; strCategory: string }[]; // Array of categories from API
}

const MealSpec: React.FC<MealSpecProps> = ({ setMealCategory, categories }) => {
  // Format categories for the Dropdown component
  const categoryOptions = categories.map((category) => ({
    idIngredient: category.idCategory,
    strIngredient: category.strCategory, // Pass category name here
  }));

  return (
    <>
      <div className="meal__spec">
        <Title>Select Meal Preferences</Title>
        <div className="meal__spec-container">
          <Dropdown
            label="Meal Category"
            options={categoryOptions}
            onChange={(value) => setMealCategory(value)} // This will pass the category name
            placeholder="Select a Category"
          />
          <Dropdown
            label="Number of People"
            options={[
              { idIngredient: '1-3', strIngredient: '1-3' },
              { idIngredient: '3-5', strIngredient: '3-5' },
              { idIngredient: '5+', strIngredient: '5+' },
            ]}
            placeholder="Select number of people"
            onChange={() => {}}
          />

          <Dropdown
            label="Cooking Time"
            onChange={() => {}}
            options={[
              { idIngredient: '<15', strIngredient: 'Less than 15 mins' },
              { idIngredient: '<30', strIngredient: 'Less than 30 mins' },
              { idIngredient: '<1hr', strIngredient: 'Less than 1 hour' },
              { idIngredient: '1hr+', strIngredient: '1 hour or more' },
            ]}
            placeholder="Select cooking time"
          />
        </div>

        {/* People Count Input */}
      </div>
    </>
  );
};

export default MealSpec;
