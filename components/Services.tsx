"use client";
import React from 'react';
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Image from 'next/image';
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const t = useTranslations("services");

  const services = [
    {
      title: t("catalog.service2.title"),
      description: t("catalog.service2.description"),
      imagePath: "/images/furnace.jpg",
      imagePlaceholder: "Consulting Services Image",
      gradient: "from-blue-600 to-cyan-600",
      accentColor: "#085d92"
    },
    {
      title: t("catalog.service1.title"),
      description: t("catalog.service1.description"),
      imagePath: "/images/ingot.jpg",
      imagePlaceholder: "Custom Alloy Production Image",
      gradient: "from-indigo-600 to-blue-600",
      accentColor: "#044362"
    },
    {
      title: t("catalog.service3.title"),
      description: t("catalog.service3.description"),
      imagePath: "/images/ARTUS 8 .png",
      imagePlaceholder: "Spectrometer Technology",
      gradient: "from-cyan-600 to-teal-600",
      accentColor: "#0891b2"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #085d92 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-6">
            {t("title")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="group relative h-full hover:shadow-2xl transition-all duration-500 border-gray-200 overflow-hidden bg-white flex flex-col">
                <CardHeader className="p-0">
                  {/* Image Container with Overlay Effect */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={service.imagePath}
                      alt={service.imagePlaceholder}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500`} />

                    {/* Animated Border on Hover */}
                    <motion.div
                      className="absolute inset-0 border-4 border-transparent"
                      whileHover={{
                        borderColor: service.accentColor,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="p-6 pb-4">
                    <CardTitle className="text-2xl font-bold mb-3 group-hover:text-[#085d92] transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6 flex-1 flex flex-col">
                  <CardDescription className="text-base leading-relaxed text-gray-600 mb-6">
                    {service.description}
                  </CardDescription>

                  <div className="mt-auto">
                    {/* CTA Button */}
                    <motion.a
                      href="#contact-form"
                      className="inline-flex items-center gap-2 text-[#085d92] font-semibold group/btn"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span>{t("learnMore")}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.a>

                    {/* Bottom Accent Line */}
                    <motion.div
                      className={`h-1 bg-gradient-to-r ${service.gradient} rounded-full mt-6`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    />
                  </div>
                </CardContent>

                {/* Decorative Corner Element */}
                <div
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${service.accentColor} 0%, transparent 70%)`
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600 mb-6">{t("readyMessage")}</p>
          <motion.a
            href="#contact-form"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#085d92] to-[#044362] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{t("ctaButton")}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
