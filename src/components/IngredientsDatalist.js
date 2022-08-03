import { useEffect, useState } from 'react';

import { api } from '../api';

export function IngredientsDatalist() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    api.get('/recipes/ingredients').then((res) => setIngredients(res.data));
  });

  return (
    <datalist id="Název ingredience">
      {ingredients.map((element, index) => {
        return <option key={index}>{element}</option>;
      })}
    </datalist>
  );
}
