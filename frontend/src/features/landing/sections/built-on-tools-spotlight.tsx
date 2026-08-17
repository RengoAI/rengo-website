import { ButtonArrowLabel } from "@/components/ui/button-arrow-label";
import { ExistingToolsArt } from "@/features/landing/sections/existing-tools-art";
import { SectionShell } from "@/features/landing/sections/section-shell";
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Baseten “product card” layout: illustration, title, body, optional outlined CTA.
 */
export const BuiltOnToolsSpotlight: React.FC<{ showCta?: boolean }> = ({
  showCta = true,
}) => (
  <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "72px" }}>
    <Box
      maxW="420px"
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      gap={{ base: 8, md: 10 }}
    >
      <ExistingToolsArt size="spotlight" />

      <Box display="flex" flexDirection="column" gap={3}>
        <Text
          as="h2"
          variant="h2"
          fontWeight={350}
          fontSize={{ base: "22px", md: "26px" }}
          lineHeight={1.25}
          letterSpacing="-1.2px"
          color="indigo.900"
          m={0}
        >
          Built on top of your existing tools and systems
        </Text>
        <Text
          fontFamily="body"
          fontSize={{ base: "15px", md: "16px" }}
          lineHeight={1.5}
          letterSpacing="-0.2px"
          color="slate.50"
          m={0}
        >
          Connect the CRMs, data warehouses, and models your teams already rely
          on—without ripping and replacing what works.
        </Text>
      </Box>

      {showCta ? (
        <Button
          /* `asChild` with the link as a child, rather than `as={RouterLink}`:
             Chakra v3's ButtonProps has no `to`, so the polymorphic form does
             not type-check. This matches the pattern used elsewhere. */
          asChild
          variant="outline"
          size="sm"
          h="40px"
          px={5}
          borderColor="slate.30"
          color="indigo.900"
          fontFamily="body"
          fontSize="11px"
          fontWeight="medium"
          letterSpacing="0.08em"
          textTransform="uppercase"
          borderRadius="3px"
          bg="white"
          _hover={{ bg: "slate.20", borderColor: "slate.40" }}
        >
          <RouterLink to="/solutions/data-infrastructure">
            <ButtonArrowLabel iconSize={11}>Learn more</ButtonArrowLabel>
          </RouterLink>
        </Button>
      ) : null}
    </Box>
  </SectionShell>
);
