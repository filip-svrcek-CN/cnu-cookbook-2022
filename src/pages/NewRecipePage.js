import { Container } from 'reactstrap';
import { useLocation } from 'react-router-dom';

import { RecipeForm } from '../components/RecipeForm';

export function NewRecipePage() {
  const location = useLocation().state;

  return (
    <Container>
      <h1>Nový recept</h1>
      {location ? (
        <RecipeForm
          initialData={{
            title: `Kopie - ${location.recipe.title}`,
            directions: location.recipe.directions,
            ingredients: location.recipe.ingredients,
            preparationTime: location.recipe.preparationTime,
            servingCount: location.recipe.servingCount,
          }}
        />
      ) : (
        <RecipeForm />
      )}
    </Container>
  );
}
