import type { Metadata } from 'next';
import './globals.css';
import '@mantine/core/styles.css';

import { Inter } from 'next/font/google';

import { UseQueryProvider } from '@/components/UseQueryProvider';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Note Reminder',
  description: '',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <UseQueryProvider>
          <MantineProvider>{children}</MantineProvider>
        </UseQueryProvider>
      </body>
    </html>
  );
}
