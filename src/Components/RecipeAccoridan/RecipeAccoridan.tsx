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
  strInstructions?: string;
  [key: string]: any;
}

interface RecipeAccordionProps {
  recipe: Recipe;
}

const RecipeAccordion: React.FC<RecipeAccordionProps> = ({ recipe }) => (
  <Accordion style={{ marginBottom: '1rem' }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="recipe-content"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{ width: '80px', height: '80px', borderRadius: '8px' }}
        />
        <Typography variant="h5">{recipe.strMeal}</Typography>
      </div>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        style={{
          textAlign: 'left',
          marginTop: '1rem',
          marginBottom: '1rem',
          fontSize: '2rem',
          fontWeight: '400',
        }}
      >
        <strong>Category:</strong> {recipe.strCategory}
      </Typography>

      <Typography
        style={{ textAlign: 'justify', alignItems: 'center', gap: '16px' }}
      >
        <strong>Instructions:</strong> {recipe.strInstructions}
      </Typography>
      <h3
        style={{
          textAlign: 'left',
          marginTop: '1rem',
          marginBottom: '1rem',
          fontSize: '2rem',
        }}
      >
        Ingredients
      </h3>
      <ul style={{ padding: '0', margin: '10px 0', listStyleType: 'none' }}>
        {Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient') && recipe[key])
          .map((key, index) => (
            <li
              key={index}
              style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '5px 0',
                borderBottom: '1px solid #ddd',
              }}
            >
              <span>{recipe[key]}</span>
              <span>{recipe[`strMeasure${index + 1}`]}</span>
            </li>
          ))}
      </ul>
    </AccordionDetails>
  </Accordion>
);

export default RecipeAccordion;
