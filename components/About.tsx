"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { globeConfig, sampleArcs } from "@/data/arcs";
import { useTranslations } from "next-intl";

const World = dynamic(() => import("./ui/Globe").then((m) => m.World), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100" aria-hidden />,
});

const About = () => {
  const t = useTranslations("about");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            {t("title")} <br />
            <span className="text-secondary">{t("subtitle")}</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {t("description")}
          </p>

          <ul className="space-y-3">
            {[t("bullets.bullet1"), t("bullets.bullet2"), t("bullets.bullet3"), t("bullets.bullet4")].map(
              (item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-[#085d92]" />
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] -mx-4 md:mx-0"
        >
          {inView ? <World data={sampleArcs} globeConfig={globeConfig} /> : <div className="h-full w-full bg-gray-100" />}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
