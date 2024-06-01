// components/Chakra.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { ReactNode } from "react";

interface ChakraProps {
  children: ReactNode;
}

const Chakra = ({ children }: ChakraProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Chakra;
