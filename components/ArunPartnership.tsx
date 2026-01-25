"use client";
import React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const ArunPartnership = () => {
  const t = useTranslations("arunPartnership");

  return (
    <section className="relative w-full bg-gradient-to-r from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            {t("title")}
            <span className="text-secondary">{t("subtitle")}</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {t("description")}
          </p>

          {/* Trust Indicators */}
          <ul className="space-y-3">
            {[
              t("badges.badge1"),
              t("badges.badge2"),
              t("badges.badge3"),
              t("badges.badge4"),
              t("badges.badge5")
            ].map((badge, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#085d92] flex-shrink-0" />
                <span>{badge}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#spectrometers">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="bg-white text-black font-semibold px-6 py-3"
              >
                {t("button1")}
              </HoverBorderGradient>
            </a>
            <a
              href="#contact-form"
              className="px-6 py-3 rounded-full bg-[#085d92] text-white font-semibold hover:-translate-y-0.5 transition duration-200 text-center"
            >
              {t("button2")}
            </a>
          </div>
        </motion.div>

        {/* Right Column - Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center"
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/spec-artus10.png"
              alt="Arun Technology ARTUS 10 Spectrometer"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArunPartnership;
