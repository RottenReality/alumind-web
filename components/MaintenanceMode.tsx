"use client";

import React from 'react';
import { Construction, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function MaintenanceMode() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-20 h-20 bg-gradient-to-br from-[#085d92] to-[#044362] rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Construction className="w-10 h-10 text-white" />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
        >
          Under Maintenance
        </motion.h1>

        {/* Subtitle - Bilingual */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-blue-100 text-center mb-2"
        >
          En Mantenimiento
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-center mb-8 leading-relaxed"
        >
          We&apos;re currently making some improvements to serve you better. We&apos;ll be back soon!
          <br />
          <span className="text-sm text-gray-400 mt-2 block">
            Estamos realizando mejoras para servirle mejor. ¡Volveremos pronto!
          </span>
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 backdrop-blur-sm">
            <Clock className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-1">Quick Return</h3>
              <p className="text-gray-400 text-sm">We&apos;ll be back shortly</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 backdrop-blur-sm">
            <Mail className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-1">Need Help?</h3>
              <p className="text-gray-400 text-sm">
                <a href="mailto:alumind.t@gmail.com" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Company info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center border-t border-white/20 pt-6"
        >
          <p className="text-white font-bold text-lg mb-1">Alumind Technology</p>
          <p className="text-gray-400 text-sm">
            Leaders in Aluminum Production Consulting & Arun Spectrometers
          </p>
        </motion.div>

        {/* Loading animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex justify-center gap-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-3 h-3 bg-cyan-400 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-3 h-3 bg-blue-400 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-3 h-3 bg-cyan-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
