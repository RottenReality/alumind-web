"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

type Product = {
  title: string;
  description: string;
  image: string;
  url: string;
};

interface ShowcaseSliderProps {
  products: Product[];
}

export default function ShowcaseSlider({ products }: ShowcaseSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () =>
    setActiveIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );

  const isEven = activeIndex % 2 === 0;

  return (
    <div className="w-full py-16">
      <div className="relative max-w-6xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            // aquí alternamos el orden en desktop; en mobile siempre columna
            className={`flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12 ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Imagen (columna) */}
            <div className="md:w-1/2 w-full flex justify-center items-center">
              <div className="relative w-full max-w-[520px] h-64 md:h-[420px]">
                <Image
                  src={products[activeIndex].image}
                  alt={products[activeIndex].title}
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Texto (columna) */}
            {/* El wrapper interior limita el ancho y se empuja hacia el centro con ml-auto / mr-auto */}
            <div className="md:w-1/2 w-full flex items-center">
              <div
                className={`max-w-xl flex flex-col gap-4 ${
                  isEven ? "md:mr-auto md:text-left text-center" : "md:ml-auto md:text-right text-center"
                }`}
              >
                <h2 className="text-3xl font-bold text-secondary">
                  {products[activeIndex].title}
                </h2>
                <p className="text-gray-600">
                  {products[activeIndex].description}
                </p>
                <div className={`inline-block py-3 ${isEven ? "md:self-start self-center" : "md:self-end self-center"}`}>
                  <a href={products[activeIndex].url}></a>
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="bg-white text-black"
                  >
                    <span>Contactar</span>
                  </HoverBorderGradient>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles: los movemos un poco hacia fuera para no tapar contenido */}
        <button
          onClick={prevSlide}
          aria-label="Anterior"
          className="flex absolute top-1/2 left-2 -translate-y-1/2 p-2 md:p-3 bg-white shadow rounded-full hover:bg-gray-100 md:-left-6"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Siguiente"
          className="flex absolute top-1/2 right-2 -translate-y-1/2 p-2 md:p-3 bg-white shadow rounded-full hover:bg-gray-100 md:-right-6"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex space-x-2 mt-6 justify-center">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`w-3 h-3 rounded-full ${
              activeIndex === i ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
