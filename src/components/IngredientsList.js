import { Button, ListGroup, ListGroupItem } from 'reactstrap';

export function IngredientsList({ updateData, ingredients }) {
  const handleDeleteItem = (key) => {
    const ingredientsAfterDelete = ingredients.filter(
      ({ _id, customId }) => _id + customId !== key,
    );
    updateData({ ingredients: ingredientsAfterDelete });
  };
  return (
    <div style={{ marginBottom: '15px' }}>
      <ListGroup>
        {ingredients.map(
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
