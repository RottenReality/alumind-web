import React from 'react'
import ProductCarousel from '@/components/ui/ProductCarousel';

const Spectrometers = () => {
  const products = [
  {
    title: "CALIBUS",
    description: "El CALIBUS es nuestro espectrómetro de ruptura inducida por láser (LIBS, por sus siglas en inglés). Es el primer analizador LIBS basado en semiconductor complementario de óxido metálico (CMOS) del mercado capaz de medir carbono en materiales ferrosos \nEl nuevo CALIBUS es una solución analítica ideal para control de calidad (QA/QC), fabricación y mecanizado metalúrgico, las industrias petroquímicas, y el sector de chatarra y reciclaje.",
    image: "/images/spec-calibus.png"
  },
  {
    title: "MERLIN 4",
    description: "El MERLIN 4 es un espectrómetro de rango medio basado en semiconductor complementario de óxido metálico (CMOS), disponible tanto como una unidad de base única dedicada como en un versátil sistema multibase.\nEstá perfectamente adaptado para las industrias de producción e inspección de metales, laboratorios de análisis por contrato y la industria naval, siendo también ideal para el procesamiento de metales.",
    image: "/images/spec-merlin4.png"
  },
  {
    title: "ARTUS 8 (OES)",
    description: "El ARTUS 8 cumple con el requisito de proporcionar análisis rápidos, precisos y exactos para una fusión perfecta. Es uno de los espectrómetros más potentes y fiables, ofreciendo una gama completa de programas analíticos, incluyendo hierros fundidos, aceros con carbono y nitrógeno, y todos los elementos de aleación y sus trazas necesarios para el tratamiento.\nOfrece todas las ventajas de un espectrómetro de semiconductor complementario de óxido metálico (CMOS) flexible y versátil. Incluso compite en ciertas aplicaciones con los sistemas clásicos de tubo fotomultiplicador, que siguen siendo la referencia en la espectrometría de emisión óptica (OES) de alta gama.",
    image: "/images/spec-artus8.png"
  },
  {
    title: "ARTUS 10 (OES)",
    description: "El ARTUS 10 incluye un sensor CMOS de grado científico que permite reducir el tiempo de análisis para algunos metales a tan solo 10 segundos. Además, sus algoritmos inteligentes eliminan la interferencia de fondo, lo que permite un rendimiento analítico óptimo.\nEntre las características del ARTUS, también se incluyen: un sistema óptico dual; un diseño fluido del canal de gas; una cámara de luz encapsulada en aluminio fundido a presión; acceso sin herramientas a las lentes ópticas UV y visibles; y un dispositivo de bloqueo de electrodos de tipo cierre.",
    image: "/images/spec-artus10.png"
  },
];

  return (
    <section className="py-20 bg-muted/30 bg-gradient-to-r from-gray-50 via-slate-100 to-blue-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-secondary">
            Espectrómetros
          </h2>
        </div>
        <div>
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  )
}

export default Spectrometers