// RecipeAccordion.tsx
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  [key: string]: any;
}

interface RecipeAccordionProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe | null) => void;
}

const RecipeAccordion: React.FC<RecipeAccordionProps> = ({
  recipe,
  onSelect,
}) => (
  <Accordion onChange={() => onSelect(recipe)}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="recipe-content"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{ width: '50px', height: '50px', borderRadius: '8px' }}
        />
        <Typography variant="h6">{recipe.strMeal}</Typography>
      </div>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        <strong>Category:</strong> {recipe.strCategory}
      </Typography>
      <Typography>
        <strong>Area:</strong> {recipe.strArea}
      </Typography>
      <Typography>
        <strong>Instructions:</strong> {recipe.strInstructions}
      </Typography>
      <h3>Ingredients:</h3>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient') && recipe[key])
          .map((key, index) => (
            <li key={index}>
              {recipe[key]} - {recipe[`strMeasure${index + 1}`]}
            </li>
          ))}
      </ul>
    </AccordionDetails>
  </Accordion>
);

export default RecipeAccordion;
