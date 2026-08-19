import { SectionHeading } from "@/features/landing/sections/section-heading";
import { Box, Grid, Text } from "@chakra-ui/react";
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
    bg="slate.20"
    border="1px solid"
    borderColor="slate.30"
    borderRadius="6px"
    p={4}
    display="flex"
    flexDirection="column"
    gap={8}
    h="264px"
    overflow="hidden"
    opacity={revealed ? 1 : 0}
    transform={revealed ? "translateY(0)" : "translateY(14px)"}
    transition={`opacity ${ENTRANCE_MS}ms ease, transform ${ENTRANCE_MS}ms ease, border-color 0.2s ease`}
    transitionDelay={revealed ? `${index * STAGGER_MS}ms` : "0ms"}
    _hover={{ borderColor: "slate.40" }}
    css={{
      "@media (prefers-reduced-motion: reduce)": {
        opacity: 1,
        transform: "none",
        transition: "border-color 0.2s ease",
      },
    }}
  >
    <Box display="flex" flexDirection="column" gap={6} flex="1" minH={0}>
      <Box as="figcaption" display="flex" alignItems="center" gap={2.5} minW={0}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          w="36px"
          h="36px"
          borderRadius="6px"
          bg="slate.30"
          color="indigo.900"
        >
          <UserRound size={16} strokeWidth={1.75} aria-hidden />
        </Box>
        <Box display="flex" flexDirection="column" minW={0}>
          <Text
            fontSize="14px"
            lineHeight="20px"
            fontWeight={500}
            letterSpacing="-0.1px"
            color="indigo.900"
            m={0}
            truncate
          >
            {item.role}
          </Text>
          <Text
            fontSize="14px"
            lineHeight="20px"
            fontWeight="normal"
            color="slate.50"
            m={0}
            truncate
          >
            {item.organization}
          </Text>
        </Box>
      </Box>
      <Text
        as="blockquote"
        fontSize="14px"
        lineHeight="24px"
        color="slate.50"
        m={0}
        flex="1"
        minH={0}
        css={{
          display: "-webkit-box",
          WebkitLineClamp: 6,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {item.quote}
      </Text>
    </Box>
  </Box>
);

export const TrustedTeamsBentoSection: React.FC = () => {
  const { ref, revealed } = useRevealOnScroll();

  return (
    <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
      <Box display="flex" flexDirection="column" gap={{ base: 10, md: "60px" }}>
        <SectionHeading maxW="720px">
          Trusted by teams adopting AI
        </SectionHeading>

        <Grid
          ref={ref}
          templateColumns={{
            base: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          }}
          gap={{ base: 2, md: 4 }}
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
