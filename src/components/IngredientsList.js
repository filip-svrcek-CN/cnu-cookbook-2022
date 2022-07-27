import { Table } from 'reactstrap';
import { BiTrash } from 'react-icons/bi';

import { IngredientsOrderControl } from './IngredientsOrderControl';

export function IngredientsList({ updateData, ingredients }) {
  const handleDeleteItem = (key) => {
    const ingredientsAfterDelete = ingredients.filter(
      ({ _id, customId }) => _id + customId !== key,
    );
    updateData({ ingredients: ingredientsAfterDelete });
  };
  return (
    <div style={{ marginBottom: '15px' }}>
      <Table borderless>
        <tbody>
          {ingredients.map(
            ({ name, amount, amountUnit, _id, customId, isGroup }) => {
              const key = _id + customId;
              return (
                <tr
                  key={key}
                  className="ingredientsListItem"
                  style={
                    isGroup
                      ? { backgroundColor: '#e9ecef', fontWeight: 'bold' }
                      : null
                  }
                >
                  <td>
                    <button
                      className="remove"
                      type="button"
                      onClick={() => handleDeleteItem(key)}
                    >
                      <BiTrash />
                    </button>
                  </td>
                  <td>
                    {name} {amount} {amountUnit}
                  </td>
                  <IngredientsOrderControl
                    updateData={updateData}
                    ingredients={ingredients}
                    id={_id + customId}
                  />
                </tr>
              );
            },
          )}
        </tbody>
      </Table>
    </div>
  );
}
