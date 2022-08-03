import { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import { IngredientSubmitName } from './IngredientSubmitName';

export function IngredientsFormAddGroup({ updateData, ingredients }) {
  const [formData, setFormData] = useState({});
  const [isInvalid, setIsInvalid] = useState(false);

  const handleAddItem = () => {
    updateData({
      ingredients: [
        ...ingredients,
        {
          ...formData,
          customId: uuid(),
          isGroup: true,
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
            label={'Název skupiny'}
            formData={formData}
            setFormData={setFormData}
            handleValidationAndSubmit={handleValidationAndSubmit}
            onKeyDown={(event) => handleEnterKeyDown(event)}
            isInvalid={isInvalid}
            setIsInvalid={setIsInvalid}
          />
        </Col>
      </Row>
    </div>
  );
}
