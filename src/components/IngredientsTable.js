import { useState } from 'react';
import { Input, InputGroup, InputGroupText, Table } from 'reactstrap';

export function IngredientsTable({ ingredients, servingCount }) {
  const [servingCountInputValue, setServingCountInputValue] =
    useState(servingCount);

  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <div>
      <InputGroup style={{ marginTop: '10px', borderRadius: '0.25rem' }}>
        <Input
          style={{ border: '1px solid #0d6efd' }}
          bsSize="sm"
          className={'ingredientsTable'}
          type="number"
          min={1}
          value={servingCountInputValue || ''}
          onChange={(event) => {
            setServingCountInputValue(event.target.value);
          }}
        />
        <InputGroupText style={{ width: '60%' }}>Počet porcí</InputGroupText>
      </InputGroup>
      <Table hover size="">
        <tbody>
          {ingredients.map(({ _id, name, amount, amountUnit, isGroup }) => {
            return (
              <tr
                key={_id}
                style={isGroup ? { backgroundColor: '#e9ecef' } : null}
              >
                {servingCountInputValue > 0 ? (
                  <td>
                    {amount &&
                      (
                        Math.round(
                          ((amount * servingCountInputValue) /
                            (servingCount || 1)) *
                            100,
                        ) / 100
                      )
                        .toString()
                        .replace('.', ',')}
                  </td>
                ) : (
                  <td>{amount && amount}</td>
                )}
                <td>{amountUnit}</td>
                <td>{name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
