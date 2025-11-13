import {useTranslations} from 'next-intl';
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Spectrometers from "@/components/Spectrometers";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto">
      <div id="main" className="w-full">
        <Hero />
      </div>
      <div id="services" className="w-full bg-gray-50">
        <Services />
      </div>
      <div id="about" className="max-w-3/4 w-full">
        <About />
      </div>
      <div id="spectrometers" className="w-full bg-gray-50">
        <Spectrometers />
      </div>
      <div id="testimonials" className="w-full">
        <Testimonials />
      </div>
      <div id="contact-form" className="w-full">
        <ContactForm />
      </div>
    </main>
  );
}
