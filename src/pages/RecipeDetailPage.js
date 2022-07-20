import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col, List, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

import { api } from '../api';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [hasErrorDelete, setHasErrorDelete] = useState(false);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);

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

  const handleDeleteRecipe = () => {
    setHasErrorDelete(false);
    setIsLoadingDelete(true);
    api.delete(`/recipes/${recipe._id}`).then(
      () => {
        setIsSuccessDelete(true);
      }
    )
      .catch(
        () => {
          setHasErrorDelete(true);
        }
      )
      .finally(
        () => {
          setIsLoadingDelete(false);
        }
      );
  };

  const toggleModal = () => {
    setHasErrorDelete(false);
    setModal(!modal);
  }

  const { title, preparationTime, ingredients, directions } = recipe;

  return (
    <Container>
      <h1>{title}</h1>
      <div className='receptDetailButtons'>
        <Link to={`/upravit-recept/${slug}`}>
          <Button color="primary" style={{ marginRight: "5px" }}>Upravit</Button>
        </Link>
        <Button color="danger" onClick={toggleModal}>Smazat</Button>
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
      <Modal isOpen={modal}>
        <ModalHeader>Opravdu chcete smazat recept?</ModalHeader>
        <ModalBody>
          {isLoadingDelete && <Spinner />}
          {!isSuccessDelete && hasErrorDelete && <Alert color="danger">Smazání nebylo úspěšné!</Alert>}
          {isSuccessDelete && <Alert color="success">Recept úspěšně smazán!</Alert>}
        </ModalBody>
        <ModalFooter>
          {!isSuccessDelete && <Button style={{ width: "80px" }} color="danger" onClick={handleDeleteRecipe}>Smazat</Button>}
          {!isSuccessDelete && <Button color="secondary" onClick={toggleModal}>Zrušit</Button>}
          {isSuccessDelete && <Link to={"/"}><Button color="primary" onClick={toggleModal}>Ok</Button></Link>}
        </ModalFooter>
      </Modal>
    </Container >
  );
}
