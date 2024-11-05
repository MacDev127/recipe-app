import { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../Dropdown/Dropdown';
import {
  vegetableKeywords,
  meatKeywords,
  fruitKeywords,
  dairyKeywords,
  grainsAndLegumesKeywords,
  condimentsAndSpicesKeywords,
  oilsAndFatsKeywords,
  fishAndSeafoodKeywords,
  sweetenersAndSugarsKeywords,
  miscellaneousKeywords,
} from './ingredientKeywords';
import './Ingredients.css';

// Define the type for each ingredient
interface Ingredient {
  idIngredient: string;
  strIngredient: string;
}

const IngredientSelector = () => {
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  useEffect(() => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    axios
      .get(URL)
      .then((response) => {
        const ingredients = response.data.meals as Ingredient[];
        setAllIngredients(ingredients);
      })
      .catch((error) => console.error('Error fetching ingredients:', error));
  }, []);

  const filterByKeywords = (keywords: string[]) => {
    const filtered = allIngredients.filter((ingredient) =>
      keywords.some((keyword) =>
        ingredient.strIngredient.toLowerCase().includes(keyword)
      )
    );
    return filtered;
  };

  const vegetableOptions = filterByKeywords(vegetableKeywords);
  const meatOptions = filterByKeywords(meatKeywords);
  const fruitOptions = filterByKeywords(fruitKeywords);
  const dairyOptions = filterByKeywords(dairyKeywords);
  const grainsAndLegumesOptions = filterByKeywords(grainsAndLegumesKeywords);
  const condimentsAndSpicesOptions = filterByKeywords(
    condimentsAndSpicesKeywords
  );
  const sweetenersAndSugarsOptions = filterByKeywords(
    sweetenersAndSugarsKeywords
  );
  const oilsAndFatsOptions = filterByKeywords(oilsAndFatsKeywords);
  const fishAndSeafoodOptions = filterByKeywords(fishAndSeafoodKeywords);
  const miscellaneousOptions = filterByKeywords(miscellaneousKeywords);

  //toggle Selection
  const toggleIngredient = (ingredientName: string) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredientName)) {
        return prevSelected.filter((item) => item !== ingredientName);
      } else {
        return [...prevSelected, ingredientName];
      }
    });
  };

  return (
    <div className="container">
      <div className="ingredients">
        {/* Fruits */}
        <Dropdown
          label="Fruits"
          options={fruitOptions}
          onChange={toggleIngredient}
          placeholder="Select a fruit"
        />

        {/* Vegtables */}
        <Dropdown
          label="Vegtables"
          options={vegetableOptions}
          onChange={toggleIngredient}
          placeholder="Select Vegtables"
        />

        {/* Meat */}
        <Dropdown
          label="Meat"
          options={meatOptions}
          onChange={toggleIngredient}
          placeholder="Select Meat"
        />

        {/* Dairy*/}
        <Dropdown
          label="Dairy"
          options={dairyOptions}
          onChange={toggleIngredient}
          placeholder="Select Dairy"
        />

        {/* Oils & Fats */}
        <Dropdown
          label="Oils & Fats"
          options={oilsAndFatsOptions}
          onChange={toggleIngredient}
          placeholder="Select Oils & Fats"
        />
        {/* Grains */}
        <Dropdown
          label="Grains"
          options={grainsAndLegumesOptions}
          onChange={toggleIngredient}
          placeholder="Select Grains"
        />
        {/* Spices */}
        <Dropdown
          label="Spices & Condiments"
          options={condimentsAndSpicesOptions}
          onChange={toggleIngredient}
          placeholder="Select Spices & Condiments"
        />
        {/* Sugars */}
        <Dropdown
          label="Sugars & Sweetners"
          options={sweetenersAndSugarsOptions}
          onChange={toggleIngredient}
          placeholder="Select Sugars & Sweetners"
        />
        {/*  Seafood */}
        <Dropdown
          label="Seafood"
          options={fishAndSeafoodOptions}
          onChange={toggleIngredient}
          placeholder="Select Seafood"
        />

        {/* Miscellaneous */}
        <Dropdown
          label="Miscellaneous"
          options={miscellaneousOptions}
          onChange={toggleIngredient}
          placeholder="Miscellaneous"
        />
      </div>

      <h4>Selected Ingredients</h4>
      <div className="selected-ingredients">
        {selectedIngredients.map((ingredient) => (
          <span key={ingredient} className="selected-ingredient">
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IngredientSelector;
