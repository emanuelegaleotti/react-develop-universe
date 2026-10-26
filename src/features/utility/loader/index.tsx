import { useEffect, useRef, useState } from 'react'
import axios, { AxiosAdapter } from 'axios'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { hideLoader, selectLoaders, showLoader } from '../../../../lib/components/loader/loader-slice.ts'
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts'
import './loader.scss'

const SWAPI = 'https://swapi.dev/api'
const REQUEST_DELAY_MS = 2500
const LOADER_MS = 3000

// SWAPI answers in a few milliseconds: the delay makes the loader (or its absence) visible
const slowAdapter: AxiosAdapter = async config => {
  await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS))
  return axios.getAdapter(axios.defaults.adapter)(config)
}

interface RequestResult {
  ok: boolean
  message: string
}

type RequestKey = 'global' | 'header' | 'url'

async function callSwapi (path: string, headers?: Record<string, string>): Promise<RequestResult> {
  const start = performance.now()
  // The loader interceptor swallows errors, so a failed call resolves with undefined
  const response = await axios.get(`${SWAPI}/${path}`, { adapter: slowAdapter, headers })
  const elapsed = Math.round(performance.now() - start)
  console.log(response)
  if (!response) {
    return { ok: false, message: 'Richiesta non riuscita: SWAPI non è raggiungibile.' }
  }
  return { ok: true, message: `Risposta ${response.status}: ${response.data.count} risultati in ${elapsed} ms.` }
}

export function LoaderPage () {
  const dispatch = useAppDispatch()
  const loaders = useAppSelector(selectLoaders)
  const [results, setResults] = useState<Partial<Record<RequestKey, RequestResult>>>({})
  const [pending, setPending] = useState<Partial<Record<RequestKey, boolean>>>({})
  const timers = useRef<number[]>([])

  useEffect(() => {
    const active = timers.current
    return () => active.forEach(timer => window.clearTimeout(timer))
  }, [])

  const run = async (key: RequestKey, path: string, headers?: Record<string, string>) => {
    setPending(state => ({ ...state, [key]: true }))
    setResults(state => ({ ...state, [key]: undefined }))
    const result = await callSwapi(path, headers)
    setResults(state => ({ ...state, [key]: result }))
    setPending(state => ({ ...state, [key]: false }))
  }

  const showFor = (...durations: number[]) => {
    durations.forEach(duration => {
      dispatch(showLoader())
      timers.current.push(window.setTimeout(() => dispatch(hideLoader()), duration))
    })
  }

  const renderResult = (key: RequestKey) => {
    if (pending[key]) return <p className="ks-loader-result" data-state="pending">Richiesta in corso…</p>
    const result = results[key]
    if (!result) return null
    return <p className="ks-loader-result" data-state={result.ok ? 'ok' : 'error'}>{result.message}</p>
  }

  return (
    <section id="ks-loader">
      <h2>Loader</h2>
      <p>
        Overlay di caricamento globale con <code>LoaderProvider</code>: l&apos;interceptor di axios lo mostra a
        ogni richiesta, oppure si comanda a mano con le action <code>showLoader</code> e <code>hideLoader</code>.
      </p>

      <article>
        <h3>GlobalLoader</h3>
        <p>
          Ogni richiesta axios incrementa il contatore del loader, che resta visibile finché tutte le risposte sono
          arrivate. La chiamata a SWAPI è ritardata di 2,5 secondi per renderlo visibile.
        </p>
        <div className="ks-actions">
          <RDU_Button type="button" text="call" disabled={pending.global}
                      onClick={() => run('global', 'starships')}/>
        </div>
        {renderResult('global')}
      </article>

      <article>
        <h3>Exclude loader with headers</h3>
        <p>
          La richiesta con l&apos;header <code>No-Loader</code> viene ignorata dall&apos;interceptor: la pagina
          resta interattiva.
        </p>
        <div className="ks-actions">
          <RDU_Button type="button" text="call" disabled={pending.header}
                      onClick={() => run('header', 'starships', { 'No-Loader': 'true' })}/>
        </div>
        {renderResult('header')}
      </article>

      <article>
        <h3>Exclude loader with urls</h3>
        <p>
          L&apos;interceptor è configurato con <code>excludeUrls</code>: le richieste GET verso <code>/planets</code> non
          mostrano il loader.
        </p>
        <div className="ks-actions">
          <RDU_Button type="button" text="call" disabled={pending.url}
                      onClick={() => run('url', 'planets')}/>
        </div>
        {renderResult('url')}
      </article>

      <article>
        <h3>Loader manuale</h3>
        <p>
          Senza chiamate di rete, basta dispatchare <code>showLoader</code> e poi <code>hideLoader</code>. Il loader
          resta visibile finché il contatore non torna a zero.
        </p>
        <div className="ks-actions">
          <RDU_Button type="button" text="show-loader" onClick={() => showFor(LOADER_MS)}/>
          <RDU_Button type="button" variant="secondary" text="show-nested-loaders"
                      onClick={() => showFor(LOADER_MS, LOADER_MS * 1.5)}/>
        </div>
        <p className="ks-loader-counter">Loader attivi: <strong>{loaders}</strong></p>
        <pre><code>{`dispatch(showLoader())
setTimeout(() => dispatch(hideLoader()), 3000)`}</code></pre>
      </article>
    </section>
  )
}
