import { useEffect, useState } from 'react';
import {
  Input,
  FormGroup,
  Label,
  InputGroupText,
  InputGroup,
} from 'reactstrap';

export function BasicInfo({
  updateData,
  preparationTime,
  sideDish,
  servingCount,
}) {
  const [basicInfoFormData, setBasicInfoFormData] = useState({
    preparationTime,
    sideDish,
    servingCount,
  });

  useEffect(() => {
    updateData(basicInfoFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicInfoFormData]);

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
              setBasicInfoFormData({ ...basicInfoFormData, preparationTime });
            }}
            value={basicInfoFormData.preparationTime || ''}
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
            setBasicInfoFormData({ ...basicInfoFormData, servingCount });
          }}
          value={basicInfoFormData.servingCount || ''}
        />
      </FormGroup>
      <FormGroup>
        <Label>Příloha</Label>
        <Input
          id="sideDishes"
          name="sideDishes"
          onChange={(event) => {
            const sideDish = event.target.value;
            setBasicInfoFormData({ ...basicInfoFormData, sideDish });
          }}
          value={basicInfoFormData.sideDish || ''}
        />
      </FormGroup>
    </div>
  );
}
