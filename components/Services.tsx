import React from 'react'
import { Layers, Users, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Image from 'next/image';
import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("services");

  const services = [
  {
    icon: Layers,
    title: t("catalog.service1.title"),
    description: t("catalog.service1.description"),
    imagePath: "/images/ingot.jpg",
    imagePlaceholder: "Custom Alloy Production Image",
  },
  {
    icon: Users,
    title: t("catalog.service2.title"),
    description: t("catalog.service2.description"),
    imagePath: "/images/furnace.jpg",
    imagePlaceholder: "Consulting Services Image",
  },
  {
    icon: Wrench,
    title: t("catalog.service3.title"),
    description: t("catalog.service3.description"),
    imagePath: "/images/ARTUS 8 .png",
    imagePlaceholder: "Custom Fabrication Image",
  }
];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-secondary">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-gray-600">
            {t("description")}
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