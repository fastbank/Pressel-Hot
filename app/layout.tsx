import type { Metadata } from 'next';
import { config } from '../config';
import './globals.css';
export const metadata: Metadata = {
  title: `${config.branding.name} | 50% OFF`,
  description:
    'Escolha uma caixa, desbloqueie seu benefício de 50% OFF e escolha uma opção para continuar.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
