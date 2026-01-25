"use client";
import React from 'react';
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Quote, Star, TrendingUp, Award, Users } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const t = useTranslations("testimonials");

  // Impact metrics to showcase partnership strength
  const impactMetrics = [
    { icon: TrendingUp, value: "25+", label: t("metrics.experience") },
    { icon: Award, value: "100+", label: t("metrics.projects") },
    { icon: Users, value: "50+", label: t("metrics.clients") }
  ];

  // Client logos - easily add more here
  const clientLogos = [
    { name: "EXAL", src: "/images/clientLogos/exal.jpeg" },
    { name: "Acesco", src: "/images/clientLogos/acesco.png" },
    { name: "Alumina", src: "/images/clientLogos/alumina.jpg" },
    { name: "ALE", src: "/images/clientLogos/ale.png" },
    { name: "Aluica", src: "/images/clientLogos/aluica.avif" },
    { name: "Tecniquimica", src: "/images/clientLogos/tecniquimica.webp" },
    { name: "Alurack", src: "/images/clientLogos/alurack.png" },
    { name: "Aldeca", src: "/images/clientLogos/aldeca.jpg" },
    { name: "Alucol", src: "/images/clientLogos/alucol.png" },
    { name: "Laminaco", src: "/images/clientLogos/laminaco.jpg" },
    { name: "Extecal", src: "/images/clientLogos/extecal.png" },
    { name: "Alco", src: "/images/clientLogos/alco.jpg" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-secondary mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("description")} <span className="font-semibold text-[#085d92]">{t("words.word1")}</span>, <span className="font-semibold text-[#085d92]">{t("words.word2")}</span> {t("words.word4")} <span className="font-semibold text-[#085d92]">{t("words.word3")}</span>
          </p>
        </motion.div>

        {/* Featured Testimonial Card */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 overflow-hidden">
            {/* Decorative Quote Icon */}
            <motion.div
              className="absolute top-8 left-8 opacity-5"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Quote className="w-32 h-32 text-[#085d92]" />
            </motion.div>

            {/* Gradient Accent Border */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#085d92] via-cyan-500 to-[#044362]" />

            {/* Content */}
            <div className="relative z-10">
              {/* Quote Text */}
              <motion.blockquote
                className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                &ldquo;{t("testimonialsList.testimonial1.text")}&rdquo;
              </motion.blockquote>

              {/* Author Info */}
              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {/* Company Logo */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden p-2">
                  <Image
                    src="/images/clientLogos/exal.jpeg"
                    alt="EXAL Logo"
                    fill
                    className="object-contain"
                  />
                </div>

                <div>
                  <div className="font-bold text-xl text-gray-900">
                    {t("testimonialsList.testimonial1.name")}
                  </div>
                  <div className="text-gray-600">{t("testimonialsList.testimonial1.role")}</div>
                </div>

                {/* Verified Badge */}
                <div className="ml-auto hidden sm:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-green-700">{t("trustBadge")}</span>
                </div>
              </motion.div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-100/20 to-transparent rounded-tl-full" />
          </div>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#085d92] to-[#044362] mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <metric.icon className="w-7 h-7 text-white" />
              </motion.div>
              <div className="text-4xl font-bold text-secondary mb-2">
                {metric.value}
              </div>
              <div className="text-gray-600 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted by Industry Leaders */}
        <motion.div
          className="mt-20 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {/* Section Title */}
          <div className="text-center mb-12 relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-secondary relative z-10 inline-block px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
              {t("trustMessage")}
            </h3>
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                className="relative h-20 bg-white rounded-xl shadow-md border border-gray-200 p-4 flex items-center justify-center group hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Image
                  src={client.src}
                  alt={`${client.name} Logo`}
                  fill
                  className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-lg text-gray-700 mb-6 font-medium">
            {t("joinMessage")}
          </p>
          <motion.a
            href="#contact-form"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#085d92] to-[#044362] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{t("ctaButton")}</span>
            <Quote className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
