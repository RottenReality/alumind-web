"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { globeConfig, sampleArcs } from "@/data/arcs";

const World = dynamic(() => import("../components/ui/Globe").then((m) => m.World), {
  ssr: false,
});


const Solutions = () => {
  return (
    <section className="relative w-full bg-white py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6">
        
        {/* Texto lado izquierdo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Aluminio y cobre: <br />
            <span className="text-secondary">el futuro de la transición energética</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            En Alumind creemos en el aluminio y el cobre como elementos clave
            para la innovación en la metalurgia y la metalmecánica. Con más de
            25 años de experiencia, convertimos estos materiales en soluciones
            únicas que impulsan proyectos de ingeniería en todo el mundo.
          </p>

          {/* Bullets */}
          <ul className="space-y-3">
            {[
                "Experiencia certificada",
              "Procesos de alta precisión",
              "Sostenibilidad en cada proyecto",
              "Innovación en metalurgia avanzada",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#085d92]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Globo lado derecho */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px]"
        >
          <World data={sampleArcs} globeConfig={globeConfig} />
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
