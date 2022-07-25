import { useEffect, useState } from 'react';

import { IngredientsForm } from './IngredientsForm';
import { IngredientsList } from './IngredientsList';

export function IngredientsFormParent({ updateData, initialData }) {
  const [ingredients, setIngredients] = useState(initialData);

  useEffect(() => {
    updateData({ ingredients });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  const updateIngredients = (ingredientsFormData) => {
    setIngredients(ingredientsFormData);
  };

  return (
    <div>
      <h3>Ingredience</h3>
      <IngredientsList
        updateIngredients={updateIngredients}
        ingredients={ingredients}
      />
      <IngredientsForm
        updateIngredients={updateIngredients}
        initialData={ingredients}
      />
    </div>
  );
}
