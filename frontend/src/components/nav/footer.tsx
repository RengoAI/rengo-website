import { Logo } from "@/components/logo/logo";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NAVY = "#0C1D34";

interface FooterColProps {
  title: string;
  children: React.ReactNode;
}

const FooterCol: React.FC<FooterColProps> = ({ title, children }) => (
  <Flex direction="column" gap={2} minW="128px">
    <Text fontSize="14px" color="whiteAlpha.900" lineHeight="20px" mb={1}>
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
    bg={NAVY}
    color="white"
    px={20}
    pt={16}
    pb={10}
    borderTopWidth="1px"
    borderTopColor="whiteAlpha.200"
  >
    <style>{`
      .footer-link {
        color: rgba(255,255,255,0.52);
        text-decoration: none;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        transition: color 150ms ease;
      }
      .footer-link:hover {
        color: rgba(255,255,255,1);
      }
      .footer-bottom-copyright {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.42);
        line-height: 20px;
      }
    `}</style>
    <Flex
      justify="space-between"
      align="flex-start"
      w="full"
      flexWrap="wrap"
      gapX={16}
      gapY={12}
    >
      <Box flexShrink={0}>
        <Logo
          color="white"
          layout="footer"
          colorModeBehavior="display"
          isCollapsed
        />
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
          <FooterLink to="/legal/terms-of-service">Terms of Service</FooterLink>
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
      <Text className="footer-bottom-copyright" m={0} textAlign="right">
        © 2026 Rengo AI, Inc. All rights reserved.
      </Text>
    </Flex>
  </Box>
);
