"use client";
import { CgProfile } from "react-icons/cg";
import { SiGooglemaps } from "react-icons/si";
import { FaShareAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMapSharp } from "react-icons/io5";
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Image,
  Show,
  Hide,
  Link,
} from "@chakra-ui/react";

export default function Nav() {
  return (
    <Box w="100%">
      <Box>
        <Box
          fontSize="lg"
          display="flex"
          alignItems="center"
          flexDir="column"
          bg="white"
        >
          <Box
            display="flex"
            p={1}
            borderBottom="2px solid white"
            w={{ base: "100%", lg: "1200px" }}
          >
            <Show breakpoint="(min-width: 600px)">
              <Box textAlign="right" p="0 20px" w="70%">
                <Text color="black">
                  Ahorra tiempo y dinero en cada busqueda.
                </Text>
              </Box>
            </Show>
            <Box
              fontSize="x-large"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              w={{ sm: "30%", base: "100%" }}
            >
              <CgProfile color="black"></CgProfile>
              <Link href="./map">
                <SiGooglemaps color="black"></SiGooglemaps>
              </Link>
              <FaShareAlt color="black"></FaShareAlt>
            </Box>
          </Box>
          <Box w="100%" display="flex" bg="black">
            <Show breakpoint="(min-width: 700px)">
              <Box w={209} h="max-content">
                <Link href={"./"}>
                  <Image
                    objectFit="fill"
                    width={180}
                    height={125}
                    src={"/buho.png"}
                    alt="buho"
                  />
                </Link>
              </Box>
            </Show>
            <Box w="100%">
              <Box
                position="relative"
                display="flex"
                gap={2}
                p={2}
                mt={2}
                justifyContent="center"
              >
                <Show breakpoint="(min-width: 600px)">
                  <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyContent="space-evenly"
                    w="100%"
                    color="white"
                  >
                    <Text as="button">Categoria</Text>
                    <Text as="button">Marca</Text>
                    <Text as="button">Talle</Text>
                    <Text as="button">Genero</Text>
                    <Text as="button">Deporte</Text>
                    <Text as="button">Precio</Text>
                  </Box>
                </Show>
                <Box
                  w="50%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <InputGroup w={{ base: "44", lg: "72" }}>
                    <Input _placeholder="Buscar" h={8}></Input>
                    <InputRightAddon
                      h={8}
                      w={14}
                      bg="transparent"
                      color="white"
                      as={CiSearch}
                    ></InputRightAddon>
                  </InputGroup>
                </Box>
              </Box>

              <Box
                color="white"
                textAlign="center"
                pt={2}
                borderBottom="2px solid white"
              >
                <Text>
                  Buscamos ayudarte a encontrar el mejor{" "}
                  <Text as="span" color="yellow">
                    {" "}
                    precio
                  </Text>
                  .
                </Text>
                <Show breakpoint="(min-width: 500px)">
                  <Box
                    p={2}
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                    flexDir={{ base: "column-reverse", md: "row" }}
                  >
                    <IoMapSharp color="yellow" size="26px"></IoMapSharp>
                    <Text>
                      Descubrí las mejores ofertas cercanas a tu ubicacion.
                    </Text>
                  </Box>
                </Show>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
