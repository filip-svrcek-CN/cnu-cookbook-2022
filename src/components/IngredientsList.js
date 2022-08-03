import { useState } from 'react';
import { Table } from 'reactstrap';
import { BiTrash } from 'react-icons/bi';

import { IngredientsOrderControl } from './IngredientsOrderControl';
import { IngredientsListInput } from './IngredientsListInput';

export function IngredientsList({ updateData, ingredients }) {
  const [isEditing, setIsEditing] = useState('');

  const handleDeleteItem = (key) => {
    const ingredientsAfterDelete = ingredients.filter(
      ({ _id, customId }) => _id + customId !== key,
    );
    updateData({ ingredients: ingredientsAfterDelete });
  };
  return (
    <div style={{ marginBottom: '20px' }}>
      <Table style={{ marginBottom: '0px' }}>
        <tbody>
          {ingredients &&
            ingredients.map(
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
                    <td style={{ padding: '8px 0px 8px 0px' }}>
                      <button
                        className="remove"
                        type="button"
                        onClick={() => handleDeleteItem(key)}
                      >
                        <BiTrash />
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>{amount}</td>
                    <td style={{ textAlign: 'center' }}>{amountUnit}</td>
                    <td onDoubleClick={() => setIsEditing(key)}>
                      {key === isEditing ? (
                        <IngredientsListInput
                          name={name}
                          setIsEditing={setIsEditing}
                          id={key}
                          ingredients={ingredients}
                        />
                      ) : (
                        name
                      )}
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
      {ingredients.length > 0 && (
        <div
          style={{ fontStyle: 'italic', fontSize: '12px', textAlign: 'right' }}
        >
          *dvojklikem lze upravit název
        </div>
      )}
    </div>
  );
}
