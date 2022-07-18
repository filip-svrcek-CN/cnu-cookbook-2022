import { useEffect, useState } from "react";
import { Input, FormGroup, Label, InputGroupText, InputGroup } from "reactstrap";

export function BasicInfo({ getBasicInfo, initialData }) {

  const [preparationTime, setPreparationTime] = useState(initialData.preparationTime);
  const [servingCount, setServingCount] = useState(initialData.servingCount);
  const [sideDish, setSideDish] = useState(initialData.sideDish);

  useEffect(() => {
    const data = { preparationTime: preparationTime, servingCount: servingCount, sideDish: sideDish }
    getBasicInfo(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preparationTime, servingCount, sideDish])

  return (
    <div>
      <h3>Základní údaje</h3>
      <FormGroup>
        <Label>
          Příprava
        </Label>
        <InputGroup>
          <Input
            id="preparationTime"
            name="preparationTime"
            type="number"
            onChange={(event) => { setPreparationTime(event.target.value) }}
            value={preparationTime}
          />
          <InputGroupText>
            min.
          </InputGroupText>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label>
          Počet porcí
        </Label>
        <Input
          id="servingCount"
          name="servingCount"
          type="number"
          onChange={(event) => { setServingCount(event.target.value) }}
          value={servingCount}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          Příloha
        </Label>
        <Input
          id="sideDishes"
          name="sideDishes"
          onChange={(event) => { setSideDish(event.target.value) }}
          value={sideDish} />
      </FormGroup>
    </div>
  )
}
