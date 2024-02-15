import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Martel_Sans } from "next/font/google";

import "./globals.css";

const martelSans = Martel_Sans({
  weight: ['400', '700', '900'],
  variable: '--font-martelSans',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Board Game Collection",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={martelSans.className}>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
