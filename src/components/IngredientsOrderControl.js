import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
export function IngredientsOrderControl({ updateData, ingredients, id }) {
  const handleOrderChange = (direction) => {
    const itemIndex = ingredients.findIndex(
      (element) => element._id + element.customId === id,
    );
    if (
      (direction > 0 && itemIndex < ingredients.length - 1) ||
      (direction < 0 && itemIndex > 0)
    ) {
      const item = ingredients.splice(itemIndex, 1)[0];
      ingredients.splice(itemIndex + direction, 0, item);
      updateData({ ingredients });
    }
  };

  return (
    <td
      className="orderControl"
      style={{ padding: '8px 0px 8px 0px', width: '42px' }}
    >
      <button type="button" onClick={() => handleOrderChange(-1)}>
        <AiOutlineArrowUp />
      </button>
      <button type="button" onClick={() => handleOrderChange(+1)}>
        <AiOutlineArrowDown />
      </button>
    </td>
  );
}
