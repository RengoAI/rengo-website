import { PageContainer } from "@/components/layout/page-container";
import { Logo } from "@/components/logo/logo";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface FooterColProps {
  title: string;
  children: React.ReactNode;
}

const FooterCol: React.FC<FooterColProps> = ({ title, children }) => (
  <Flex direction="column" gap={2} minW={{ base: "auto", sm: "128px" }}>
    <Text fontSize="sm" color="whiteAlpha.900" lineHeight="short" mb={1}>
      {title}
    </Text>
    {children}
  </Flex>
);

const FooterLink: React.FC<{
  to?: string;
  href?: string;
  children: React.ReactNode;
}> = ({ to, href, children }) => {
  if (to)
    return (
      <Link to={to} className="footer-link">
        {children}
      </Link>
    );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-link"
    >
      {children}
    </a>
  );
};

export const AppFooter: React.FC = () => (
  <Box
    as="footer"
    bg="primary.800"
    color="white"
    pt={16}
    pb={10}
    borderTopWidth="1px"
    borderTopColor="whiteAlpha.200"
  >
    <PageContainer>
      <Flex
        justify="space-between"
        align="flex-start"
        w="full"
        flexWrap="wrap"
        gapX={16}
        gapY={12}
      >
        <Box flexShrink={0}>
          <Logo color="white" isCollapsed />
        </Box>

        <Flex
          flex="1"
          justify={{ base: "flex-start", lg: "flex-end" }}
          align="flex-start"
          flexWrap="wrap"
          gapX={{ base: 14, md: 24 }}
          gapY={10}
          minW={{ base: "min(100%, 280px)", lg: 0 }}
        >
          <FooterCol title="Platform">
            <FooterLink to="/product/portfolio-monitoring">Product</FooterLink>
            <FooterLink to="/security">Security</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink to="/company">About</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
          </FooterCol>

          <FooterCol title="Legal">
            <FooterLink to="/legal/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/legal/terms-of-service">
              Terms of Service
            </FooterLink>
          </FooterCol>

          <FooterCol title="Contact">
            <FooterLink href="https://www.linkedin.com/company/106703002">
              LinkedIn
            </FooterLink>
            <FooterLink href="mailto:sales@rengoai.com">Sales</FooterLink>
          </FooterCol>
        </Flex>
      </Flex>

      <Flex
        mt={24}
        align={{ base: "flex-start", sm: "center" }}
        justify="flex-end"
        flexWrap="wrap"
        gapY={4}
      >
        <Text
          fontSize="xs"
          color="whiteAlpha.450"
          lineHeight="short"
          m={0}
          textAlign="right"
        >
          © 2026 Rengo AI, Inc. All rights reserved.
        </Text>
      </Flex>
    </PageContainer>
  </Box>
);
