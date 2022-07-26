import { useState } from 'react';
import {
  FormGroup,
  Label,
  InputGroup,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';

export function IngredientSubmitName({
  label,
  formData,
  setFormData,
  handleAddItem,
}) {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleValidationAndSubmit = () => {
    if (!formData.name) {
      setIsInvalid(true);
    } else {
      handleAddItem();
    }
  };

  return (
    <FormGroup>
      <Label>{label}</Label>
      <InputGroup>
        <Input
          style={{ marginRight: '6px' }}
          value={formData.name || ''}
          onChange={(event) => {
            const name = event.target.value;
            setFormData({ ...formData, name });
          }}
          invalid={isInvalid}
          onFocus={() => setIsInvalid(false)}
        />
        <Button onClick={handleValidationAndSubmit}>Přidat ingredienci</Button>
        <FormFeedback tooltip className="invalidTooltip">
          Pole je povinné
        </FormFeedback>
      </InputGroup>
    </FormGroup>
  );
}
