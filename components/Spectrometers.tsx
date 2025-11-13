import React from 'react'
import ProductCarousel from '@/components/ui/ProductCarousel';
import { useTranslations } from "next-intl";

const Spectrometers = () => {
  const t = useTranslations("spectrometers");

  const products = [
  {
    title: t("catalog.spec1.title"),
    description: t("catalog.spec1.description"),
    image: "/images/spec-calibus.png"
  },
  {
    title: t("catalog.spec2.title"),
    description: t("catalog.spec2.description"),
    image: "/images/spec-merlin4.png"
  },
  {
    title: t("catalog.spec3.title"),
    description: t("catalog.spec3.description"),
    image: "/images/spec-artus8.png"
  },
  {
    title: t("catalog.spec4.title"),
    description: t("catalog.spec4.description"),
    image: "/images/spec-artus10.png"
  },
];

  return (
    <section className="py-20 bg-muted/30 bg-gradient-to-r from-gray-50 via-slate-100 to-blue-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-secondary">
            {t("title")}
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