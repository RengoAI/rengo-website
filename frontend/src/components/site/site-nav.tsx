import { rootRoute } from "@/app/app-routes";
import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Logo } from "@/components/logo/logo";
import { CONTACT_HREF, NAV_H } from "@/components/site/site-constants";
import { dottedTop, hoverFade } from "@/components/site/site-styles";
import { SolidCta } from "@/components/site/solid-cta";
import { Box, chakra } from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RouterLink = chakra(Link);

/** The nav's in-app pages. */
const LINKS: { label: string; to: string }[] = [
  { label: "Solutions", to: rootRoute({}).solutions({}).$ },
  { label: "Careers", to: rootRoute({}).careers({}).$ },
  { label: "Team", to: rootRoute({}).aboutV3({}).$ },
];

const MENU_ID = "site-nav-menu";

/** The product's sign-in, opened in a new tab. */
const LOGIN_URL = "https://app.rengoai.com/";

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
 * it. The section has to extend up behind it, as the /v3 hero does.
 *
 * The bar draws no rule underneath; once the page scrolls, a soft shadow
 * lifts it off what passes beneath.
 */

/** The bar's links, "Log in" among them, from `md` up. */
const DESKTOP_LINK = {
  textStyle: "body.sm",
  letterSpacing: "0",
  pt: "2px",
  color: "site.fg.strong",
  whiteSpace: "nowrap",
  ...hoverFade,
} as const;

/** The same links in the mobile sheet. */
const SHEET_LINK = {
  display: "block",
  py: "12px",
  textStyle: "h4",
  fontWeight: 300,
  color: "site.fg.strong",
  ...hoverFade,
} as const;

/** Whether the page has scrolled at all. */
const useScrolled = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
};

export const SiteNav: React.FC<{
  overlay?: boolean;
}> = ({ overlay = false }) => {
  const scrolled = useScrolled();
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
      aria-label="Main"
      rhythm="none"
      position="sticky"
      top={0}
      zIndex={10}
      // Opaque, including while content scrolls underneath.
      bg="site.bg.surface"
      mb={overlay ? `-${NAV_H}px` : undefined}
      py="8px"
      minH={`${NAV_H}px`}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      // A soft shadow once the page scrolls, lifting the bar off what
      // passes beneath it.
      boxShadow={
        scrolled ? "0 2px 12px rgba(12, 29, 52, 0.03)" : "0 0 0 transparent"
      }
      transition="box-shadow 200ms ease"
    >
      <Grid alignItems="center">
        {/* From md: the wordmark on the left, the links from column 4 —
            column 3 from lg, where the wordmark leaves room (and, from xl,
            the hero title's left edge) — and "Log in" and the CTA on the
            right half. Below md the links are in the menu, so the wordmark
            takes the left half. */}
        <GridCol
          span={{ base: 8, md: 3, lg: 2 }}
          display="flex"
          alignItems="center"
          minW={0}
        >
          <Link
            to={rootRoute({}).landingV3({}).$}
            aria-label="Rengo AI home"
            style={{ display: "flex", textDecoration: "none" }}
          >
            <Logo color="indigo.900" />
          </Link>
        </GridCol>
        <GridCol
          as="ul"
          span={{ md: 5, lg: 6 }}
          start={{ md: 4, lg: 3 }}
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap="20px"
        >
          {LINKS.map((link) => (
            <chakra.li key={link.label}>
              <RouterLink to={link.to} {...DESKTOP_LINK}>
                {link.label}
              </RouterLink>
            </chakra.li>
          ))}
        </GridCol>
        <GridCol
          span={8}
          start={{ md: 9 }}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap="24px"
        >
          <chakra.a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            display={{ base: "none", md: "block" }}
            {...DESKTOP_LINK}
          >
            Log in
          </chakra.a>
          <Box display={{ base: "none", md: "block" }}>
            {/* The hero's "Book a call" button, at its 27px. */}
            <SolidCta h="27px" href={CONTACT_HREF}>
              Book a call
            </SolidCta>
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
          {...dottedTop()}
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
              <Box as="li" key={link.label}>
                <RouterLink to={link.to} onClick={close} {...SHEET_LINK}>
                  {link.label}
                </RouterLink>
              </Box>
            ))}
            <Box as="li">
              <chakra.a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                {...SHEET_LINK}
              >
                Log in
              </chakra.a>
            </Box>
          </Box>
          <SolidCta
            href={CONTACT_HREF}
            w="full"
            justifyContent="center"
            onClick={close}
          >
            Book a call
          </SolidCta>
        </Box>
      )}
    </Section>
  );
};
