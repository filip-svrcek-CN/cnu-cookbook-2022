import { Container } from "reactstrap";

import { RecipeForm } from "../components/RecipeForm";

export function NewRecipePage() {
  return (
    <Container>
      <h1>Nový recept</h1>
      <RecipeForm title={''} preparationTime={''} sideDish={''} servingCount={''} ingredients={[]} />
    </Container>
  )
}
