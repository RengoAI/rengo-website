import { DesignNotesPanel } from "@/features/lab/design-notes-panel";
import { LAB_DRAFTS } from "@/features/lab/lab-drafts";
import { ScrollToTop } from "@/shared/utils/scroll-to-top";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FlaskConical } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const LAB_NAV_HEIGHT = 52;

/**
 * Minimal shell for the design lab — deliberately NOT the production
 * top-nav/footer, so drafts render on a clean canvas. Also tags the page
 * `noindex` as belt-and-suspenders for preview deploys (the lab is already
 * excluded from the production build).
 */
export const LabRoot: React.FC = () => {
  const [atTop, setAtTop] = useState(true);
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/lab\/?/, "").replace(/\/$/, "");
  const activeDraft = LAB_DRAFTS.find(d => d.slug === slug);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box minH="100dvh" bg="white">
      <ScrollToTop />
      <Flex
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={500}
        h={`${LAB_NAV_HEIGHT}px`}
        align="center"
        justify="space-between"
        px={{ base: 4, md: 6 }}
        borderBottom="1px solid"
        borderColor="border.muted"
        bg="white"
        style={{
          transform: atTop ? "translateY(0)" : `translateY(-${LAB_NAV_HEIGHT}px)`,
          transition: "transform 240ms ease",
        }}
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
      {activeDraft && <DesignNotesPanel draft={activeDraft} />}
    </Box>
  );
};
