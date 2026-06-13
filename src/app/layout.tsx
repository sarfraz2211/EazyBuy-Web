import "./globals.css";

import type { Metadata } from "next";

import Providers from "./providers";

export const metadata: Metadata = {

  title: "EazyBuy",

  description:
    "SaaS based Ecommerce Platform",
};

export default function RootLayout({

  children,

}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body>

        <Providers>

          {children}

        </Providers>

      </body>

    </html>
  );
}