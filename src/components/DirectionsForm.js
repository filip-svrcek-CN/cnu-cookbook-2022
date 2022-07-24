import { useEffect, useState } from "react"

export function DirectionsForm({ getDirections, directions }) {
  const [directionsData, setDirectionsData] = useState(directions);

  useEffect(() => {
    getDirections(directionsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionsData])

  return (
    <textarea
      onChange={(event) => setDirectionsData(event.target.value)}
      style={{ width: "100%" }}
      rows={20}
    >
      {directionsData}</textarea>
  )
}
