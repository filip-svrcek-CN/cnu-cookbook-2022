import {
  Input,
  FormGroup,
  Label,
  InputGroupText,
  InputGroup,
} from 'reactstrap';

export function BasicInfo({ updateData, basicInfo }) {
  return (
    <div>
      <h3>Základní údaje</h3>
      <FormGroup>
        <Label>Příprava</Label>
        <InputGroup>
          <Input
            id="preparationTime"
            name="preparationTime"
            type="number"
            onChange={(event) => {
              const preparationTime = event.target.value;
              updateData({ preparationTime });
            }}
            value={basicInfo.preparationTime || ''}
          />
          <InputGroupText>min.</InputGroupText>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label>Počet porcí</Label>
        <Input
          id="servingCount"
          name="servingCount"
          type="number"
          onChange={(event) => {
            const servingCount = event.target.value;
            updateData({ servingCount });
          }}
          value={basicInfo.servingCount || ''}
        />
      </FormGroup>
      <FormGroup>
        <Label>Příloha</Label>
        <Input
          id="sideDishes"
          name="sideDishes"
          onChange={(event) => {
            const sideDish = event.target.value;
            updateData({ sideDish });
          }}
          value={basicInfo.sideDish || ''}
        />
      </FormGroup>
    </div>
  );
}
