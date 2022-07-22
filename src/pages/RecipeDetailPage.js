import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col, List, Button } from 'reactstrap';

import { api } from '../api';
import { DeleteRecipeModal } from '../components/DeleteRecipeModal';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const getModalState = (res) => {
    setOpenModal(res)
  }

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
        <Link to={`/upravit-recept/${slug}`}>
          <Button color="primary" style={{ marginRight: "5px" }}>Upravit</Button>
        </Link>
        <Button color="danger" onClick={() => setOpenModal(!openModal)}>Smazat</Button>
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
      {openModal && <DeleteRecipeModal getModalState={getModalState} recipeId={recipe._id} />}
    </Container >
  );
}
