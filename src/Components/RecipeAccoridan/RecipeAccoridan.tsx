import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RecipeAccordionProps } from './recipeAccrodianTypes';

const RecipeAccordion: React.FC<RecipeAccordionProps> = ({ recipe }) => {
  return (
    <Accordion sx={{ marginBottom: '1rem' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="recipe-content"
        aria-label={`Expand ${recipe.strMeal}`}
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
          sx={{
            textAlign: 'left',
            margin: '1rem 0',
            fontSize: '2rem',
            fontWeight: '400',
          }}
        >
          <strong>Category:</strong> {recipe.strCategory || 'N/A'}
        </Typography>

        <Typography sx={{ textAlign: 'justify', margin: '1rem 0' }}>
          <strong>Instructions:</strong>{' '}
          {recipe.strInstructions || 'No instructions available.'}
        </Typography>

        <h3 style={{ textAlign: 'left', margin: '1rem 0', fontSize: '2rem' }}>
          Ingredients
        </h3>
        <ul style={{ padding: '0', margin: '10px 0', listStyleType: 'none' }}>
          {Object.keys(recipe)
            .filter((key) => key.startsWith('strIngredient') && recipe[key])
            .map((key, index) => (
              <li
                key={recipe[`idIngredient${index + 1}`] || index}
                style={{
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
};

export default RecipeAccordion;
