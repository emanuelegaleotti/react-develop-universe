import { RDU_Button } from '../../../../lib/components/buttons/button/Button.tsx'

const columns = ['Tecnologia', 'Anno', 'Utilizzo', 'Diffusione']
const rows: string[][] = [
  ['React', '2013', '~60–75% tra sviluppatori nei survey', 'USA / mercati anglofoni'],
  ['Vue.js', '2014', '~15% (survey dev)', 'Cina / Asia'],
  ['Angular', '2016', '~15–25%, forte in ambito enterprise', 'Europa e India'],
  ['Svelte', '2016', '~5–20%, in rapida crescita', 'Startup, EU/US'],
  ['Next.js', '2016', '~40–60% tra gli sviluppatori React', 'USA / ecosistema Vercel'],
  ['jQuery', '2006', '~70–90% dei siti (legacy)', 'Globale']
]

async function exportPDF() {
  const [{ jsPDF }, { autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable')
  ])
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text('Tecnologie frontend', 14, 18)
  autoTable(doc, {
    startY: 24,
    head: [columns],
    body: rows,
    headStyles: { fillColor: [8, 126, 164] }
  })
  doc.save('tecnologie-frontend.pdf')
}

export function PdfPage() {
  return (
    <section id="ks-pdf">
      <h2>Export PDF</h2>
      <p>Esportazione di una tabella in PDF con <code>jsPDF</code> e <code>jspdf-autotable</code>, caricati solo al momento del click.</p>
      <article>
        <h3>Dati</h3>
        <table className="rdu-table">
          <thead>
            <tr>
              {columns.map(column => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row[0]}>
                {row.map((cell, index) => <td key={index}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <article>
        <h3>Esporta</h3>
        <p>Genera il documento dalla tabella qui sopra e avvia il download di <code>tecnologie-frontend.pdf</code>.</p>
        <div className="ks-actions">
          <RDU_Button type="button" text="export-pdf" onClick={exportPDF}/>
        </div>
      </article>
    </section>
  )
}
