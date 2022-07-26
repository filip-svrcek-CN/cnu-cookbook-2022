import { Input } from 'reactstrap';

export function DirectionsForm({ updateData, directions }) {
  return (
    <Input
      onChange={(event) => {
        const directions = event.target.value;
        updateData({ directions });
      }}
      style={{ width: '100%' }}
      type="textarea"
      rows={20}
      value={directions}
    />
  );
}
