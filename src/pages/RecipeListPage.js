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

  const format = item => item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (sortBy === "preparationTime") {
    recipes.forEach((item, index) => {
      if (typeof item.preparationTime === "undefined") {
        const removedItem = recipes.splice(index, 1);
        recipes.push(...removedItem);
      }
    })
    recipes.sort((a, b) => a.preparationTime - b.preparationTime);
  }
  else if (sortBy === "alphabetical") {
    recipes.sort((a, b) =>
      format(a.title) > format(b.title) ? 1 : format(a.title) < format(b.title) ? -1 : 0)
  }

  const filteredRecipes = recipes.filter(({ title }) => {
    return format(title).includes(format(searchValue));
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
      {isLoading && <Spinner style={{ marginBottom: "30px" }} />}
      {hasError && <Alert color="danger">Vyskytla se chyba</Alert>}
      <RecipesList recipes={filteredRecipes} />
    </Container>
  );
}
