import { useEffect, useState } from "react"
import { Input } from "reactstrap";

export function DirectionsForm({ updateDirections, directions }) {
  const [directionsFormData, setDirectionsFormData] = useState(directions);

  useEffect(() => {
    updateDirections(directionsFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionsFormData])

  return (
    <Input
      onChange={(event) => setDirectionsFormData(event.target.value)}
      style={{ width: "100%" }}
      type="textarea"
      rows={20}
      value={directionsFormData}
    />
  )
}
