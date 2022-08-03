import { useEffect, useState } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';

import { api } from '../api';

export function SideDishInput({ updateData, sideDish }) {
  const [sideDishes, setSideDishes] = useState([]);

  useEffect(() => {
    api.get('/recipes/side-dishes').then((res) => {
      setSideDishes(res.data);
    });
  }, []);

  return (
    <FormGroup>
      <Label>Příloha</Label>
      <Input
        list="sideDishes"
        onChange={(event) => {
          const sideDish = event.target.value;
          updateData({ sideDish });
        }}
        value={sideDish || ''}
      />
      <datalist id="sideDishes">
        {sideDishes.map((element, index) => (
          <option key={index}>{element}</option>
        ))}
      </datalist>
    </FormGroup>
  );
}
