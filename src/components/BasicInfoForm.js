import {
  Input,
  FormGroup,
  Label,
  InputGroupText,
  InputGroup,
} from 'reactstrap';

import { SideDishInput } from './SideDishInput';

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
            min={1}
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
          min={1}
          onChange={(event) => {
            const servingCount = event.target.value;
            updateData({ servingCount });
          }}
          value={basicInfo.servingCount || ''}
        />
      </FormGroup>
      <SideDishInput updateData={updateData} sideDish={basicInfo.sideDish} />
    </div>
  );
}
