import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import { Navigate } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';
import { useState } from 'react';
import { RecipeCardDetail } from './RecipeCardDetail';

export function RecipeCard(props) {
  const { slug, title, preparationTime, sideDish } = props;
  const [navigateToDetail, setNavigateToDetail] = useState(false);

  return (
    <Card
      className="h-100 recipeCard"
      onClick={() => setNavigateToDetail(true)}
    >
      {navigateToDetail && <Navigate to={`/recipe/${slug}`} />}
      <CardImg src={placeholder} alt="Preview" />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <RecipeCardDetail
          preparationTime={preparationTime}
          sideDish={sideDish}
        />
      </CardBody>
    </Card>
  );
}
