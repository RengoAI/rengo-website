import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

const NAVY = "#0C1D34";

export const CareersPage: React.FC = () => (
  <Box fontFamily='"Inter Tight", Inter, sans-serif'>
    <Flex
      as="section"
      bg={NAVY}
      color="white"
      px={20}
      minH="100vh"
      direction="column"
      justify="center"
      align="center"
      textAlign="center"
      pt="80px"
      pb={12}
    >
      <Box
        as="h1"
        fontFamily="heading"
        fontSize="clamp(52px, 6vw, 84px)"
        fontWeight={400}
        lineHeight={1.04}
        letterSpacing="-0.025em"
        color="white"
        maxW="880px"
        m={0}
        mb={7}
      >
        Join the Team
      </Box>
      <Box h="1px" bg="whiteAlpha.500" w="72px" mb={7} />
      <Box
        fontSize="lg"
        lineHeight={1.45}
        color="whiteAlpha.800"
        maxW="480px"
        mb={9}
      >
        Help us reimagine private markets infrastructure.
      </Box>
      <Button
        borderRadius="md"
        bg="white"
        color={NAVY}
        h="42px"
        px={6}
        fontSize="15px"
        fontWeight="medium"
        _hover={{ bg: "gray.50" }}
        onClick={() => window.open("mailto:careers@rengoai.com", "_blank")}
      >
        Get in touch
      </Button>
    </Flex>
  </Box>
);
