import { DesignNotesPanel } from "@/features/lab/design-notes-panel";
import { LAB_DRAFTS } from "@/features/lab/lab-drafts";
import { ScrollToTop } from "@/shared/utils/scroll-to-top";
import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

/**
 * Minimal shell for the design lab — deliberately NOT the production
 * top-nav/footer, so drafts render on a clean canvas. Also tags the page
 * `noindex` as belt-and-suspenders for preview deploys (the lab is already
 * excluded from the production build).
 *
 * Lab identity + "back to workspace" now live inside the DesignNotesPanel
 * (bottom-right) so drafts can render their own top-nav without a competing
 * fixed header.
 */
export const LabRoot: React.FC = () => {
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

  return (
    <Box minH="100dvh" bg="white">
      <ScrollToTop />
      <Box>
        <Outlet />
      </Box>
      {activeDraft && <DesignNotesPanel draft={activeDraft} />}
    </Box>
  );
};
