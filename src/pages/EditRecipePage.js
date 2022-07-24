import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'reactstrap';

import { RecipeForm } from '../components/RecipeForm';
import { api } from '../api';

export function EditRecipePage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/recipes/${slug}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  return (
    <Container>
      <h1>Upravit recept</h1>
      {isLoading && <Spinner />}
      {hasError && <Alert color="danger">Vyskytla se chyba</Alert>}
      {recipe && <RecipeForm initialData={recipe} />}
    </Container>
  );
}
