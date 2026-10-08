import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { Box, chakra, Text } from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import React from "react";

const LINKS = ["Solutions", "Resources", "Team"];

const MENU_ID = "site-nav-menu";

// Matches the `md` breakpoint, where the links come out of the menu.
const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Sticky top bar. Sits on the same 16-column grid as every content band, so
 * the wordmark lines up with the left edge of the sections below it.
 *
 * Below `md` the links and CTA collapse behind an icon button, which opens
 * them as a sheet filling the viewport under the bar.
 */
export const SiteNav: React.FC = () => {
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
      // Translucent so content scrolling underneath shows through, softened
      // by the blur. Solid while the menu is open, so the sheet reads as one
      // surface with the bar.
      bg={isOpen ? "site.bg.surface" : "site.bg.surface/80"}
      backdropFilter="blur(6px)"
      py="16px"
      minH="52px"
    >
      <Grid alignItems="center">
        <GridCol
          span={12}
          display="flex"
          alignItems="center"
          gap="40px"
          minW={0}
        >
          <Text
            fontFamily="heading"
            fontSize="1.0588rem" // 16.94px — the 14px wordmark, up 21% (10% twice)
            fontWeight={500}
            letterSpacing="-0.05em"
            lineHeight="1"
            textTransform="lowercase"
            color="site.fg.strong"
            whiteSpace="nowrap"
          >
            rengo_ai
          </Text>
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
        <GridCol span={4} display="flex" justifyContent="flex-end">
          <ArrowLink
            href="#"
            display={{ base: "none", md: "inline-flex" }}
            color="site.fg.strong"
            letterSpacing="-0.01em"
            lineHeight="1.2"
          >
            Get started
          </ArrowLink>
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
        // Positioned against the sticky bar (a fixed sheet would be trapped
        // by the bar's backdrop-filter anyway), filling the rest of the
        // viewport beneath it.
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
          <chakra.a
            href="#"
            onClick={close}
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="44px"
            borderRadius="2px"
            bg="site.bg.dark"
            transition="opacity 150ms ease"
            _hover={{ opacity: 0.88 }}
          >
            <ArrowLink color="site.fg.onDark" fontWeight={300} gap="12px">
              Get started
            </ArrowLink>
          </chakra.a>
        </Box>
      )}
    </Section>
  );
};
