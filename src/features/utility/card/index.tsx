import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'
import { RDU_Card } from '../../../../lib/components/cards/card/card.tsx'
import { RDU_CardBody } from '../../../../lib/components/cards/card-body/card-body.tsx'
import { RDU_CardFooter } from '../../../../lib/components/cards/card-footer/card-footer.tsx'
import { RDU_CardHeader } from '../../../../lib/components/cards/card-header/card-header.tsx'
import './card.scss'

const noop = () => {}

export function CardPage () {
  return (
    <section id="ks-card-page">
      <h2>Card</h2>
      <p>
        Schede con <code>RDU_Card</code>, <code>RDU_CardHeader</code>, <code>RDU_CardBody</code> e{' '}
        <code>RDU_CardFooter</code>: header e footer sono opzionali e restano nascosti se vuoti.
      </p>

      <article>
        <h3>Struttura completa</h3>
        <p>Header, corpo e footer: i tre blocchi sono indipendenti e si possono combinare liberamente.</p>
        <div className="ks-card-single">
          <RDU_Card>
            <RDU_CardHeader><h3>Title</h3></RDU_CardHeader>
            <RDU_CardBody><p>Description</p></RDU_CardBody>
            <RDU_CardFooter>Footer</RDU_CardFooter>
          </RDU_Card>
        </div>
        <pre><code>{`<RDU_Card>
  <RDU_CardHeader><h3>Title</h3></RDU_CardHeader>
  <RDU_CardBody><p>Description</p></RDU_CardBody>
  <RDU_CardFooter>Footer</RDU_CardFooter>
</RDU_Card>`}</code></pre>
      </article>

      <article>
        <h3>Combinazioni</h3>
        <p>Quali blocchi compongono la scheda: solo corpo, header e corpo, corpo e footer con azioni.</p>
        <div className="ks-card-grid">
          <figure>
            <RDU_Card>
              <RDU_CardBody>Una scheda con il solo corpo, utile per brevi contenuti.</RDU_CardBody>
            </RDU_Card>
            <figcaption>Solo <code>RDU_CardBody</code></figcaption>
          </figure>
          <figure>
            <RDU_Card>
              <RDU_CardHeader>Titolo</RDU_CardHeader>
              <RDU_CardBody>Header e corpo, senza footer.</RDU_CardBody>
            </RDU_Card>
            <figcaption>Header e corpo</figcaption>
          </figure>
          <figure>
            <RDU_Card>
              <RDU_CardBody>Il footer può ospitare azioni come pulsanti.</RDU_CardBody>
              <RDU_CardFooter>
                <RDU_Button type="button" variant="secondary" size="small" text="cancel" onClick={noop}/>
                <RDU_Button type="button" size="small" text="confirm" onClick={noop}/>
              </RDU_CardFooter>
            </RDU_Card>
            <figcaption>Corpo e footer con azioni</figcaption>
          </figure>
        </div>
      </article>

      <article>
        <h3>Varianti</h3>
        <p>La prop <code>variant</code> cambia l&apos;aspetto della scheda: <code>outlined</code>, <code>elevated</code> e <code>accent</code>.</p>
        <div className="ks-card-grid">
          <figure>
            <RDU_Card variant="outlined">
              <RDU_CardHeader>Outlined</RDU_CardHeader>
              <RDU_CardBody>Solo bordo, sfondo trasparente.</RDU_CardBody>
              <RDU_CardFooter>Footer</RDU_CardFooter>
            </RDU_Card>
            <figcaption><code>variant=&quot;outlined&quot;</code></figcaption>
          </figure>
          <figure>
            <RDU_Card variant="elevated">
              <RDU_CardHeader>Elevated</RDU_CardHeader>
              <RDU_CardBody>Ombra al posto del bordo.</RDU_CardBody>
              <RDU_CardFooter>Footer</RDU_CardFooter>
            </RDU_Card>
            <figcaption><code>variant=&quot;elevated&quot;</code></figcaption>
          </figure>
          <figure>
            <RDU_Card variant="accent">
              <RDU_CardHeader>Accent</RDU_CardHeader>
              <RDU_CardBody>Bordo e sfondo con il colore primario.</RDU_CardBody>
              <RDU_CardFooter>Footer</RDU_CardFooter>
            </RDU_Card>
            <figcaption><code>variant=&quot;accent&quot;</code></figcaption>
          </figure>
        </div>
      </article>

      <article>
        <h3>Personalizzazione</h3>
        <p>L&apos;aspetto si configura con le custom property della libreria, valorizzate nel foglio di stile dell&apos;applicazione.</p>
        <table className="rdu-table">
          <thead>
          <tr>
            <th>Custom property</th>
            <th>Descrizione</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><code>--rdu-card-width</code></td>
            <td>Larghezza della scheda (default 40rem).</td>
          </tr>
          <tr>
            <td><code>--rdu-card-border-color</code>, <code>--rdu-card-border-radius</code></td>
            <td>Bordo e angoli.</td>
          </tr>
          <tr>
            <td><code>--rdu-card-header-*</code>, <code>--rdu-card-body-*</code>, <code>--rdu-card-footer-*</code></td>
            <td>Padding, sfondo, colore e tipografia di ogni blocco.</td>
          </tr>
          <tr>
            <td><code>--rdu-card-elevated-box-shadow</code></td>
            <td>Ombra della variante <code>elevated</code>.</td>
          </tr>
          <tr>
            <td><code>--rdu-card-accent-border-color</code>, <code>--rdu-card-accent-background</code></td>
            <td>Colori della variante <code>accent</code>.</td>
          </tr>
          </tbody>
        </table>
      </article>
    </section>
  )
}
