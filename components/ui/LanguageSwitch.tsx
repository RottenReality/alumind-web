'use client';

import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Lang = 'en' | 'es';

export default function LanguageSwitch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [current, setCurrent] = useState<Lang>('en');

  const detectLangFromPath = (path?: string): Lang => {
    if (!path) return 'en';
    const p = path.toLowerCase();
    if (p.startsWith('/es')) return 'es';
    if (p.startsWith('/en')) return 'en';
    return 'en';
  };

  useEffect(() => {
    setCurrent(detectLangFromPath(pathname));
  }, [pathname]);

  const buildNewPath = (lang: Lang) => {
    const rawPath = pathname || '/';
    const base = rawPath.replace(/^\/(en|es)(?=\/|$)/i, '') || '/';
    const search = searchParams ? `?${searchParams.toString()}` : '';
    const newPath = `/${lang}${base}`.replace(/\/+/g, '/');
    return newPath + search;
  };

  const toggleLang = () => {
    const next: Lang = current === 'en' ? 'es' : 'en';
    const target = buildNewPath(next);
    router.replace(target);
    setCurrent(next);
  };

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Cambiar idioma"
      className="flex items-center gap-2 px-3 py-1 rounded-md text-white hover:bg-gray-100 hover:text-black focus:outline-none"
    >
      <Globe className="w-5 h-5" />
      <span className="uppercase text-sm font-medium">{current.toUpperCase()}</span>
    </button>
  );
}
