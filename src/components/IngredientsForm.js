import { useEffect, useState } from "react";
import { Row, Col, FormGroup, Label, InputGroup, Input, Button } from "reactstrap";
import { v4 as uuid } from 'uuid';

export function IngredientsForm({ updateIngredientsList, list }) {

  const [ingredientsList, setIngredientsList] = useState(list);
  const [ingredientFormData, setIngredientFormData] = useState({});
  const [groupFormData, setGroupFormData] = useState({});

  useEffect(() => {
    updateIngredientsList(ingredientsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsList])


  const handleAddItem = () => {
    setIngredientsList([
      ...ingredientsList,
      {
        ...ingredientFormData,
        customId: uuid(),
        isGroup: false,
      }]);
    setIngredientFormData({});
  };

  const handleAddGroupItem = () => {
    setIngredientsList([
      ...ingredientsList,
      {
        ...groupFormData,
        customId: uuid(),
        isGroup: true,
      },
    ]);
    setGroupFormData({});
  };


  // { "_id": "5c41bc18a28cb9001bb85f41", "name": "Dhál", "isGroup": true },
  //     {
  //       "_id": "5c41bbd5a28cb9001bb85f24",
  //       "name": "květák",
  //       "amount": 1,
  //       "amountUnit": "ks",
  //       "isGroup": false
  //     },

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
                  value={ingredientFormData.name || ""}
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
  )
}
