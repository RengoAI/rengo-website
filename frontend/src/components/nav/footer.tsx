import { rootRoute } from "@/app/app-routes";
import { Logo } from "@/components/logo/logo";
import { Box, Container, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => (
  <Link to={to}>
    <Text
      fontSize="sm"
      color="white"
      cursor="pointer"
      _hover={{ color: "gray.100" }}
    >
      {children}
    </Text>
  </Link>
);

interface FooterLinkSectionProps {
  title: string;
  children: React.ReactNode;
}

const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({
  title,
  children,
}) => (
  <VStack align={{ base: "center", md: "flex-start" }} gap={3}>
    <Text fontSize="sm" fontWeight="semibold" color="white">
      {title}
    </Text>
    <VStack gap={2} align={{ base: "center", md: "flex-start" }}>
      {children}
    </VStack>
  </VStack>
);

const FooterLogo: React.FC = () => (
  <VStack align={{ base: "center", md: "flex-start" }} gap={4} maxW="md">
    <Link to="/">
      <Logo color="white" size="default" />
    </Link>
  </VStack>
);

const FooterBottom: React.FC = () => (
  <Flex
    direction={{ base: "column", md: "row" }}
    justify="space-between"
    align="center"
    w="full"
    py={4}
    borderTop="1px solid"
    borderColor="primary.600"
    gap={4}
  >
    <Text fontSize="sm" color="gray.200">
      © 2025 Rengo AI, Inc. All rights reserved.
    </Text>
    <HStack gap={6}>
      <Text
        fontSize="sm"
        color="gray.200"
        cursor="pointer"
        _hover={{ color: "white" }}
        onClick={() =>
          window.open("https://www.linkedin.com/company/106703002", "_blank")
        }
      >
        LinkedIn
      </Text>
      <Text
        fontSize="sm"
        color="gray.200"
        cursor="pointer"
        _hover={{ color: "white" }}
        onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      >
        Contact
      </Text>
    </HStack>
  </Flex>
);

export const AppFooter: React.FC = () => (
  <Box bg="primary.700">
    <Container maxW="6xl" px={16}>
      <VStack gap={0}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          w="full"
          gap={8}
          py={6}
        >
          <FooterLogo />

          <FooterLinkSection title="Solutions">
            <FooterLink
              to={rootRoute({}).solutions({}).portfolioMonitoring({}).$}
            >
              Portfolio Monitoring
            </FooterLink>
          </FooterLinkSection>

          <FooterLinkSection title="Legal">
            <FooterLink to={rootRoute({}).legal({}).privacyPolicy({}).$}>
              Privacy Policy
            </FooterLink>
            <FooterLink to={rootRoute({}).legal({}).termsOfService({}).$}>
              Terms of Service
            </FooterLink>
            <FooterLink to={rootRoute({}).legal({}).security({}).$}>
              Security
            </FooterLink>
          </FooterLinkSection>

          <FooterLinkSection title="Company">
            {/* <FooterLink to={rootRoute({}).blog({}).changelog({}).$}>
              Changelog
            </FooterLink> */}
            <FooterLink to={rootRoute({}).careers({}).$}>Careers</FooterLink>
          </FooterLinkSection>
        </Flex>

        <FooterBottom />
      </VStack>
    </Container>
  </Box>
);
