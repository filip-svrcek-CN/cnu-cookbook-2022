import ReactMarkdown from 'https://esm.sh/react-markdown@7'

export function DirectionsList({ directions }) {
  return (
    <ReactMarkdown>{directions}</ReactMarkdown>
  )
}
