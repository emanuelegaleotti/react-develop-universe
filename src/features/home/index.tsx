import { Link } from 'react-router'
import './home.scss'

const sections = [
  { to: '/design/buttons', title: 'Design', description: 'Buttons in every variant, size and state, and the dropdown menu.' },
  { to: '/inputs/text', title: 'Inputs', description: 'Text, number, date, select, file and more, all wired to react-hook-form.' },
  { to: '/charts/line', title: 'Charts', description: 'Line, bar, pie, scatter, area and more, drawn with ECharts and Highcharts.' },
  { to: '/utility/pager', title: 'Utility', description: 'Pager, cards, carousel, picture, loader, intersection observer and notifications.' },
  { to: '/export/csv', title: 'Export', description: 'Export data to CSV and PDF.' },
  { to: '/chat/chat', title: 'Chat', description: 'Chat component with message list and form.' },
  { to: '/dialogs/offcanvas', title: 'Dialogs', description: 'Dialog, offcanvas, bottom sheet, toast, popover and error dialog.' },
  { to: '/crud/pokemon', title: 'Crud', description: 'Full CRUD examples built on the PokéAPI.' }
]

export function Home () {
  return (
    <section id="ks-home">
      <h2>react-develop-universe</h2>
      <p className="ks-lead">
        A collection of React components, inputs and charts. Pick a section from the sidebar
        to see each component in action.
      </p>
      <nav className="ks-cards" aria-label="Sections">
        {sections.map(section => (
          <Link key={section.to} to={section.to}>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </Link>
        ))}
      </nav>
    </section>
  )
}
