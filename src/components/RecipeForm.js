import { useEffect, useState } from "react";
import { Form, Input, Col, FormGroup, Label, Button, Alert, Row } from "reactstrap";

import { api } from "../api";
import { BasicInfo } from "./BasicInfo";

export function RecipeForm(initialData) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [title, setTitle] = useState(initialData.title);
  const [data, setData] = useState(initialData);
  const [basicInfoData, setBasicInfoData] = useState({});

  useEffect(() => {
    setData({
      title: title,
      ...basicInfoData
    });
  }, [title, basicInfoData]);

  const getBasicInfo = (basicInfoData) => {
    setBasicInfoData({ ...basicInfoData })
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
    <Form onSubmit={handleSubmit}>
      {!isLoading && <Button block color="primary" style={{ margin: "12px 0px 12px 0px" }}>Uložit recept</Button>}
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
