import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderComponent from "./_components/HeaderComponent";
import { ColorModeScript } from "@chakra-ui/react";
import Chakra from "./_components/Chakra";
import theme from "@/styles/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
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
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </head>
      <body className={inter.className}>
        <Chakra>
          <HeaderComponent />
          {children}
        </Chakra>
      </body>
    </html>
  );
}
