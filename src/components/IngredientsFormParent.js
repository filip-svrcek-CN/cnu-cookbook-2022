import { IngredientsForms } from './IngredientsForms';
import { IngredientsList } from './IngredientsList';

export function IngredientsFormParent({ updateData, ingredients }) {
  return (
    <div>
      <h3>Ingredience</h3>
      <IngredientsList updateData={updateData} ingredients={ingredients} />
      <IngredientsForms updateData={updateData} ingredients={ingredients} />
    </div>
  );
}
