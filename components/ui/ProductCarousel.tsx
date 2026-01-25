"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useTranslations } from "next-intl";

type Product = {
  title: string;
  description: string;
  image: string;
};

interface ShowcaseSliderProps {
  products: Product[];
}

export default function ShowcaseSlider({ products }: ShowcaseSliderProps) {
  const t = useTranslations("spectrometers");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16 ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Image Side with Enhanced Effects */}
            <div className="md:w-1/2 w-full flex justify-center items-center">
              <motion.div
                className="relative w-full max-w-[520px] h-64 md:h-[420px] group"
                onHoverStart={() => setIsImageHovered(true)}
                onHoverEnd={() => setIsImageHovered(false)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                  animate={{
                    scale: isImageHovered ? 1.1 : 0.95,
                    opacity: isImageHovered ? 0.8 : 0.4,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Card Container with Glow Effect */}
                <motion.div
                  className="relative w-full h-full bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden"
                  animate={{
                    boxShadow: isImageHovered
                      ? "0 25px 50px -12px rgba(8, 93, 146, 0.4), 0 0 30px rgba(8, 93, 146, 0.2)"
                      : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shimmer Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: isImageHovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  {/* Product Image with 3D Tilt Effect */}
                  <motion.div
                    className="relative w-full h-full p-8"
                    animate={{
                      rotateY: isImageHovered ? 5 : 0,
                      rotateX: isImageHovered ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={products[activeIndex].image}
                      alt={products[activeIndex].title}
                      fill
                      className="object-contain drop-shadow-2xl"
                      style={{ transform: "translateZ(20px)" }}
                    />
                  </motion.div>

                  {/* Decorative Corner Accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#085d92]/20 to-transparent rounded-br-full" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#044362]/20 to-transparent rounded-tl-full" />
                </motion.div>

                {/* Floating Particles Effect */}
                {isImageHovered && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full"
                        initial={{
                          x: "50%",
                          y: "50%",
                          opacity: 0,
                        }}
                        animate={{
                          x: `${Math.random() * 200 - 100}%`,
                          y: `${Math.random() * 200 - 100}%`,
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </div>

            {/* Content Side with Enhanced Animation */}
            <motion.div
              className="md:w-1/2 w-full flex items-center"
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className={`max-w-xl flex flex-col gap-6 ${
                  isEven ? "md:mr-auto md:text-left text-center" : "md:ml-auto md:text-right text-center"
                }`}
              >
                {/* Title with Gradient Underline */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                    {products[activeIndex].title}
                  </h2>
                  <motion.div
                    className="h-1 bg-gradient-to-r from-[#085d92] to-[#044362] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "60px" }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                </div>

                {/* Description with better readability */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {products[activeIndex].description}
                </p>

                {/* CTA Button with Enhanced Styling */}
                <a href="#contact-form">
                  <motion.div
                    className={`inline-block py-3 ${isEven ? "md:self-start self-center" : "md:self-end self-center"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      className="bg-white text-black font-semibold"
                    >
                      <span>{t("button")}</span>
                    </HoverBorderGradient>
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons with Enhanced Style */}
        <motion.button
          onClick={prevSlide}
          aria-label="Anterior"
          className="flex absolute top-1/2 left-2 -translate-y-1/2 p-3 bg-white shadow-xl rounded-full hover:bg-gradient-to-br hover:from-[#085d92] hover:to-[#044362] hover:text-white transition-all duration-300 md:-left-6 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          aria-label="Siguiente"
          className="flex absolute top-1/2 right-2 -translate-y-1/2 p-3 bg-white shadow-xl rounded-full hover:bg-gradient-to-br hover:from-[#085d92] hover:to-[#044362] hover:text-white transition-all duration-300 md:-right-6 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Enhanced Dot Indicators */}
      <div className="flex space-x-3 mt-8 justify-center">
        {products.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className="relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "bg-gradient-to-r from-[#085d92] to-[#044362] shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
            {activeIndex === i && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 rounded-full bg-[#085d92]/30"
                initial={{ scale: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
