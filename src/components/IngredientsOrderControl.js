import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
export function IngredientsOrderControl({ updateData, ingredients, id }) {
  const handleOrderChange = (direction) => {
    const itemIndex = ingredients.findIndex(
      (element) => element._id + element.customId === id,
    );
    const item = ingredients.splice(itemIndex, 1)[0];
    ingredients.splice(itemIndex + direction, 0, item);
    updateData({ ingredients });
  };

  return (
    <td className="orderControl" style={{ padding: '8px', display: 'flex' }}>
      <button type="button" onClick={() => handleOrderChange(-1)}>
        <AiOutlineArrowUp />
      </button>
      <button type="button" onClick={() => handleOrderChange(+1)}>
        <AiOutlineArrowDown />
      </button>
    </td>
  );
}
