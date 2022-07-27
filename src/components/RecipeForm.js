import { useState } from 'react';
import { Form, Col, Row } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { api } from '../api';
import { BasicInfo } from './BasicInfoForm';
import { DirectionsForm } from './DirectionsForm';
import { DirectionsList } from './DirectionsList';
import { IngredientsFormParent } from './IngredientsFormParent';
import { TitleForm } from './TitleForm';
import { SaveButton } from './SaveButton';

export function RecipeForm({ initialData }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [data, setData] = useState(
    initialData ? initialData : { ingredients: [] },
  );

  const id = () => (initialData && initialData._id ? initialData._id : '');

  const updateData = (newData) => {
    setData({ ...data, ...newData });
  };

  const handleSubmit = () => {
    if (!data.title) {
      return setInvalidForm(true);
    }
    setInvalidForm(false);
    setIsLoading(true);
    api
      .post(`/recipes/${id()}`, data)
      .then((res) => {
        setData(res.data);
        setIsSuccess(true);
        toast.success('Recept úspěšně uložen!');
      })
      .catch(() => {
        toast.error('Uložení nebylo úspěšné!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isSuccess) {
    return <Navigate to={`/recipe/${data.slug}`} />;
  }

  return (
    <Form>
      <SaveButton handleSubmit={handleSubmit} isLoading={isLoading} />
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
        <Col md={3} sm={12}>
          <BasicInfo
            updateData={updateData}
            basicInfo={{
              servingCount: data.servingCount,
              sideDish: data.sideDish,
              preparationTime: data.preparationTime,
            }}
          />
        </Col>
        <Col md={4} sm={12}>
          <IngredientsFormParent
            updateData={updateData}
            ingredients={data.ingredients}
          />
        </Col>
        <Col md={5} sm={12}>
          <h3>Postup přípravy</h3>
          <DirectionsForm
            updateData={updateData}
            directions={data.directions}
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
