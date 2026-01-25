"use client"

import React, { useState } from 'react'
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { WavyBackground } from "@/components/ui/Wavy-background";
import { useTranslations } from "next-intl";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContactForm = () => {
  const t = useTranslations("contactForm");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      // Reset form
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');

      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
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
          {t("title")}
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600">
          {t("description")}
        </p>
  
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                placeholder="John"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              placeholder="business@company.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              placeholder={t("messagePlaceholder")}
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
            />
          </LabelInputContainer>

          {/* Success Message */}
          {status === 'success' && (
            <div className="mb-4 flex items-center gap-2 rounded-md bg-green-50 p-3 text-green-700 border border-green-200">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{t("successMessage")}</p>
            </div>
          )}

          {/* Error Message */}
          {status === 'error' && (
            <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-red-700 border border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{errorMessage || t("errorMessage")}</p>
            </div>
          )}

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-secondary to-primary font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? t("sending") : `${t("button")} →`}
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