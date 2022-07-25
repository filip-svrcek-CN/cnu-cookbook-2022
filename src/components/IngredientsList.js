import { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

export function IngredientsList({ updateIngredientsList, list }) {
  const [ingredientsList, setIngredientsList] = useState(list);

  useEffect(() => {
    updateIngredientsList(ingredientsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsList]);

  const handleDeleteItem = (key) => {
    setIngredientsList(
      ingredientsList.filter(({ _id, customId }) => _id + customId !== key),
    );
  };

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
