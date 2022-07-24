import { useEffect, useState } from "react"

export function DirectionsForm({ updateDirections, directions }) {
  const [directionsData, setDirectionsData] = useState(directions);

  useEffect(() => {
    updateDirections(directionsData);
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
