import { PageContainer } from "@/components/layout/page-container";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

const OPEN_ROLES = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    location: "New York",
  },
  {
    id: "forward-deployed-engineer",
    title: "Forward Deployed Engineer",
    location: "New York",
  },
] as const;

const roleMailto = (title: string) =>
  `mailto:careers@rengoai.com?subject=${encodeURIComponent(`Application: ${title}`)}`;

export const OpenRolesSection: React.FC = () => (
  <Box
    as="section"
    bg="slate.10"
    py={24}
    borderTop="1px solid"
    borderColor="slate.30"
  >
    <PageContainer>
      <Box maxW="720px" mb={12}>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "48px" }}
          fontWeight={350}
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="indigo.900"
          m={0}
        >
          Open roles
        </Box>
      </Box>

      <Flex direction="column" gap={3} w="full" alignItems="stretch">
        {OPEN_ROLES.map((role) => (
          <Link
            key={role.id}
            href={roleMailto(role.title)}
            w="full"
            alignSelf="stretch"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            textDecoration="none"
            border="1px solid"
            borderColor="slate.30"
            px={7}
            py={6}
            minH="100px"
            borderRadius={0}
            _hover={{ bg: "slate.20", textDecoration: "none" }}
            transition="background 150ms ease"
          >
            <Text
              fontFamily="body"
              fontSize="20px"
              fontWeight="medium"
              lineHeight={1.25}
              letterSpacing="-0.4px"
              color="indigo.900"
              m={0}
              textAlign="left"
              flex="1"
              minW={0}
            >
              {role.title}
            </Text>
            <Text
              fontFamily="body"
              fontSize="sm"
              lineHeight="short"
              color="slate.50"
              m={0}
              flexShrink={0}
              textAlign="right"
            >
              {role.location}
            </Text>
          </Link>
        ))}
      </Flex>
    </PageContainer>
  </Box>
);
