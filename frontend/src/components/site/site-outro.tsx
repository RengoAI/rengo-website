import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { DotSheet } from "@/components/site/mesh-field";
import { OutroFigures } from "@/components/site/outro-figures";
import { Box, Text } from "@chakra-ui/react";
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
    <DotSheet />
    <OutroFigures />
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
          <Text
            id="outro-heading"
            textStyle="d1"
            color="site.fg.strong"
            maxW="496px"
            textAlign="center"
          >
            Ready to make your data{" "}
            <Box as="span" color="site.accent">
              your alpha?
            </Box>
          </Text>
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
