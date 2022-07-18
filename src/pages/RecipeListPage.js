import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { api } from '../api';
import { RecipesList } from '../components/RecipesList';
import { SearchInput } from '../components/SearchInput';

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(
    () => {
      setIsLoading(true);
      api.get('/recipes')
        .then(
          (response) => {
            setRecipes(response.data);
          }
        )
        .catch(
          () => {
            setHasError(true);
          }
        )
        .finally(
          () => {
            setIsLoading(false);
          }
        );
    },
    []
  );

  const filteredRecipes = recipes.filter(({ title }) => {
    return title.toLowerCase().includes(searchValue.toLowerCase());
  })

  const handleSearchInputChange = (event) => setSearchValue(event.target.value);

  return (
    <Container>
      <h1>Recepty</h1>
      <SearchInput
        className="mb-4"
        onChange={handleSearchInputChange}
        value={searchValue}
      />
      <Link to={`/novy-recept`}>
        <Button block color="primary" style={{ marginBottom: "12px" }}>Nový recept</Button>
      </Link>
      {isLoading && <Spinner />}
      {hasError && <Alert color="danger">Vyskytla se chyba</Alert>}
      <RecipesList recipes={filteredRecipes} />
    </Container>
  );
}
