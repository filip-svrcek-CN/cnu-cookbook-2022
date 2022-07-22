import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Button, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

import { api } from '../api';
import { RecipesList } from '../components/RecipesList';
import { SearchInput } from '../components/SearchInput';

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState("alphabetical");

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
      <Link to={`/novy-recept`}>
        <Button block color="primary" style={{ marginBottom: "12px" }}>Nový recept</Button>
      </Link>
      <SearchInput
        className="mb-4"
        onChange={handleSearchInputChange}
        value={searchValue}
      />
      <div className="sortRecipeList">
        <Label style={{ margin: "0px 10px 0px 0px", paddingTop: "7px" }}>Seřadit: </Label>
        <Input
          style={{ width: "170px" }}
          id="sort"
          name="sort"
          type="select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="alphabetical">
            Abecedně
          </option>
          <option value="preparationTime">
            Čas na přípravu
          </option>
        </Input>
      </div>
      {isLoading && <Spinner />}
      {hasError && <Alert color="danger">Vyskytla se chyba</Alert>}
      <RecipesList recipes={filteredRecipes} />
    </Container>
  );
}
