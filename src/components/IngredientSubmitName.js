import {
  FormGroup,
  Label,
  InputGroup,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';

import { IngredientsDatalist } from './IngredientsDatalist';

export function IngredientSubmitName({
  label,
  formData,
  setFormData,
  onKeyDown,
  handleValidationAndSubmit,
  isInvalid,
  setIsInvalid,
}) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <InputGroup>
        <Input
          list={label}
          style={{ marginRight: '6px' }}
          value={formData.name || ''}
          onChange={(event) => {
            const name = event.target.value;
            setFormData({ ...formData, name });
            setIsInvalid(false);
          }}
          invalid={isInvalid}
          onFocus={() => setIsInvalid(false)}
          onKeyDown={onKeyDown}
        />
        {label === 'Název ingredience' && <IngredientsDatalist />}
        <Button id={label} onClick={handleValidationAndSubmit}>
          Přidat
        </Button>
        <FormFeedback tooltip className="invalidTooltip">
          Pole je povinné
        </FormFeedback>
      </InputGroup>
    </FormGroup>
  );
}
