import { download, generateCsv, mkConfig } from 'export-to-csv'
import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'

const frontendTechnologies = [
  {
    tecnologia: 'React',
    annoPrimoRilascio: 2013,
    utilizzo: '~60–75% tra sviluppatori nei survey; larga presenza su siti aziendali',
    areaDiffusione: 'USA / mercati anglofoni (forte presenza enterprise e job market)',
    popolaritaFutura: 'Rimarrà leader: stabile o leggero aumento grazie all’ecosistema (Next.js, tooling, TypeScript)'
  },
  {
    tecnologia: 'Vue.js',
    annoPrimoRilascio: 2014,
    utilizzo: '~15% (survey dev); ~9–10% tra i siti top 1M (metriche diverse)',
    areaDiffusione: 'Cina / Asia (adozione molto forte); buona adozione globale',
    popolaritaFutura: 'Stabile o in crescita nelle regioni dove è già forte; adatto a team e progetti nuovi'
  },
  {
    tecnologia: 'Angular',
    annoPrimoRilascio: '2010 (AngularJS) / 2016 (Angular 2+)',
    utilizzo: '~15–25% (varia per survey; forte in applicazioni enterprise)',
    areaDiffusione: 'Diffuso in ambito enterprise; forte presenza in Europa e India',
    popolaritaFutura: 'Stabile nelle grandi organizzazioni; crescita limitata rispetto a React/Vue'
  },
  {
    tecnologia: 'Svelte',
    annoPrimoRilascio: 2016,
    utilizzo: '~5–20% (in rapida crescita nei developer survey; elevata soddisfazione)',
    areaDiffusione: 'Comunità moderne e startup; diffusione globale con attenzione in EU/US',
    popolaritaFutura: 'Crescita marcata: probabilmente in aumento grazie all’apprezzamento degli sviluppatori'
  },
  {
    tecnologia: 'Next.js (meta-framework React)',
    annoPrimoRilascio: 2016,
    utilizzo: '~40–60% tra sviluppatori React che usano meta-framework; forte per SSR/SSG',
    areaDiffusione: 'USA / aziende che usano React + Vercel / ecosistema web moderno',
    popolaritaFutura: 'In forte crescita: sempre più progetti React scelgono Next.js per performance e SEO'
  },
  {
    tecnologia: 'jQuery',
    annoPrimoRilascio: 2006,
    utilizzo: 'Ancora molto diffuso sui siti web: ~70–90% (share dei siti che includono jQuery; attenzione a metriche legacy)',
    areaDiffusione: 'Globale (molti CMS e siti legacy — WordPress e plugin mantengono l’uso)',
    popolaritaFutura: 'In calo per nuovi progetti, ma rimarrà presente nei siti legacy; impatto sulle performance da valutare caso per caso'
  }
]

const csvConfig = mkConfig({ useKeysAsHeaders: true })

export function CsvPage() {
  const exportCSV = () => {
    const csv = generateCsv(csvConfig)(frontendTechnologies)
    download(csvConfig)(csv)
  }

  return (
    <section id="ks-csv">
      <h2>Export CSV</h2>
      <p>Esportazione di un elenco di oggetti in un file CSV con <code>export-to-csv</code>: le chiavi diventano l’intestazione.</p>
      <article>
        <h3>Dati</h3>
        <pre>{JSON.stringify(frontendTechnologies, null, 2)}</pre>
      </article>
      <article>
        <h3>Esporta</h3>
        <p>Genera il CSV dai {frontendTechnologies.length} record qui sopra e avvia il download del file.</p>
        <div className="ks-actions">
          <RDU_Button type="button" text="export-csv" onClick={exportCSV}/>
        </div>
      </article>
    </section>
  )
}
