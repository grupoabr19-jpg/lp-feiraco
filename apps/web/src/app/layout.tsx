import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '3º FeirAÇO Grupo ABR | 12 de setembro de 2026',
  description: 'Participe do 3º FeirAÇO Grupo ABR. Uma manhã de produtos, atendimento especializado e novas oportunidades.',
  alternates: { canonical: '/' },
  openGraph: {
    title: '3º FeirAÇO Grupo ABR',
    description: '12 de setembro de 2026, das 8h às 12h.',
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: '3º FeirAÇO Grupo ABR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3º FeirAÇO Grupo ABR',
    description: '12 de setembro de 2026, das 8h às 12h.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
