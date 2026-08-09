import {
  MARKETING_GUTTER_WIDTH,
  marketingContentPaddingX,
} from "@/components/layout/marketing-frame";
import { rootRoute } from "@/app/app-routes";
import { Logo } from "@/components/logo/logo";
import { SOLUTIONS_PATH } from "@/features/solutions/solutions";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface FooterColProps {
  title: string;
  children: React.ReactNode;
}

const FooterCol: React.FC<FooterColProps> = ({ title, children }) => (
  <Flex direction="column" gap={2} minW={{ base: "auto", sm: "128px" }}>
    <Text fontSize="sm" color="indigo.900" lineHeight="short" mb={1}>
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
    bg="slate.10"
    color="indigo.900"
    borderTop="1px solid"
    borderColor="slate.30"
    pt={16}
    pb={10}
  >
    <Flex w="full" align="stretch">
      <Box
        display={{ base: "none", md: "block" }}
        w={MARKETING_GUTTER_WIDTH}
        flexShrink={0}
      />
      <Box flex="1" minW={0} px={marketingContentPaddingX}>
        <Flex
          justify="space-between"
          align="flex-start"
          w="full"
          flexWrap="wrap"
          gapX={16}
          gapY={12}
        >
          <Box flexShrink={0}>
            <Logo color="indigo.900" homeLink />
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
            <FooterCol title="Solutions">
              <FooterLink to={SOLUTIONS_PATH}>How we work</FooterLink>
            </FooterCol>

            <FooterCol title="Resources">
              <FooterLink to={rootRoute({}).careers({}).$}>Careers</FooterLink>
            </FooterCol>

            <FooterCol title="Legal">
              <FooterLink to={rootRoute({}).legal({}).privacyPolicy({}).$}>
                Privacy Policy
              </FooterLink>
              <FooterLink to={rootRoute({}).legal({}).termsOfService({}).$}>
                Terms of Service
              </FooterLink>
            </FooterCol>

            <FooterCol title="Contact">
              <FooterLink href="https://www.linkedin.com/company/106703002">
                LinkedIn
              </FooterLink>
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
            color="slate.50"
            lineHeight="short"
            m={0}
            textAlign="right"
          >
            © 2026 Rengo AI, Inc. All rights reserved.
          </Text>
        </Flex>
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        w={MARKETING_GUTTER_WIDTH}
        flexShrink={0}
      />
    </Flex>
  </Box>
);
