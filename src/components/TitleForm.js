import { FormFeedback, Input, FormGroup, Label } from 'reactstrap';

export function TitleForm({ updateData, title, invalidForm, setValid }) {
  return (
    <FormGroup className="position-relative">
      <Label>Název</Label>
      <Input
        id="title"
        name="title"
        onChange={(event) => {
          const title = event.target.value;
          updateData({ title });
        }}
        value={title || ''}
        invalid={invalidForm}
        onFocus={setValid}
      />
      <FormFeedback tooltip className="invalidTooltip">
        Pole je povinné
      </FormFeedback>
    </FormGroup>
  );
}
