import { useEffect, useState } from "react";
import { Form, FormFeedback, Input, Col, FormGroup, Label, Button, Alert, Row } from "reactstrap";

import { api } from "../api";
import { BasicInfo } from "./BasicInfo";
import { DirectionsForm } from "./DirectionsForm";
import { DirectionsList } from "./DirectionsList";
import { IngredientsForm } from "./IngredientsForm";

export function RecipeForm({ initialData }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);

  const [title, setTitle] = useState(initialData.title);
  const [directions, setDirections] = useState(initialData.directions);
  const [data, setData] = useState(initialData);
  const [basicInfoData, setBasicInfoData] = useState({});
  const [ingredientsData, setIngredients] = useState([]);

  useEffect(() => {
    const newData = {
      title,
      directions,
      ...basicInfoData,
      ingredients: ingredientsData,
    }
    setData({
      ...initialData,
      ...newData
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, basicInfoData, ingredientsData]);

  const getBasicInfo = (basicInfoData) => {
    setBasicInfoData({ ...basicInfoData });
  }

  const getIngredients = (ingredientsData) => {
    setIngredients(ingredientsData);
  }

  const getDirections = (directionsData) => {
    setDirections(directionsData);
  }

  const handleSubmit = (event) => {
    if (title === "") {
      return setInvalidForm(true);
    }
    setInvalidForm(false);
    setIsLoading(true);
    Object.keys(data).forEach(key => data[key] === '' && delete data[key]);
    event.preventDefault();
    api.post(`/recipes/${initialData._id}`, data)
      .then(() => { setIsSuccess(true) })
      .catch(() => { setHasError(true) })
      .finally(() => { setIsLoading(false) });
  }

  return (
    <Form>
      {!isLoading && <Button block color="primary" style={{ margin: "12px 0px 12px 0px" }} onClick={handleSubmit}>Uložit recept</Button>}
      {isLoading && <Button disabled block color="primary" style={{ margin: "12px 0px 12px 0px" }}>Ukládání receptu...</Button>}
      {isSuccess && <Alert color="success">Recept úspěšně uložen!</Alert>}
      {!isSuccess && hasError && <Alert color="danger">Uložení nebylo úspěšné!</Alert>}
      <Row>
        <Col md={12}>
          <FormGroup className="position-relative">
            <Label>
              Název
            </Label>
            <Input
              id="title"
              name="title"
              onChange={(event) => { setTitle(event.target.value) }}
              onFocus={() => setInvalidForm(false)}
              value={title}
              invalid={invalidForm}
            />
            <FormFeedback tooltip>
              Pole je povinné
            </FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={3} sm={6} xs={12}>
          <BasicInfo getBasicInfo={getBasicInfo} initialData={initialData} />
        </Col>
        <Col md={4} sm={6} xs={12}>
          <IngredientsForm getIngredients={getIngredients} initialData={initialData} />
        </Col>
        <Col md={5} sm={6} xs={12}>
          <h3>Postup přípravy</h3>
          <DirectionsForm getDirections={getDirections} directions={data.directions} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 style={{ marginTop: "10px" }}>Náhled na postup přípravy</h3>
          <DirectionsList directions={directions} />
        </Col>
      </Row>
    </Form>
  );
}
