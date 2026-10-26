import { RDU_Carousel } from '../../../../lib/components/carousel/Carousel.tsx'
import './carousel.scss'

const pictures = Array.from({ length: 12 }, (_, index) => index + 1)

export function CarouselPage () {
  return (
    <section id="ks-carousel">
      <h2>Carousel</h2>
      <p>
        Carousel in puro CSS con <code>RDU_Carousel</code>: scroll snap, pulsanti, indicatori e slide non attive
        disabilitate. Richiede un browser che supporti le funzioni CSS carousel (Chrome 135+).
      </p>
      <article>
        <h3>Carousel Component</h3>
        <RDU_Carousel
          id="carousel"
          scrollButtons
          scrollMarker
          container
          inert
          slidesPerView={4}
        >
          {pictures.map(n => (
            <img key={n} src={`https://picsum.photos/500/500?random=${n}`} alt={`picture ${n}`}/>
          ))}
        </RDU_Carousel>
      </article>
    </section>
  )
}
