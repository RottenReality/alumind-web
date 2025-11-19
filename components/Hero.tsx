"use client";

import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section
      id="main"
      className="relative w-full min-h-[64vh] flex items-center justify-center overflow-hidden bg-[#085d92]"
      style={{ WebkitFontSmoothing: "antialiased" }}
    >
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/hero-fallback.avif"
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero-bg.webm" type="video/webm; codecs=vp9" />
          <source src="/videos/hero-bg.mp4" type="video/mp4; codecs=h264" />
        </video>

        <div className="absolute inset-0 block lg:hidden">
          <Image
            src="/images/hero-fallback.avif"
            alt="Hero - Alumind"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-[#085d92]/42" />

      <div className="relative z-10 px-4 py-10 md:py-20 mt-5 max-w-6xl text-center">
        <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold text-white md:text-4xl lg:text-7xl sm:text-4xl">
          {t("title")
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="mx-auto max-w-xl py-4 text-center text-lg font-normal text-[#D0D5D9]"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#services">
            <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800">
              {t("button1")}
            </button>
          </a>
          <a href="#contact-form">
            <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100">
              {t("button2")}
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
