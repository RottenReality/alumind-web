"use client"

import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Spectrometers from "@/components/Spectrometers";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto">
      <div className="w-full">
        <Hero />
      </div>
      <div className=" w-full bg-gray-50">
        <Services />
      </div>
      <div className="max-w-3/4 w-full">
        <Solutions />
      </div>
      <div className=" w-full bg-gray-50">
        <Spectrometers />
      </div>
      <div className="w-full">
        <Testimonials />
      </div>
      <div className=" w-full">
        <ContactForm />
      </div>
    </main>
  );
}
