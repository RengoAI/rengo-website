import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

/**
 * The closing "Ready to make your data your alpha?" band that every rebrand
 * page ends on, just above the footer.
 */
export const SiteOutro: React.FC = () => (
  <Box
    as="section"
    position="relative"
    bg="site.bg.tint"
    overflow="hidden"
    aria-labelledby="outro-heading"
  >
    {/*
      In Figma this hangs off the grid column rather than the band, so its
      -50/-99 offsets are relative to the 40px/100px inset — which lands it
      just outside the left edge and flush with the top. It runs to the right
      edge at any width, never narrower than the design's 1443px; height
      follows the image's aspect ratio and the band clips the overflow.
    */}
    <Image
      src="/img/rebrand/hero-mesh.png"
      alt=""
      position="absolute"
      left="-10px"
      top="1px"
      w="calc(100% + 10px)"
      minW="1443px"
      h="auto"
      maxW="none"
      mixBlendMode="hard-light"
      pointerEvents="none"
      aria-hidden
    />
    <Section
      rhythm="none"
      position="relative"
      zIndex={1}
      py={{ base: "100px", md: "140px", lg: "188px" }}
    >
      <Grid>
        <GridCol
          span={16}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={{ base: "40px", md: "60px" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="20px"
            textAlign="center"
          >
            <Text
              id="outro-heading"
              textStyle="d1"
              color="site.fg.strong"
              maxW="496px"
            >
              Ready to make your data{" "}
              <Box as="span" color="site.accent">
                your alpha?
              </Box>
            </Text>
            <Text textStyle="body.sm" color="site.fg" maxW="372px">
              Your workflows are complex. Managing the data behind them
              doesn&rsquo;t have to be. We are here to help.
            </Text>
          </Box>
          <Box
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            w="206px"
            h="49px"
            px="12px"
            py="6px"
            borderRadius="4px"
            bg="site.bg.darkRaised"
            cursor="pointer"
            transition="opacity 150ms ease"
            _hover={{ opacity: 0.88 }}
          >
            <ArrowLink
              w="full"
              justifyContent="space-between"
              fontSize="1.25rem"
              fontWeight={300}
              lineHeight="21px"
              letterSpacing="0"
              color="canvas.50"
            >
              Get in touch
            </ArrowLink>
          </Box>
        </GridCol>
      </Grid>
    </Section>
  </Box>
);
