import { PageHero } from "@/components/layout/page-hero";
import { Box } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CompanyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box fontFamily='"Inter Tight", Inter, sans-serif'>
      <PageHero
        headline={
          <>
            Build the future
            <br />
            of private markets
          </>
        }
        subtext="Rengo is purpose built AI for private markets giving asset managers a single, searchable source of truth for their portfolio data"
        ctaLabel="See a demo"
        onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      />

      <PageHero
        headline="Join us."
        subtext="We're hiring across engineering and product."
        ctaLabel="View careers"
        onCtaClick={() => navigate("/careers")}
        tone="light"
      />
    </Box>
  );
};
