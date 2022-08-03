import { IngredientsList } from './IngredientsList';
import { IngredientsFormAddIngredient } from './IngredientsFormAddIngredient';
import { IngredientsFormAddGroup } from './IngredientsFormAddGroup';

export function IngredientsFormParent({ updateData, ingredients }) {
  return (
    <div>
      <h3>Ingredience</h3>
      <IngredientsList updateData={updateData} ingredients={ingredients} />
      <IngredientsFormAddIngredient
        updateData={updateData}
        ingredients={ingredients}
      />
      <IngredientsFormAddGroup
        updateData={updateData}
        ingredients={ingredients}
      />
    </div>
  );
}
