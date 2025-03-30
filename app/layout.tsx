import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";

import { FC, ReactNode } from "react";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepWise",
  description: "An AI-powered platform for preparing for mock interviews",
};


type Props = Readonly<{
  children: ReactNode
}>

const RootLayout: FC<Props> = ({ children }) => {

  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
      </body>
    </html>
  )
};

export default RootLayout;
