import { useState } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import { IngredientSubmitName } from './IngredientSubmitName';

export function IngredientsForms({ updateData, ingredients }) {
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

  const clickSubmitButton = (event, id) => {
    if (event.key === 'Enter') {
      document.getElementById(id).click();
    }
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
              onKeyDown={(event) =>
                clickSubmitButton(event, 'Název ingredience')
              }
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} sm={4} xs={4} style={{ paddingRight: '3px' }}>
            <FormGroup>
              <Label>Množství</Label>
              <Input
                style={{ borderRadius: ' 0.25rem 0 0 0.25rem' }}
                value={ingredientFormData.amount || ''}
                type="number"
                min={1}
                onChange={(event) => {
                  const amount = event.target.value;
                  setIngredientFormData({ ...ingredientFormData, amount });
                }}
                onKeyDown={(event) =>
                  clickSubmitButton(event, 'Název ingredience')
                }
              />
            </FormGroup>
          </Col>
          <Col md={8} sm={8} xs={8} style={{ paddingLeft: '3px' }}>
            <FormGroup>
              <Label>Jednotka</Label>
              <Input
                style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                value={ingredientFormData.amountUnit || ''}
                onChange={(event) => {
                  const amountUnit = event.target.value;
                  setIngredientFormData({ ...ingredientFormData, amountUnit });
                }}
                onKeyDown={(event) =>
                  clickSubmitButton(event, 'Název ingredience')
                }
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
          margin: '15px 0px 10px 0px',
        }}
      >
        <Col md={12}>
          <IngredientSubmitName
            label={'Název skupiny'}
            formData={groupFormData}
            setFormData={setGroupFormData}
            handleAddItem={handleAddGroupItem}
            onKeyDown={(event) => clickSubmitButton(event, 'Název skupiny')}
          />
        </Col>
      </div>
    </div>
  );
}
