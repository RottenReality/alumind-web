import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from "next-intl";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const companyName = "Alumind";
  const t = useTranslations("footer");

  const NAV_LINKS = [
    { name: t("services"), href: "#services" },
    { name: t("about"), href: "#about" },
    { name: t("spectrometers"), href: "#spectrometers" },
    { name: t("testimonials"), href: "#testimonials" },
    { name: t("contact"), href: '#contact-form' },
  ];

  return (
    <footer className="bg-white shadow-sm dark:bg-gray-900 w-full">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        
        <div className="sm:flex sm:items-center sm:justify-between">
          
          <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse" aria-label="Ir a Inicio">
            <Image 
              src="/images/logo.png" 
              alt={`${companyName} Logo`} 
              className="h-8 w-auto" 
              width={32}
              height={32} 
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {companyName}
            </span>
          </Link>
          
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:underline me-4 md:me-6">
                  {link.name}
                </Link>
              </li>
            ))}
            
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {currentYear} 
          <Link href="/" className="hover:underline ml-1">
            {companyName}™
          </Link>
          . {t("description")}
        </span>
      </div>
    </footer>
  );
}