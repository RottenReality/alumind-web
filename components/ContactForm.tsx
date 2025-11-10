"use client"

import React from 'react'
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { WavyBackground } from "@/components/ui/Wavy-background";

import { cn } from "@/lib/utils";

const ContactForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

  return (
    <WavyBackground
      backgroundFill="#f9fafb"
      colors={["#085d92", "#0b74b8", "#5aa9e6", "#b0bec5", "#044362"]}
      waveOpacity={0.25}
      blur={8}
      speed="slow"
    >
      <div className="shadow-input my-20 mx-auto w-auto md:w-2xl max-w-md rounded-2xl bg-white p-4 md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800">
          Contáctanos
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600">
          Llena tus datos y dinos que te interesa.
        </p>
  
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">Nombre</Label>
              <Input id="firstname" placeholder="John" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="business@company.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Me encantaría el servicio de..."
              rows={5}
            />
          </LabelInputContainer>
  
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-secondary to-primary font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Enviar &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </WavyBackground>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
 
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default ContactForm