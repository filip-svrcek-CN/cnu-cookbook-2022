import { useState } from 'react';
import { Form, Col, Button, Alert, Row } from 'reactstrap';

import { api } from '../api';
import { BasicInfo } from './BasicInfoForm';
import { DirectionsForm } from './DirectionsForm';
import { DirectionsList } from './DirectionsList';
import { IngredientsFormParent } from './IngredientsFormParent';
import { TitleForm } from './TitleForm';

export function RecipeForm({ initialData }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [data, setData] = useState(initialData);

  const updateData = (newData) => {
    setData({ ...data, ...newData });
  };

  const handleSubmit = (event) => {
    if (data.title === '') {
      return setInvalidForm(true);
    }
    setInvalidForm(false);
    setIsLoading(true);
    Object.keys(data).forEach((key) => data[key] === '' && delete data[key]);
    event.preventDefault();
    api
      .post(`/recipes/${initialData._id}`, data)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form>
      {!isLoading && (
        <Button
          block
          color="primary"
          style={{ margin: '12px 0px 12px 0px' }}
          onClick={handleSubmit}
        >
          Uložit recept
        </Button>
      )}
      {isLoading && (
        <Button
          disabled
          block
          color="primary"
          style={{ margin: '12px 0px 12px 0px' }}
        >
          Ukládání receptu...
        </Button>
      )}
      {isSuccess && <Alert color="success">Recept úspěšně uložen!</Alert>}
      {!isSuccess && hasError && (
        <Alert color="danger">Uložení nebylo úspěšné!</Alert>
      )}
      <Row>
        <Col md={12}>
          <TitleForm
            updateData={updateData}
            title={data.title}
            invalidForm={invalidForm}
            setValid={() => setInvalidForm(false)}
          />
        </Col>
      </Row>
      <Row>
        <Col md={3} sm={6} xs={12}>
          <BasicInfo
            updateData={updateData}
            initialData={{
              servingCount: data.servingCount,
              sideDish: data.sideDish,
              preparationTime: data.preparationTime,
            }}
          />
        </Col>
        <Col md={4} sm={6} xs={12}>
          <IngredientsFormParent
            updateData={updateData}
            initialData={data.ingredients}
          />
        </Col>
        <Col md={5} sm={6} xs={12}>
          <h3>Postup přípravy</h3>
          <DirectionsForm
            updateData={updateData}
            initialData={data.directions}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 style={{ marginTop: '10px' }}>Náhled na postup přípravy</h3>
          <DirectionsList directions={data.directions} />
        </Col>
      </Row>
    </Form>
  );
}
