import React from 'react'
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FlipWords } from "@/components/ui/Flip-words";

const Testimonials = () => {

    const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const words = ["innovación", "compromiso", "desarrollo", "sostenibilidad"];

  return (
    <section id="services" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-secondary">
                Clientes felices
              </h2>
              <div className="text-lg text-muted-foreground max-w-2xl mx-auto text-gray-600">
                Impulsamos el futuro con
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