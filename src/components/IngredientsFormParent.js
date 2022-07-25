import { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

import { IngredientsForm } from './IngredientsForm';

export function IngredientsFormParent({ updateData, ingredients }) {
  const [ingredientsList, setIngredientsList] = useState(ingredients);

  useEffect(() => {
    updateData({ ingredients: ingredientsList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsList]);

  const updateIngredientsList = (ingredientsFormData) => {
    setIngredientsList(ingredientsFormData);
  };

  const handleDeleteItem = (key) => {
    setIngredientsList(
      ingredientsList.filter(({ _id, customId }) => _id + customId !== key),
    );
  };

  function IngredientsListItems() {
    return (
      <div style={{ marginBottom: '15px' }}>
        <ListGroup>
          {ingredientsList.map(
            ({ name, amount, amountUnit, _id, customId, isGroup }) => {
              const key = _id + customId;
              return (
                <ListGroupItem
                  key={key}
                  style={
                    isGroup
                      ? { backgroundColor: 'lightgray', fontWeight: 'bold' }
                      : null
                  }
                >
                  <Button
                    close
                    type="button"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleDeleteItem(key)}
                  ></Button>
                  {name} {amount} {amountUnit}
                </ListGroupItem>
              );
            },
          )}
        </ListGroup>
      </div>
    );
  }

  return (
    <div>
      <h3>Ingredience</h3>
      <IngredientsListItems />
      <IngredientsForm
        updateIngredientsList={updateIngredientsList}
        list={ingredientsList}
      />
    </div>
  );
}
