import { ScrollToTop } from "@/shared/utils/scroll-to-top";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FlaskConical } from "lucide-react";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export const LAB_NAV_HEIGHT = 52;

/**
 * Minimal shell for the design lab — deliberately NOT the production
 * top-nav/footer, so drafts render on a clean canvas. Also tags the page
 * `noindex` as belt-and-suspenders for preview deploys (the lab is already
 * excluded from the production build).
 */
export const LabRoot: React.FC = () => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <Box minH="100dvh" bg="white">
      <ScrollToTop />
      <Flex
        as="header"
        position="sticky"
        top={0}
        zIndex={100}
        h={`${LAB_NAV_HEIGHT}px`}
        align="center"
        justify="space-between"
        px={{ base: 4, md: 6 }}
        borderBottom="1px solid"
        borderColor="border.muted"
        bg="white"
      >
        <Link to="/lab" style={{ textDecoration: "none" }}>
          <Flex align="center" gap={2}>
            <FlaskConical size={16} color="var(--rengo-colors-primary-700)" />
            <Text fontFamily="heading" fontSize="md" color="primary.800">
              Rengo Design Lab
            </Text>
          </Flex>
        </Link>
        <Badge colorScheme="orange" variant="subtle">
          Not shipped to production
        </Badge>
      </Flex>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};
