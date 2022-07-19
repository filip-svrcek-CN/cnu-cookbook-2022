import { useEffect, useState } from "react";
import { Form, Input, Col, FormGroup, Label, Button, Alert, Row } from "reactstrap";

import { api } from "../api";
import { BasicInfo } from "./BasicInfo";
import { IngredientsForm } from "./IngredientsForm";

export function RecipeForm(initialData) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [title, setTitle] = useState(initialData.title);
  const [data, setData] = useState(initialData);
  const [basicInfoData, setBasicInfoData] = useState({});
  const [ingredientsData, setIngredients] = useState([]);

  useEffect(() => {
    setData({
      title: title,
      ...basicInfoData,
      ingredients: ingredientsData
    });
  }, [title, basicInfoData, ingredientsData]);

  const getBasicInfo = (basicInfoData) => {
    setBasicInfoData({ ...basicInfoData })
  }

  const getIngredients = (ingredientsData) => {
    setIngredients(ingredientsData);
  }

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    api.post(`/recipes`, data)
      .then(() => { setIsSuccess(true) })
      .catch(() => { setHasError(true) })
      .finally(() => { setIsLoading(false) });
  }

  return (
    <Form>
      {!isLoading && <Button block color="primary" style={{ margin: "12px 0px 12px 0px" }} onClick={handleSubmit}>Uložit recept</Button>}
      {isLoading && <Button block color="primary" style={{ margin: "12px 0px 12px 0px" }}>Ukládání receptu...</Button>}
      {isSuccess && <Alert color="success">Recept úspěšně uložen!</Alert>}
      {!isSuccess && hasError && <Alert color="danger">Uložení nebylo úspěšné!</Alert>}
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label>
              <h3 style={{ marginBottom: "0px" }}>Název</h3>
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
          <BasicInfo getBasicInfo={getBasicInfo} initialData={initialData} />
        </Col>
        <Col md={4} sm={6} xs={12}>
          <IngredientsForm getIngredients={getIngredients} initialData={initialData} />
        </Col>
        <Col md={4} sm={6} xs={12}>
          <h3>Postup přípravy</h3>
          <p>...work in progress</p>
        </Col>
      </Row>
    </Form>
  );
}
