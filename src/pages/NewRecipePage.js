import { Container } from 'reactstrap';

import { RecipeForm } from '../components/RecipeForm';

export function NewRecipePage() {
  const recipe = {
    ingredients: [],
    _id: '',
  };

  return (
    <Container>
      <h1>Nový recept</h1>
      <RecipeForm initialData={recipe} />
    </Container>
  );
}
