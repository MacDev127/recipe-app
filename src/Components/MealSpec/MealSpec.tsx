// MealSpec.tsx
import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Title from '../Title/Title';
import { OptionType } from './mealSpecTypes';

const MealSpec: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  );
  const [selectedPeople, setSelectedPeople] = useState<OptionType | null>(null);
  const [selectedTime, setSelectedTime] = useState<OptionType | null>(null);

  // Hardcoded options
  const categoryOptions: OptionType[] = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'brunch', label: 'Brunch' },
    { value: 'snack', label: 'Snack' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'other', label: 'Other' },
  ];

  const peopleOptions: OptionType[] = [
    { value: '1-3', label: '1-3' },
    { value: '3-5', label: '3-5' },
    { value: '5+', label: '5+' },
  ];

  const timeOptions: OptionType[] = [
    { value: '<15', label: 'Less than 15 mins' },
    { value: '<30', label: 'Less than 30 mins' },
    { value: '<1hr', label: 'Less than 1 hour' },
    { value: '1hr+', label: '1 hour or more' },
  ];

  return (
    <div className="meal__spec">
      <Title>Meal Preferences</Title>
      <div
        style={{
          display: 'flex',
          gap: '80px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div style={{ minWidth: '250px' }}>
          <label htmlFor="meal-category">Meal Category</label>
          <Select
            inputId="meal-category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(option: SingleValue<OptionType>) =>
              setSelectedCategory(option)
            }
            placeholder="Select a category"
          />
        </div>
        <div style={{ minWidth: '250px' }}>
          <label htmlFor="number-of-people">Number of People</label>
          <Select
            inputId="number-of-people"
            options={peopleOptions}
            value={selectedPeople}
            onChange={(option: SingleValue<OptionType>) =>
              setSelectedPeople(option)
            }
            placeholder="Select number of people"
          />
        </div>
        <div style={{ minWidth: '250px' }}>
          <label htmlFor="cooking-time">Cooking Time</label>
          <Select
            inputId="cooking-time"
            options={timeOptions}
            value={selectedTime}
            onChange={(option: SingleValue<OptionType>) =>
              setSelectedTime(option)
            }
            placeholder="Select cooking time"
          />
        </div>
      </div>
    </div>
  );
};

export default MealSpec;
