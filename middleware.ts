import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    const acceptLang = req.headers.get('accept-language');
    const detectedLocale = acceptLang?.split(',')[0].split('-')[0].toLowerCase();

    type Locale = (typeof routing.locales)[number];
    function isValidLocale(locale: string): locale is Locale {
      return routing.locales.includes(locale as Locale);
    }

    const locale: Locale = isValidLocale(detectedLocale || '')
      ? detectedLocale as Locale
      : routing.defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
