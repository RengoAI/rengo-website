import { Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface MarketingNavLinkProps {
  label: string;
  to: string;
  navColor: string;
  navHoverColor: string;
}

/**
 * A top-nav item that navigates instead of opening a menu.
 *
 * Mirrors MarketingNavMenu's trigger metrics — 64px height, 14px medium body
 * type, 10px/4px inner padding — so a plain link sits on the same baseline as
 * the dropdown triggers beside it. Used for Solutions, which is a single page.
 *
 * Wraps a react-router Link rather than using Chakra's `as` prop: polymorphic
 * `as={Link}` does not type-check against Chakra v3's prop unions, which is
 * already the cause of one error elsewhere in this codebase.
 */
export const MarketingNavLink: React.FC<MarketingNavLinkProps> = ({
  label,
  to,
  navColor,
  navHoverColor,
}) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <Flex
      align="center"
      justify="center"
      h="64px"
      minH="64px"
      fontFamily="body"
      fontSize="14px"
      fontWeight="medium"
      lineHeight="16px"
    >
      <Flex
        align="center"
        px="10px"
        py="4px"
        color={navColor}
        transition="color 150ms ease"
        _hover={{ color: navHoverColor }}
      >
        {label}
      </Flex>
    </Flex>
  </Link>
);
