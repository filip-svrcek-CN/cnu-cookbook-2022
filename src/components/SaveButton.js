import { Button } from 'reactstrap';

export function SaveButton({ handleSubmit, isLoading }) {
  return (
    <div>
      {!isLoading && (
        <Button
          block
          color="primary"
          style={{ margin: '12px 0px 12px 0px' }}
          onClick={handleSubmit}
        >
          Uložit recept
        </Button>
      )}
      {isLoading && (
        <Button
          disabled
          block
          color="primary"
          style={{ margin: '12px 0px 12px 0px' }}
        >
          Ukládání receptu...
        </Button>
      )}
    </div>
  )
}
