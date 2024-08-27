import {
  Card,
  Box,
  Text,
  Button,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Show,
  Stack,
} from "@chakra-ui/react";

const Main = () => {
  const item = (
    <Box w={300} h={480} display="flex" flexDir="column" gap={4}>
      <Image mx="105px" w={14} h={14} src="./adidas.png" alt="adidas" />
      <Box bg="white" color="black" borderRadius={6}>
        <Image
          mx={2}
          my={2}
          borderRadius={12}
          objectFit="cover"
          w="90%"
          src="https://m.media-amazon.com/images/I/71l6KNH13wL._AC_UY1000_.jpg"
          alt="Caffe Latte"
        />

        <Stack position="relative" borderTop="2px solid red">
          <Box
            position="absolute"
            bottom={4}
            left={2}
            textAlign="center"
            fontWeight="600"
            bg="powderblue"
            borderRadius={70}
            w="fit-content"
            px={2}
            py={2}
            color="black"
          >
            <Text m={-2}>30%</Text>
            <Text>OFF</Text>
          </Box>
          <Box p={1} boxShadow="md" textAlign="center" pt={2}>
            <Heading size="md">Zapatillas Campus </Heading>
            <Box
              w="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              py="2"
            >
              <Text textDecoration="line-through" fontSize={18}>
                $198.000
              </Text>
              <Text color="red" fontWeight="600" fontSize={20}>
                $178.000
              </Text>
            </Box>
            <Box display="flex" flexDir="column" alignItems="center">
              <Text
                borderTop="2px solid red"
                borderBottom="2px solid red"
                w="40%"
                fontWeight="600"
              >
                Urbano
              </Text>
              <Text>www.adidas.com.ar</Text>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box bg="white" color="black" borderRadius={6}>
        <Image
          mx={2}
          my={2}
          borderRadius={12}
          objectFit="cover"
          w="90%"
          src="https://m.media-amazon.com/images/I/71l6KNH13wL._AC_UY1000_.jpg"
          alt="Caffe Latte"
        />
        <Stack position="relative" borderTop="2px solid red">
          <Box
            position="absolute"
            bottom={4}
            left={2}
            textAlign="center"
            fontWeight="600"
            bg="powderblue"
            borderRadius={70}
            w="fit-content"
            px={2}
            py={2}
            color="black"
          >
            <Text m={-2}>30%</Text>
            <Text>OFF</Text>
          </Box>
          <Box p={1} boxShadow="md" textAlign="center" pt={2}>
            <Heading size="md">Zapatillas Campus </Heading>
            <Box
              w="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              py="2"
            >
              <Text textDecoration="line-through" fontSize={18}>
                $198.000
              </Text>
              <Text color="red" fontWeight="600" fontSize={20}>
                $178.000
              </Text>
            </Box>
            <Box display="flex" flexDir="column" alignItems="center">
              <Text
                borderTop="2px solid red"
                borderBottom="2px solid red"
                w="40%"
                fontWeight="600"
              >
                Urbano
              </Text>
              <Text>www.adidas.com.ar</Text>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
  return (
    <Box w="100%" h="100vh" display="flex">
      <Show breakpoint="(min-width: 700px)">
        <Box>
          <Image
            alt="empty"
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/mh_small_ar_21km_d_2e2cb97a2f.jpg"
            h={710}
            w={{ sm: 165, md: 172, lg: 179 }}
            objectFit="cover"
            objectPosition="center right"
          />
        </Box>
      </Show>
      <Box
        w="85.5%"
        display="flex"
        justifyContent={{ base: "normal", sm: "center" }}
        gap={{ base: 1, sm: 8 }}
        px={2}
        pt={2}
      >
        {item}
        {item}
        {item}
        {item}
      </Box>
    </Box>
  );
};

export default Main;
