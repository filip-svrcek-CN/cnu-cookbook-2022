import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';

import placeholder from '../images/food-placeholder.png';
import { RecipeCardDetail } from './RecipeCardDetail';

export function RecipeCard(props) {
  const { slug, title, preparationTime, sideDish } = props;

  return (
    <a
      href={`/recipe/${slug}`}
      style={{ textDecoration: 'none', color: '#212529' }}
    >
      <Card className="h-100 recipeCard">
        <CardImg src={placeholder} alt="Preview" />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <RecipeCardDetail
            preparationTime={preparationTime}
            sideDish={sideDish}
          />
        </CardBody>
      </Card>
    </a>
  );
}
