import { CardSubtitle } from 'reactstrap';
import { BiTimeFive, BiDish } from 'react-icons/bi';

export function RecipeCardDetail({ preparationTime, sideDish }) {
  const hoursToPrepare = (prepTime) => {
    const hours = Math.floor(prepTime / 60);
    return hours > 0 ? hours : null;
  };

  const minsToPrepare = (prepTime) => {
    const mins = Math.floor(prepTime % 60);
    return prepTime === 0 ? '0' : mins > 0 ? mins : null;
  };

  if (preparationTime >= 0 || sideDish) {
    return (
      <CardSubtitle style={{ fontSize: '14px' }}>
        {preparationTime >= 0 && <BiTimeFive />}
        {hoursToPrepare(preparationTime) && (
          <span> {hoursToPrepare(preparationTime)} h</span>
        )}
        {minsToPrepare(preparationTime) && (
          <span> {minsToPrepare(preparationTime)} min</span>
        )}
        {sideDish && (
          <span>
            {' '}
            <BiDish /> {sideDish}
          </span>
        )}
      </CardSubtitle>
    );
  }

  return (
    <CardSubtitle style={{ fontSize: '14px', fontStyle: 'italic' }}>
      žádné údaje
    </CardSubtitle>
  );
}
