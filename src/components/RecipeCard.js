import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';

import placeholder from '../images/food-placeholder.png';
import { PreptimeSidedish } from './PreptimeSidedish';

export function RecipeCard(props) {
  const { slug, title, preparationTime, sideDish } = props;

  return (
    <Link
      to={`/recipe/${slug}`}
      style={{ textDecoration: 'none', color: '#212529' }}
    >
      <Card className="h-100 recipeCard">
        <CardImg src={placeholder} alt="Preview" />
        <CardBody>
          <CardTitle className="cardTitle" tag="h6">
            {title}
          </CardTitle>
          <PreptimeSidedish
            preparationTime={preparationTime}
            sideDish={sideDish}
            fontSize="14px"
          />
        </CardBody>
      </Card>
    </Link>
  );
}
