import { rootRoute } from "@/app/app-routes";
import { PageHero } from "@/components/layout/page-hero";
import {
  ctaButtonHoverWithArrowProps,
  ButtonArrowLabel,
} from "@/components/ui/button-arrow-label";
import { FoundersSection } from "@/features/company/founders-section";
import { SectionShell } from "@/features/landing/sections/section-shell";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const JoinUsCtaSection: React.FC<{ onViewCareers: () => void }> = ({
  onViewCareers,
}) => (
  <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={{ base: 8, md: 10 }}
      w="full"
    >
      <Box flex="1" minW={0} maxW="640px">
        <Box
          as="h2"
          fontFamily="heading"
          fontWeight={350}
          fontSize={{ base: "26px", md: "36px" }}
          lineHeight={1.2}
          letterSpacing="-2px"
          color="indigo.900"
          m={0}
        >
          Join Us
        </Box>
        <Text
          fontFamily="heading"
          fontWeight={300}
          fontSize="18px"
          lineHeight="24px"
          color="slate.50"
          mt={3}
          mb={0}
          mx={0}
        >
          We&apos;re hiring across engineering and product.
        </Text>
      </Box>

      <Button
        flexShrink={0}
        alignSelf={{ base: "flex-start", md: "center" }}
        bg="indigo.900"
        color="slate.10"
        borderRadius={0}
        px={8}
        py={3.5}
        h="auto"
        fontFamily="body"
        fontSize="14px"
        fontWeight="normal"
        lineHeight="21px"
        onClick={onViewCareers}
        {...ctaButtonHoverWithArrowProps}
      >
        <ButtonArrowLabel>View careers</ButtonArrowLabel>
      </Button>
    </Flex>
  </SectionShell>
);

export const CompanyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box fontFamily="body" bg="slate.10">
      <PageHero
        headline="Private markets need a new infrastructure layer"
        ctaLabel="See a demo"
        onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      />

      <FoundersSection />

      <JoinUsCtaSection
        onViewCareers={() => navigate(rootRoute({}).careers({}).$)}
      />
    </Box>
  );
};
