import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import ArunPartnership from "@/components/ArunPartnership";
import Services from "@/components/Services";
import About from "@/components/About";
import Spectrometers from "@/components/Spectrometers";
import Testimonials from "@/components/Testimonials";
import MaintenanceMode from "@/components/MaintenanceMode";

export default function HomePage() {
  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  // Show maintenance page if enabled
  if (isMaintenanceMode) {
    return <MaintenanceMode />;
  }

  return (
    <main className="relative bg-white flex justify-center items-center flex-col mx-auto">
      <div id="main" className="w-full">
        <Hero />
      </div>
      <div id="arun-partnership" className="w-full">
        <ArunPartnership />
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
