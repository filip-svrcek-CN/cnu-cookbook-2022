import { useEffect, useState } from 'react';
import { Input } from 'reactstrap';

export function DirectionsForm({ updateData, directions }) {
  const [directionsFormData, setDirectionsFormData] = useState(directions);

  useEffect(() => {
    updateData({ directions: directionsFormData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionsFormData]);

  return (
    <Input
      onChange={(event) => setDirectionsFormData(event.target.value)}
      style={{ width: '100%' }}
      type="textarea"
      rows={20}
      value={directionsFormData}
    />
  );
}
