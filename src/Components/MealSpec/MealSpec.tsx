import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

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
    <div className="meal-spec">
      {/* Meal Category Dropdown using your existing Dropdown component */}
      <Dropdown
        label="Meal Category"
        options={categoryOptions}
        onChange={(value) => setMealCategory(value)} // This will pass the category name
        placeholder="Select a Category"
      />

      {/* People Count Input */}
      <label htmlFor="people-count">Number of People:</label>
      <input type="number" id="people-count" min="1" />

      {/* Cooking Time Input */}
      <label htmlFor="cooking-time">Cooking Time (minutes):</label>
      <input type="number" id="cooking-time" min="1" />
    </div>
  );
};

export default MealSpec;
