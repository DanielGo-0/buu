"use client";
import { Box } from "@chakra-ui/react";
import Main from "./Main";
import Nav from "./Nav";

export default function Home() {
  return (
    <Box h="fit-content">
      <Nav />
      <Main />
    </Box>
  );
}
