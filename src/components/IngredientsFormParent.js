import { IngredientsForm } from './IngredientsForm';
import { IngredientsList } from './IngredientsList';

export function IngredientsFormParent({ updateData, ingredients }) {
  return (
    <div>
      <h3>Ingredience</h3>
      <IngredientsList updateData={updateData} ingredients={ingredients} />
      <IngredientsForm updateData={updateData} ingredients={ingredients} />
    </div>
  );
}
