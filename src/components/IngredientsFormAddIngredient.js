import { useState } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { v4 as uuid } from 'uuid';

import { IngredientSubmitName } from './IngredientSubmitName';
import { useFocus } from './useFocus';

export function IngredientsFormAddIngredient({ updateData, ingredients }) {
  const [formData, setFormData] = useState({});
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputRef, setInputFocus] = useFocus();

  const handleAddItem = () => {
    updateData({
      ingredients: [
        ...ingredients,
        {
          ...formData,
          customId: uuid(),
          isGroup: false,
        },
      ],
    });
    setFormData({});
  };

  const handleValidationAndSubmit = () => {
    if (!formData.name) {
      setIsInvalid(true);
    } else {
      handleAddItem();
      setInputFocus();
    }
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleValidationAndSubmit();
    }
  };

  return (
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
            formData={formData}
            setFormData={setFormData}
            handleValidationAndSubmit={handleValidationAndSubmit}
            onKeyDown={(event) => handleEnterKeyDown(event)}
            isInvalid={isInvalid}
            setIsInvalid={setIsInvalid}
            inputRef={inputRef}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={4} xs={4} style={{ paddingRight: '3px' }}>
          <FormGroup>
            <Label>Množství</Label>
            <Input
              style={{ borderRadius: ' 0.25rem 0 0 0.25rem' }}
              value={formData.amount || ''}
              type="number"
              min={1}
              onChange={(event) => {
                const amount = event.target.value;
                setFormData({ ...formData, amount });
              }}
              onKeyDown={(event) => handleEnterKeyDown(event)}
            />
          </FormGroup>
        </Col>
        <Col md={8} sm={8} xs={8} style={{ paddingLeft: '3px' }}>
          <FormGroup>
            <Label>Jednotka</Label>
            <Input
              style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
              value={formData.amountUnit || ''}
              onChange={(event) => {
                const amountUnit = event.target.value;
                setFormData({ ...formData, amountUnit });
              }}
              onKeyDown={(event) => handleEnterKeyDown(event)}
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
}
