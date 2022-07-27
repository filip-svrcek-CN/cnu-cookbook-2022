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

  if (isLoading) {
    return <Spinner />;
  }
  if (hasError) {
    return <Alert color="danger">Vyskytla se chyba</Alert>;
  }

  return (
    <Container>
      {recipe ? (
        <h1>
          <a
            href={`/recipe/${slug}`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {recipe.title}
          </a>
        </h1>
      ) : (
        <h1>Upravit recept</h1>
      )}
      {recipe && <RecipeForm initialData={recipe} />}
    </Container>
  );
}
