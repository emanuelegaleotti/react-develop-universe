import { memo, useCallback, useRef, useState } from 'react'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { RDU_Intersection } from '../../../../lib/components/intersection/Intersection.tsx'
import { RDU_Spinner } from '../../../../lib/components/loader/Spinner.tsx'
import './intersection.scss'

const SWAPI_STARSHIPS = 'https://swapi.dev/api/starships/'
const ITEMS = Array.from({ length: 200 }, (_, index) => index)
const LOG_SIZE = 8

interface Starship {
  name: string
  model: string
  starship_class: string
  passengers: string
}

interface LogEntry {
  id: number
  index: number
  event: 'in' | 'out'
}

interface ItemProps {
  index: number
  visible: boolean
  onChange: (index: number, event: 'in' | 'out') => void
}

const Item = memo(function Item ({ index, visible, onChange }: ItemProps) {
  return (
    <li>
      <RDU_Intersection
        className={visible ? 'ks-intersection-item ks-visible' : 'ks-intersection-item'}
        onItemIn={() => onChange(index, 'in')}
        onItemOut={() => onChange(index, 'out')}
      >
        Elemento {index}
        <span>{visible ? 'visibile' : 'fuori vista'}</span>
      </RDU_Intersection>
    </li>
  )
})

function ObservedList () {
  const [visible, setVisible] = useState<Set<number>>(new Set())
  const [log, setLog] = useState<LogEntry[]>([])
  const counter = useRef(0)

  const onChange = useCallback((index: number, event: 'in' | 'out') => {
    console.log(`${index} - ${event}`)
    setVisible(current => {
      const next = new Set(current)
      if (event === 'in') next.add(index)
      else next.delete(index)
      return next
    })
    setLog(current => [{ id: counter.current++, index, event }, ...current].slice(0, LOG_SIZE))
  }, [])

  return (
    <div className="ks-intersection-layout">
      <ul className="ks-intersection-list">
        {ITEMS.map(index => (
          <Item key={index} index={index} visible={visible.has(index)} onChange={onChange}/>
        ))}
      </ul>
      <aside className="ks-intersection-log" aria-live="off">
        <p>Elementi visibili: <strong>{visible.size}</strong></p>
        <h4>Ultimi eventi</h4>
        <ol>
          {log.length === 0 && <li>Nessun evento</li>}
          {log.map(entry => (
            <li key={entry.id} data-event={entry.event}>{entry.index} - {entry.event}</li>
          ))}
        </ol>
      </aside>
    </div>
  )
}

function InfiniteStarships () {
  const [root, setRoot] = useState<HTMLDivElement | null>(null)
  const [ships, setShips] = useState<Starship[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [done, setDone] = useState(false)
  const busy = useRef(false)
  const nextUrl = useRef<string | null>(`${SWAPI_STARSHIPS}?page=1`)

  const loadMore = useCallback(async () => {
    if (busy.current || !nextUrl.current) return
    busy.current = true
    setLoading(true)
    setError(false)
    try {
      const response = await fetch(nextUrl.current)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data: { next: string | null, results: Starship[] } = await response.json()
      nextUrl.current = data.next?.replace('http://', 'https://') ?? null
      setShips(current => [...current, ...data.results])
      setDone(!nextUrl.current)
    } catch {
      setError(true)
    } finally {
      busy.current = false
      setLoading(false)
    }
  }, [])

  return (
    <div className="ks-intersection-scroll" ref={setRoot} tabIndex={0} aria-label="Astronavi di Star Wars">
      <ul>
        {ships.map(ship => (
          <li key={ship.name}>
            <div className="ks-intersection-item">
              {ship.name}
              <span>{ship.model} · {ship.starship_class}</span>
            </div>
          </li>
        ))}
      </ul>
      {root && !done && !error && (
        <RDU_Intersection key={ships.length} root={root} rootMargin="80px" className="ks-intersection-sentinel"
                          onItemIn={loadMore}>
          <RDU_Spinner label="Caricamento"/>
          <span>{loading ? 'Caricamento…' : 'Scorri per caricare altre astronavi'}</span>
        </RDU_Intersection>
      )}
      {error && (
        <div className="ks-intersection-error" role="alert">
          <p>Impossibile caricare le astronavi: SWAPI non è raggiungibile.</p>
          <RDU_Button type="button" variant="secondary" text="retry" onClick={loadMore}/>
        </div>
      )}
      {done && <p className="ks-intersection-end">Hai visto tutte le {ships.length} astronavi.</p>}
    </div>
  )
}

export function IntersectionPage () {
  return (
    <section id="ks-intersection">
      <h2>Intersection observer</h2>
      <p>
        Hook <code>useIntersection</code> e componente <code>RDU_Intersection</code>: notificano quando un elemento
        entra o esce dal viewport (o da un contenitore scorrevole).
      </p>

      <article className="ks-intersection-observed">
        <h3>Lista di 200 elementi</h3>
        <p>Apri la console: ogni riga logga l&apos;ingresso e l&apos;uscita dal viewport.</p>
        <ObservedList/>
        <pre><code>{`<RDU_Intersection onItemIn={() => log('in')} onItemOut={() => log('out')}>
  Elemento 0
</RDU_Intersection>`}</code></pre>
      </article>

      <article>
        <h3>Caricamento infinito</h3>
        <p>
          Un elemento sentinella in fondo alla lista carica la pagina successiva delle astronavi di SWAPI quando
          entra nell&apos;area visibile.
        </p>
        <InfiniteStarships/>
      </article>
    </section>
  )
}
