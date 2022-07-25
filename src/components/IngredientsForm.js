import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
  InputGroup,
  Input,
  Button,
} from 'reactstrap';
import { v4 as uuid } from 'uuid';

export function IngredientsForm({ updateIngredients, initialData }) {
  const [ingredients, setIngredients] = useState(initialData);
  const [ingredientFormData, setIngredientFormData] = useState({});
  const [groupFormData, setGroupFormData] = useState({});

  useEffect(() => {
    updateIngredients(ingredients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  const handleAddItem = () => {
    setIngredients([
      ...ingredients,
      {
        ...ingredientFormData,
        customId: uuid(),
        isGroup: false,
      },
    ]);
    setIngredientFormData({});
  };

  const handleAddGroupItem = () => {
    setIngredients([
      ...ingredients,
      {
        ...groupFormData,
        customId: uuid(),
        isGroup: true,
      },
    ]);
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
            <FormGroup>
              <Label>Název ingredience</Label>
              <InputGroup>
                <Input
                  value={ingredientFormData.name || ''}
                  onChange={(event) => {
                    const name = event.target.value;
                    setIngredientFormData({ ...ingredientFormData, name });
                  }}
                />
                <Button onClick={handleAddItem}>Přidat ingredienci</Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Množství</Label>
              <Input
                value={ingredientFormData.amount || ''}
                type="number"
                onChange={(event) => {
                  const amount = event.target.value;
                  setIngredientFormData({ ...ingredientFormData, amount });
                }}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Jednotka</Label>
              <Input
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
          <FormGroup>
            <Label>Název skupiny</Label>
            <InputGroup>
              <Input
                value={groupFormData.name || ''}
                onChange={(event) => {
                  const name = event.target.value;
                  setGroupFormData({ ...groupFormData, name });
                }}
              />
              <Button onClick={handleAddGroupItem}>Přidat skupinu</Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </div>
    </div>
  );
}
