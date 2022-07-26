import { useState } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import { IngredientSubmitName } from './IngredientSubmitName';

export function IngredientsForm({ updateData, ingredients }) {
  const [ingredientFormData, setIngredientFormData] = useState({});
  const [groupFormData, setGroupFormData] = useState({});

  const handleAddItem = () => {
    updateData({
      ingredients: [
        ...ingredients,
        {
          ...ingredientFormData,
          customId: uuid(),
          isGroup: false,
        },
      ],
    });
    setIngredientFormData({});
  };

  const handleAddGroupItem = () => {
    updateData({
      ingredients: [
        ...ingredients,
        {
          ...groupFormData,
          customId: uuid(),
          isGroup: true,
        },
      ],
    });
    setGroupFormData({});
  };

  return (
    <div>
      <div
        style={{
          border: '1px solid #0d6efd',
          borderRadius: '0.25rem',
          padding: '10px',
        }}
      >
        <Row>
          <Col md={12}>
            <IngredientSubmitName
              label={'Název ingredience'}
              formData={ingredientFormData}
              setFormData={setIngredientFormData}
              handleAddItem={handleAddItem}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} style={{ paddingRight: '3px' }}>
            <FormGroup>
              <Label>Množství</Label>
              <Input
                style={{ borderRadius: ' 0.25rem 0 0 0.25rem' }}
                value={ingredientFormData.amount || ''}
                type="number"
                onChange={(event) => {
                  const amount = event.target.value;
                  setIngredientFormData({ ...ingredientFormData, amount });
                }}
              />
            </FormGroup>
          </Col>
          <Col md={8} style={{ paddingLeft: '3px' }}>
            <FormGroup>
              <Label>Jednotka</Label>
              <Input
                style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                value={ingredientFormData.amountUnit || ''}
                onChange={(event) => {
                  const amountUnit = event.target.value;
                  setIngredientFormData({ ...ingredientFormData, amountUnit });
                }}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
      <div
        style={{
          border: '1px solid #0d6efd',
          borderRadius: '0.25rem',
          padding: '10px',
          marginTop: '15px',
        }}
      >
        <Col md={12}>
          <IngredientSubmitName
            label={'Název skupiny'}
            formData={groupFormData}
            setFormData={setGroupFormData}
            handleAddItem={handleAddGroupItem}
          />
        </Col>
      </div>
    </div>
  );
}
