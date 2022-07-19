import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col, List, Button } from 'reactstrap';

import { api } from '../api';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      api.get(`/recipes/${slug}`)
        .then(
          (response) => {
            setRecipe(response.data);
          }
        )
        .catch(
          () => {
            setHasError(true);
          }
        )
        .finally(
          () => {
            setIsLoading(false);
          }
        );
    },
    [slug]
  );

  if (isLoading) {
    return <Spinner />
  }
  if (hasError) {
    return <Alert color="danger">Vyskytla se chyba</Alert>
  }
  if (!recipe) {
    return null;
  }

  const { title, preparationTime, ingredients, directions } = recipe;

  return (
    <Container>
      <h1>{title}</h1>
      <div className='receptDetailButtons'>
        <Button color="primary" style={{ marginRight: "5px" }}>Upravit</Button>
        <Button color="danger">Smazat</Button>
      </div>
      <Row>
        <Col lg={4}>
          <h5>{preparationTime} min</h5>
          <List type="unstyled">
            {ingredients.map(({ _id, name, amount, amountUnit }) => {
              return (
                <li key={_id}>{amount} {amountUnit} {name}</li>
              );
            })}
          </List>
        </Col>
        <Col lg={8}>
          <p>{directions}</p>
        </Col>
      </Row>
    </Container>
  );
}
