import { Input } from 'reactstrap';

export function DirectionsForm({ updateData, directions }) {
  return (
    <div>
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
      <div
        style={{ fontStyle: 'italic', fontSize: '12px', textAlign: 'right' }}
      >
        <a
          style={{ color: 'black' }}
          target="\_blank"
          href="https://www.markdownguide.org/cheat-sheet/"
        >
          *Markdown syntax návod
        </a>
      </div>
    </div>
  );
}
