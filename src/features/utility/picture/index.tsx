import { useEffect, useState } from 'react'
import { PICTURE_BREAKPOINT_MAP, PictureBreakpoint, RDU_Picture, RduPictureSource } from '../../../../lib/components/picture/Picture.tsx'
import './picture.scss'

const photo = (id: number, size: number) => `https://picsum.photos/id/${id}/${size}/${size}`

function buildSource (id: number, size: number): RduPictureSource {
  return {
    srcSet: photo(id, size),
    srcSet2x: photo(id, size + 100),
    srcSet3x: photo(id, size + 200),
    width: size,
    height: size,
  }
}

const breakpoints = Object.entries(PICTURE_BREAKPOINT_MAP) as [PictureBreakpoint, string][]

function currentBreakpoint (width: number): string {
  const matched = [...breakpoints].reverse().find(([, query]) => width >= parseInt(query.replace(/\D+/, ''), 10))
  return matched ? matched[0] : 'base'
}

export function PicturePage () {
  const [viewport, setViewport] = useState(window.innerWidth)
  const [currentSrc, setCurrentSrc] = useState('')

  useEffect(() => {
    const onResize = () => setViewport(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section id="ks-picture">
      <h2>Picture</h2>
      <p>
        Immagini responsive con <code>RDU_Picture</code>: sorgenti diverse per breakpoint, densità 1x/2x/3x e
        caricamento <code>lazy</code>.
      </p>

      <article>
        <h3>Immagine responsive</h3>
        <p>La sorgente cambia in base al breakpoint; ridimensiona la finestra per vederla cambiare.</p>
        <div className="ks-picture-stage">
          <RDU_Picture
            id="picture1"
            src={photo(10, 100)}
            alt="picture1 text"
            width={100}
            height={100}
            sourceSm={buildSource(10, 200)}
            sourceMd={buildSource(10, 300)}
            sourceLg={buildSource(10, 400)}
            sourceXl={buildSource(10, 500)}
            source2xl={buildSource(10, 600)}
            onLoad={event => setCurrentSrc(event.currentTarget.currentSrc)}
          />
        </div>
        <dl className="ks-picture-info">
          <div>
            <dt>Larghezza finestra</dt>
            <dd>{viewport}px</dd>
          </div>
          <div>
            <dt>Breakpoint</dt>
            <dd>{currentBreakpoint(viewport)}</dd>
          </div>
          <div>
            <dt>Sorgente caricata</dt>
            <dd>{currentSrc.replace(/\?.*$/, '') || '—'}</dd>
          </div>
        </dl>
        <pre><code>{`<RDU_Picture
  id="picture1"
  src="https://picsum.photos/id/10/100/100"
  alt="picture1 text"
  width={100}
  height={100}
  sourceSm={{ srcSet: '...200', srcSet2x: '...300', srcSet3x: '...400', width: 200, height: 200 }}
  sourceMd={{ ... }}
/>`}</code></pre>
      </article>

      <article>
        <h3>Priorità di caricamento</h3>
        <p>
          <code>loading</code> e <code>fetchPriority</code> controllano quando e con quale priorità il browser scarica
          l&apos;immagine.
        </p>
        <div className="ks-picture-grid">
          <figure>
            <RDU_Picture src={photo(20, 240)} alt="Immagine caricata subito" width={240} height={240}
                         loading="eager" fetchPriority="high"/>
            <figcaption><code>loading=&quot;eager&quot;</code> con <code>fetchPriority=&quot;high&quot;</code></figcaption>
          </figure>
          <figure>
            <RDU_Picture src={photo(30, 240)} alt="Immagine caricata in modo differito" width={240} height={240}
                         loading="lazy" decoding="async"/>
            <figcaption><code>loading=&quot;lazy&quot;</code> con <code>decoding=&quot;async&quot;</code> (default)</figcaption>
          </figure>
        </div>
      </article>

      <article>
        <h3>Breakpoint</h3>
        <p>Le sorgenti vengono valutate dalla più larga alla più stretta: vince la prima che corrisponde.</p>
        <table className="rdu-table">
          <thead>
          <tr>
            <th>Prop</th>
            <th>Media query</th>
          </tr>
          </thead>
          <tbody>
          {[...breakpoints].reverse().map(([name, query]) => (
            <tr key={name}>
              <td><code>{name === '2xl' ? 'source2xl' : `source${name[0].toUpperCase()}${name.slice(1)}`}</code></td>
              <td><code>{query}</code></td>
            </tr>
          ))}
          </tbody>
        </table>
      </article>
    </section>
  )
}
