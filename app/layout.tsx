import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderComponent from "./_components/HeaderComponent";
import { ColorModeScript } from "@chakra-ui/react";
import Chakra from "./_components/Chakra";
import theme from "@/styles/theme";
import { useServerCookies } from "@/utils/useServerCookies";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finfriend - Your Financial Friend",
  description: "Personal financial web app integrated with Google Sheet API",
};

export const viewport: Viewport = {
  themeColor: "#6B46C1",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = await useServerCookies();
  return (
    <html lang="en">
      <head>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </head>
      <body className={inter.className}>
        <Chakra>
          <HeaderComponent sheetURL={cookies.sheetURL} />
          {children}
        </Chakra>
      </body>
    </html>
  );
}
