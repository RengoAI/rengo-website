import { chakra } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RouterLink = chakra(Link);

/**
 * Bright review yellow for every control that switches hero designs; the
 * palette's yellows are all muted golds.
 */
export const YELLOW = "#FFD84D";

/**
 * A large yellow pill floating bottom-right that opens the hero lab on the
 * first variant, to compare the other directions.
 */
export const HeroDesignsButton: React.FC = () => (
  <RouterLink
    to="/v3/heroes?v=1"
    position="fixed"
    right={{ base: "16px", md: "24px" }}
    bottom={{ base: "16px", md: "24px" }}
    zIndex={20}
    display="inline-flex"
    alignItems="center"
    gap="12px"
    h={{ base: "52px", md: "60px" }}
    px={{ base: "22px", md: "28px" }}
    borderRadius="full"
    bg={YELLOW}
    color="black"
    fontSize={{ base: "1rem", md: "1.125rem" }}
    fontWeight={500}
    letterSpacing="-0.01em"
    whiteSpace="nowrap"
    boxShadow="0 4px 16px rgba(0, 0, 0, 0.16)"
    transition="transform 150ms ease, box-shadow 150ms ease"
    _hover={{
      transform: "translateY(-1px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    }}
  >
    Other hero designs
    <ArrowRight size={20} strokeWidth={1.75} aria-hidden />
  </RouterLink>
);
