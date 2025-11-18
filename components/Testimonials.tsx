import React from 'react'
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FlipWords } from "@/components/ui/Flip-words";
import { useTranslations } from "next-intl";

const Testimonials = () => {

  const t = useTranslations("testimonials");

    const testimonials = [
  {
    quote:t("testimonialsList.testimonial1.text"),
    name: t("testimonialsList.testimonial1.name"),
    title: t("testimonialsList.testimonial1.company"),
  },
  {
    quote:t("testimonialsList.testimonial1.text"),
    name: "example name",
    title: t("testimonialsList.testimonial1.company"),
  },
  {
    quote:t("testimonialsList.testimonial1.text"),
    name: "example name 2",
    title: t("testimonialsList.testimonial1.company"),
  },
];

const words = [t("words.word1"), t("words.word2"), t("words.word3"), t("words.word4")];

  return (
    <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-secondary">
                {t("title")}
              </h2>
              <div className="text-lg text-muted-foreground max-w-2xl mx-auto text-gray-600">
                {t("description")}
                <FlipWords words={words} />
              </div>
                
            </div>
            <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
          </div>
        </section>
  );
}

export default Testimonials