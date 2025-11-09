import React from 'react'
import { Layers, Users, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Image from 'next/image';

const services = [
  {
    icon: Layers,
    title: "Montaje de plantas y fabricación de aleaciones personalizadas",
    description: "Diseño y fabricación de aleaciones personalizadas en aluminio y cobre, adaptables a tus necesidades y que te ayudará a mejorar las condiciones de tu proyecto,",
    imagePath: "/images/ingot.jpg",
    imagePlaceholder: "Custom Alloy Production Image",
  },
  {
    icon: Users,
    title: "Asesoría profesional en producción de aluminio",
    description: "Servicios de consultoría experta que brindan asesoramiento estratégico sobre procesos de producción de aluminio, control de calidad y eficiencia operativa. Décadas de experiencia en la industria a su servicio.",
    imagePath: "/images/furnace.jpg",
    imagePlaceholder: "Consulting Services Image",
  },
  {
    icon: Wrench,
    title: "Venta autorizada de espectrometros Arun Technology",
    description: "Distribuidor autorizado de Arun Technology. Los espectrómetros de Arun son la opción ideal para la medición exacta en aleaciones.",
    imagePath: "/images/ARTUS 8 .png",
    imagePlaceholder: "Custom Fabrication Image",
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-secondary">
            Nuestros servicios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-gray-600">
            Soluciones integrales de aluminio y cobre respaldadas por la experiencia en la industria y tecnología de vanguardia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-strong transition-smooth border-border bg-card border-gray-200">
              <CardHeader>
                <div className="w-full h-48 bg-muted rounded-lg bg-gray-100 flex items-center justify-center mb-4 overflow-hidden relative">
                  <Image
                    src={service.imagePath}
                    alt={service.imagePlaceholder}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-smooth text-secondary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;