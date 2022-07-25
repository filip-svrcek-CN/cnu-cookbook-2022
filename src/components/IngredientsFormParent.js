import { useEffect, useState } from 'react';

import { IngredientsForm } from './IngredientsForm';
import { IngredientsList } from './IngredientsList';

export function IngredientsFormParent({ updateData, ingredients }) {
  const [ingredientsList, setIngredientsList] = useState(ingredients);

  useEffect(() => {
    updateData({ ingredients: ingredientsList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsList]);

  const updateIngredientsList = (ingredientsFormData) => {
    setIngredientsList(ingredientsFormData);
  };

  return (
    <div>
      <h3>Ingredience</h3>
      <IngredientsList
        updateIngredientsList={updateIngredientsList}
        list={ingredientsList}
      />
      <IngredientsForm
        updateIngredientsList={updateIngredientsList}
        list={ingredientsList}
      />
    </div>
  );
}
