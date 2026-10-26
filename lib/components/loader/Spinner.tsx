import './_loader.scss'

export function RDU_Spinner ({ label = 'Loading' }: { label?: string }) {
  return <span className="rdu-spinner" role="status" aria-label={label} />
}
