import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import { BiTimeFive, BiDish } from "react-icons/bi";

import placeholder from '../images/food-placeholder.png';
import { useState } from 'react';

export function RecipeCard(props) {
  const { slug, title, preparationTime, sideDish } = props;
  const [navigateToDetail, setNavigateToDetail] = useState(false);

  const hoursToPrepare = (prepTime) => {
    const hours = Math.floor(prepTime / 60)
    return hours > 0 ? hours : null;
  }

  const minsToPrepare = (prepTime) => {
    const mins = Math.floor(prepTime % 60)
    return mins > 0 ? mins : null;
  }

  return (
    <Card className="h-100 recipeCard" onClick={() => setNavigateToDetail(true)}>
      {navigateToDetail && <Navigate to={`/recipe/${slug}`} />}
      <CardImg src={placeholder} alt="Preview" />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle style={{ fontSize: "14px" }}>
          {preparationTime && <BiTimeFive />}
          {hoursToPrepare(preparationTime) && <span> {hoursToPrepare(preparationTime)} h</span>}
          {minsToPrepare(preparationTime) && <span> {minsToPrepare(preparationTime)} min</span>}
          {sideDish && <span> <BiDish /> {sideDish}</span>}
        </CardSubtitle>
      </CardBody>
    </Card>
  )
}
