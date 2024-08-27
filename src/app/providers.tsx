// app/providers.tsx
"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ReactNode } from "react";

// Create Emotion cache
const cache = createCache({ key: "css", prepend: true });

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}
