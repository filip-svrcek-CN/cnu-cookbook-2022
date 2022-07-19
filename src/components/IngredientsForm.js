import { useEffect, useState } from "react"
import { Input, Row, Col, FormGroup, Label, Button, InputGroup, ListGroup, ListGroupItem } from "reactstrap";
import { v4 as uuid } from 'uuid';

export function IngredientsForm({ getIngredients, initialData }) {
  const [ingredientsList, setIngredientsList] = useState(initialData.ingredients)
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientGroupName, setIngredientGroupName] = useState('');

  useEffect(() => {
    getIngredients(ingredientsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsList]);

  const handleDeleteItem = id => {
    setIngredientsList(ingredientsList.filter(({ _id }) => {
      return _id !== id;
    }));
  };

  const handleAddItem = () => {
    let newIngredient = {
      customId: uuid(),
      amount: ingredientAmount,
      amountUnit: ingredientUnit,
      name: ingredientName,
      isGroup: false
    };
    Object.keys(newIngredient).forEach(key => newIngredient[key] === '' && delete newIngredient[key]);
    setIngredientsList([...ingredientsList, newIngredient]);
    setIngredientAmount('');
    setIngredientUnit('');
    setIngredientName('');
  };

  const handleAddGroupItem = () => {
    setIngredientsList([...ingredientsList, {
      customId: uuid(),
      name: ingredientGroupName,
      isGroup: true
    }]);
    setIngredientGroupName('');
  };

  const IngredientsListItems = () => {
    return (
      <div style={{ marginBottom: "15px" }}>
        <ListGroup>
          {ingredientsList.map(({ name, amount, amountUnit, _id, customId, isGroup }) => {
            return (
              <ListGroupItem key={_id + customId} style={isGroup ? { backgroundColor: "lightgray", fontWeight: "bold" } : null}>
                <Button close type="button" style={{ marginRight: "10px" }} onClick={() => handleDeleteItem(_id)}></Button>{name} {amount} {amountUnit}
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }

  return (
    <div>
      <h3>Ingredience</h3>
      <IngredientsListItems />
      <div style={{ border: "1px solid #0d6efd", padding: "10px" }}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label>
                Název ingredience
              </Label>
              <InputGroup>
                <Input value={ingredientName} onChange={(event) => { setIngredientName(event.target.value) }} />
                <Button onClick={handleAddItem}>Přidat ingredienci</Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>
                Množství
              </Label>
              <Input value={ingredientAmount} type="number" onChange={(event) => { setIngredientAmount(event.target.value) }} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>
                Jednotka
              </Label>
              <Input value={ingredientUnit} onChange={(event) => { setIngredientUnit(event.target.value) }} />
            </FormGroup>
          </Col>
        </Row>
      </div>
      <div style={{ border: "1px solid #0d6efd", padding: "10px", marginTop: "15px" }}>
        <Col md={12}>
          <FormGroup>
            <Label>
              Název skupiny
            </Label>
            <InputGroup>
              <Input value={ingredientGroupName} onChange={(event) => { setIngredientGroupName(event.target.value) }} />
              <Button onClick={handleAddGroupItem}>Přidat skupinu</Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </div>
    </div>
  )
}
