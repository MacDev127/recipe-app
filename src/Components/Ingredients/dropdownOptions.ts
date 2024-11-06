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
} from './ingredientKeywords'; // Update the path if needed

const filterByKeywords = (keywords: string[]) =>
  keywords.map((keyword) => ({
    idIngredient: keyword,
    strIngredient: keyword,
  }));

const dropdownOptions = [
  {
    label: 'Fruits',
    options: filterByKeywords(fruitKeywords),
    placeholder: 'Select a fruit',
  },
  {
    label: 'Vegetables',
    options: filterByKeywords(vegetableKeywords),
    placeholder: 'Select a vegetable',
  },
  {
    label: 'Meat',
    options: filterByKeywords(meatKeywords),
    placeholder: 'Select Meat',
  },
  {
    label: 'Dairy',
    options: filterByKeywords(dairyKeywords),
    placeholder: 'Select Dairy',
  },
  {
    label: 'Oils & Fats',
    options: filterByKeywords(oilsAndFatsKeywords),
    placeholder: 'Select Oils & Fats',
  },
  {
    label: 'Grains',
    options: filterByKeywords(grainsAndLegumesKeywords),
    placeholder: 'Select Grains',
  },
  {
    label: 'Spices & Condiments',
    options: filterByKeywords(condimentsAndSpicesKeywords),
    placeholder: 'Select Spices & Condiments',
  },
  {
    label: 'Sugars & Sweeteners',
    options: filterByKeywords(sweetenersAndSugarsKeywords),
    placeholder: 'Select Sugars & Sweeteners',
  },
  {
    label: 'Seafood',
    options: filterByKeywords(fishAndSeafoodKeywords),
    placeholder: 'Select Seafood',
  },
  {
    label: 'Miscellaneous',
    options: filterByKeywords(miscellaneousKeywords),
    placeholder: 'Select Miscellaneous',
  },
];

export default dropdownOptions;
