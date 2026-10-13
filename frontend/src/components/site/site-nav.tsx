import { rootRoute } from "@/app/app-routes";
import { Grid, GridCol } from "@/components/layout/grid";
import { marketingLayoutBorderColor } from "@/components/layout/marketing-frame";
import { Section } from "@/components/layout/section";
import { Logo } from "@/components/logo/logo";
import { NAV_H, SolidCta } from "@/features/hero-lab/hero-shared";
import { Box, chakra } from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const LINKS = ["Resources", "Team"];

const MENU_ID = "site-nav-menu";

// Matches the `md` breakpoint, where the links come out of the menu.
const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Sticky top bar. Sits on the same 16-column grid as every content band, so
 * the wordmark lines up with the left edge of the sections below it.
 *
 * Below `md` the links and CTA collapse behind an icon button, which opens
 * them as a sheet filling the viewport under the bar.
 *
 * `overlay` lays the bar over the top of the first section instead of above
 * it. The section has to extend up behind it (e.g. `<GlyphBedHero underNav />`).
 */
export const SiteNav: React.FC<{ overlay?: boolean }> = ({
  overlay = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = React.useCallback(() => setIsOpen(false), []);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    // Widening past the breakpoint hides the button, so drop the menu too.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => desktop.matches && close();
    // The sheet covers the page, so the page shouldn't scroll behind it.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [isOpen, close]);

  return (
    <Section
      as="nav"
      rhythm="none"
      position="sticky"
      top={0}
      zIndex={10}
      // Opaque, including while content scrolls underneath. The hairline
      // stays put too — it does not drop off once the page moves.
      bg="site.bg.surface"
      mb={overlay ? `-${NAV_H}px` : undefined}
      py="8px"
      minH={`${NAV_H}px`}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor={marketingLayoutBorderColor}
    >
      <Grid alignItems="center">
        <GridCol
          span={12}
          display="flex"
          alignItems="center"
          gap="40px"
          minW={0}
        >
          <Link
            to={rootRoute({}).landingV3({}).$}
            style={{ display: "flex", textDecoration: "none" }}
          >
            <Logo color="indigo.900" />
          </Link>
          <Box
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            gap="20px"
          >
            {LINKS.map((link) => (
              <chakra.a
                key={link}
                href="#"
                textStyle="body.sm"
                letterSpacing="0"
                textTransform="capitalize"
                color="site.fg.strong"
                whiteSpace="nowrap"
                cursor="pointer"
                transition="opacity 150ms ease"
                _hover={{ opacity: 0.6 }}
              >
                {link}
              </chakra.a>
            ))}
          </Box>
        </GridCol>
        <GridCol
          span={4}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box display={{ base: "none", md: "block" }}>
            <SolidCta
              h="28px"
              onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
            />
          </Box>
          {/* 32px hit area around a 20px glyph; the negative margin keeps the
              glyph itself flush with the gutter and the bar at its height. */}
          <chakra.button
            type="button"
            display={{ base: "flex", md: "none" }}
            alignItems="center"
            justifyContent="center"
            boxSize="32px"
            my="-8px"
            mr="-6px"
            color="site.fg.strong"
            cursor="pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </chakra.button>
        </GridCol>
      </Grid>

      {isOpen && (
        // Hangs from the sticky bar and fills the rest of the viewport.
        <Box
          id={MENU_ID}
          position="absolute"
          top="100%"
          left={0}
          right={0}
          h="calc(100dvh - 100%)"
          px="gutter"
          pt="24px"
          pb="40px"
          bg="site.bg.surface"
          borderTopWidth="1px"
          borderTopStyle="dotted"
          borderTopColor="site.border.dashed"
          display={{ base: "flex", md: "none" }}
          flexDirection="column"
          justifyContent="space-between"
          overflowY="auto"
        >
          <Box
            as="ul"
            listStyleType="none"
            display="flex"
            flexDirection="column"
          >
            {LINKS.map((link) => (
              <Box as="li" key={link}>
                <chakra.a
                  href="#"
                  onClick={close}
                  display="block"
                  py="12px"
                  textStyle="h4"
                  fontWeight={300}
                  color="site.fg.strong"
                  transition="opacity 150ms ease"
                  _hover={{ opacity: 0.6 }}
                >
                  {link}
                </chakra.a>
              </Box>
            ))}
          </Box>
          <SolidCta w="full" justifyContent="center" onClick={close} />
        </Box>
      )}
    </Section>
  );
};
