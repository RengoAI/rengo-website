import { SectionHeading } from "@/features/landing/sections/section-heading";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { UserRound } from "lucide-react";
import React from "react";
import { SectionShell } from "./section-shell";

type Testimonial = {
  role: string;
  organization: string;
  quote: string;
};

const TESTIMONIALS: readonly Testimonial[] = [
  {
    role: "Vice President - Data",
    organization: "Real Estate Asset Manager",
    quote:
      "It was really impressive how quickly you were able to adapt and add new features within the system. Once I gave you access to some of our high-level data, you could turn around, understand it, and funnel it in pretty quickly.",
  },
  {
    role: "Senior Associate",
    organization: "Growth Equity Firm",
    quote:
      "Rengo has evolved tremendously in just a few months. Being able to centralize our portfolio data, recall every deal we've evaluated, and make that knowledge instantly accessible across the team is incredibly powerful and something we're genuinely excited about.",
  },
  {
    role: "Vice President - Investor Relations",
    organization: "Real Estate Asset Manager",
    quote:
      "The platform does the heavy lifting, so our team doesn't have to burn a lot of calories just to make the system usable.",
  },
] as const;

const STAGGER_MS = 70;
const ENTRANCE_MS = 560;

const useRevealOnScroll = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  return { ref, revealed };
};

const TestimonialCard: React.FC<{
  item: Testimonial;
  index: number;
  revealed: boolean;
}> = ({ item, index, revealed }) => (
  <Box
    as="figure"
    bg="blue.100"
    border="1px solid"
    borderColor="blue.200"
    borderRadius="4px"
    p="28px"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    boxShadow="0 4px 8px rgba(12, 29, 52, 0.04)"
    opacity={revealed ? 1 : 0}
    transform={revealed ? "translateY(0)" : "translateY(14px)"}
    transition={`opacity ${ENTRANCE_MS}ms ease, transform ${ENTRANCE_MS}ms ease, border-color 0.2s ease`}
    transitionDelay={revealed ? `${index * STAGGER_MS}ms` : "0ms"}
    _hover={{ borderColor: "blue.300" }}
    css={{
      "@media (prefers-reduced-motion: reduce)": {
        opacity: 1,
        transform: "none",
        transition: "border-color 0.2s ease",
      },
    }}
  >
    <Flex direction="column" align="flex-start" gap={8} w="full">
      <Flex align="center" w="full" h="252px" flexShrink={0}>
        <Text
          as="blockquote"
          fontFamily="body"
          fontSize="16px"
          fontWeight="normal"
          lineHeight={1.4}
          color="indigo.700"
          m={0}
          w="full"
        >
          “{item.quote}”
        </Text>
      </Flex>
      <Flex align="flex-start" gap={2} w="full">
        <Flex
          align="center"
          justify="center"
          flexShrink={0}
          w="24px"
          h="24px"
          p="6px"
          borderRadius="full"
          bg="blue.300"
          color="indigo.900"
        >
          <UserRound size={12} strokeWidth={2} />
        </Flex>
        <Box
          as="figcaption"
          fontSize="16px"
          lineHeight={1.2}
          letterSpacing="normal"
          whiteSpace="nowrap"
        >
          <Text fontWeight="light" color="indigo.900" m={0}>
            {item.role}
          </Text>
          <Text fontWeight="light" color="slate.50" m={0}>
            {item.organization}
          </Text>
        </Box>
      </Flex>
    </Flex>
  </Box>
);

export const TrustedTeamsBentoSection: React.FC = () => {
  const { ref, revealed } = useRevealOnScroll();

  return (
    <SectionShell borderTop bg="slate.10" py={{ base: "144px", md: "160px" }}>
      <Box display="flex" flexDirection="column" gap={{ base: 10, md: "60px" }}>
        <SectionHeading maxW="720px">
          Trusted by teams deploying AI
        </SectionHeading>

        <Grid
          ref={ref}
          templateColumns={{
            base: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          }}
          gap={2}
          w="full"
        >
          {TESTIMONIALS.map((item, index) => (
            <TestimonialCard
              key={`${item.role}-${item.organization}`}
              item={item}
              index={index}
              revealed={revealed}
            />
          ))}
        </Grid>
      </Box>
    </SectionShell>
  );
};
