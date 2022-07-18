import { useState } from "react";
import { Form, Input, Col, FormGroup, Label, Button, Alert, InputGroupText, InputGroup, Row } from "reactstrap";

import { api } from "../api";

export function RecipeForm(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [preparationTime, setPreparationTime] = useState(props.preparationTime);
  const [servingCount, setServingCount] = useState(props.servingCount);
  const [sideDish, setSideDish] = useState(props.sideDish);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    api.post(`/recipes`, { title, preparationTime, servingCount, sideDish })
      .then(() => { setIsSuccess(true) })
      .catch(() => { setHasError(true) })
      .finally(() => { setIsLoading(false) });
  }


  return (
    <Form onSubmit={handleSubmit}>
      {!isLoading && <Button block color="primary" style={{ margin: "12px 0px 12px 0px" }}>Uložit recept</Button>}
      {isLoading && <Button block color="primary" style={{ marginBottom: "12px 0px 12px 0px" }}>Ukládání receptu...</Button>}
      {isSuccess && <Alert color="success">Recept úspěšně uložen!</Alert>}
      {!isSuccess && hasError && <Alert color="danger">Uložení nebylo úspěšné!</Alert>}
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label>
              Název
            </Label>
            <Input
              id="title"
              name="title"
              required
              onChange={(event) => { setTitle(event.target.value) }}
              value={title}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={6} xs={12}>
          <h3>Základní údaje</h3>
          <FormGroup>
            <Label>
              Příprava
            </Label>
            <InputGroup>
              <Input
                id="preparationTime"
                name="preparationTime"
                type="number"
                onChange={(event) => { setPreparationTime(event.target.value) }}
                value={preparationTime}
              />
              <InputGroupText>
                min.
              </InputGroupText>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>
              Počet porcí
            </Label>
            <Input
              id="servingCount"
              name="servingCount"
              type="number"
              onChange={(event) => { setServingCount(event.target.value) }}
              value={servingCount}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Příloha
            </Label>
            <Input
              id="sideDishes"
              name="sideDishes"
              onChange={(event) => { setSideDish(event.target.value) }}
              value={sideDish} />
          </FormGroup>
        </Col>
        <Col md={4} sm={6} xs={12}>
          <h3>Ingredience</h3>
          <p>...work in progress</p>
        </Col>
        <Col md={4} sm={6} xs={12}>
          <h3>Postup přípravy</h3>
          <p>...work in progress</p>
        </Col>
      </Row>
    </Form>
  );
}
