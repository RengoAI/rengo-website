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

const LinkedInGlyph: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={22}
    height={22}
    fill="currentColor"
    aria-hidden
    style={{ flexShrink: 0, display: "block" }}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
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
  <Box
    as="footer"
    bg={NAVY}
    color="white"
    px={20}
    pt={16}
    pb={8}
    borderTopWidth="1px"
    borderTopColor="whiteAlpha.200"
  >
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
      .footer-social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgba(255,255,255,0.7);
        transition: color 150ms ease;
      }
      .footer-social-link:hover {
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
      </FooterCol>
    </Flex>

    <Flex
      mt={12}
      pt={6}
      align="center"
      justify="space-between"
      gap={4}
      borderTopWidth="1px"
      borderTopColor="whiteAlpha.200"
    >
      <a
        href="https://www.linkedin.com/company/106703002"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Rengo AI on LinkedIn"
        className="footer-social-link"
      >
        <LinkedInGlyph />
      </a>
      <Text
        fontFamily={EDICT}
        fontSize="11px"
        letterSpacing="0.06em"
        textTransform="uppercase"
        color="whiteAlpha.500"
        textAlign="right"
      >
        © 2026 Rengo AI, Inc.
      </Text>
    </Flex>
  </Box>
);
