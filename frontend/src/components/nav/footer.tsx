import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NAVY = "#0C1D34";
const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

interface FooterColProps {
  title: string;
  children: React.ReactNode;
}

const FooterCol: React.FC<FooterColProps> = ({ title, children }) => (
  <Flex direction="column" gap={3} minW="120px">
    <Text
      fontFamily={EDICT}
      fontSize="11px"
      letterSpacing="0.08em"
      textTransform="uppercase"
      color="whiteAlpha.500"
      mb={1}
    >
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
    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link">
      {children}
    </a>
  );
};

export const AppFooter: React.FC = () => (
  <Box as="footer" bg={NAVY} color="white" px={20} pt={16} pb={8}>
    <style>{`
      .footer-link {
        color: rgba(255,255,255,0.65);
        text-decoration: none;
        font-size: 14px;
        cursor: pointer;
        transition: color 150ms ease;
      }
      .footer-link:hover {
        color: rgba(255,255,255,1);
      }
    `}</style>
    <Flex justify="space-between" align="flex-start" w="full">
      <FooterCol title="Overview">
        <FooterLink to="/product/portfolio-monitoring">
          Portfolio Monitoring
        </FooterLink>
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
        <FooterLink href="mailto:sales@rengoai.com">See a demo</FooterLink>
        <FooterLink href="mailto:sales@rengoai.com">Sales</FooterLink>
        <FooterLink href="https://www.linkedin.com/company/106703002">
          LinkedIn
        </FooterLink>
      </FooterCol>
    </Flex>

    <Text
      mt={12}
      fontFamily={EDICT}
      fontSize="11px"
      letterSpacing="0.06em"
      textTransform="uppercase"
      color="whiteAlpha.500"
    >
      © 2026 Rengo AI, Inc.
    </Text>
  </Box>
);
