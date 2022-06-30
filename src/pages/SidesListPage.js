import { useEffect, useState } from "react";
import { Alert, Container, Spinner, Table } from "reactstrap";

import { api } from "../api";

export function SidesListPage() {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      api.get('/recipes')
        .then((response) => setRecipes(response.data))
        .catch(() => setHasError(true), (error) => { console.log("error", error) })
        .finally(() => setIsLoading(false));
    }, []
  );

  if (isLoading) {
    return <Spinner />
  }
  if (hasError) {
    return <Alert color="danger">Vyskytla se chyba</Alert>
  }
  if (!recipes) {
    return null;
  }

  function SideDishes() {
    const filteredDefined = recipes.filter(({ sideDish }) => { return typeof sideDish !== "undefined" });
    const filteredUnique = filteredDefined.map(item => { return item.sideDish })
      //join multi-option sidedishes
      .join(", ").replace(/ \//g, ',').split(', ')
      .filter((value, index, self) => self.indexOf(value) === index);

    return filteredUnique.map((item, index) => {
      return (
        <tr key={index}>
          <td >{item}</td>
        </tr>
      )
    })
  }

  const SideDishesTable = function () {
    return (
      <Table size="">
        <thead>
          <tr>
            <th>Název</th>
          </tr>
        </thead>
        <tbody>
          <SideDishes />
        </tbody>
      </Table>
    )
  }

  return (
    <Container>
      <h1>Přílohy</h1>
      <SideDishesTable />
    </Container>
  )
}
