import { useState } from 'react';
import { Input } from 'reactstrap';

export function IngredientsListInput({ name, setIsEditing, id, ingredients }) {
  const [itemName, setItemName] = useState(name);

  const handleEditItemName = () => {
    const index = ingredients.findIndex(
      (element) => element._id + element.customId === id,
    );
    ingredients[index].name = itemName;
  };

  return (
    <Input
      autoFocus
      onBlur={() => setIsEditing('')}
      style={{ padding: '0px 6px' }}
      value={itemName}
      onChange={(event) => {
        setItemName(event.target.value);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleEditItemName();
          setIsEditing('');
        } else if (event.key === 'Escape') {
          setIsEditing('');
        }
      }}
    />
  );
}
