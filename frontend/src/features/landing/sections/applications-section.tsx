import { Box, Flex, Text } from "@chakra-ui/react";
import { BookOpenText, NotebookPen, UsersRound } from "lucide-react";
import React from "react";
import { SectionShell } from "./section-shell";

const APPLICATIONS = [
  {
    title: "Portfolio Monitoring",
    body: "Unify historical financials, native files, and portfolio context into a governed data lake.",
    Icon: BookOpenText,
  },
  {
    title: "Deal Review",
    body: "Compare each opportunity against firm precedent without rebuilding context.",
    Icon: NotebookPen,
  },
  {
    title: "Investor relations",
    body: "LP letters, capital calls, and one-off asks answered from the same foundation.",
    Icon: UsersRound,
  },
] as const;

export const ApplicationsSection: React.FC = () => (
  <SectionShell borderTop>
    <Flex direction="column" gap={{ base: 10, md: "60px" }}>
      <Box
        as="h2"
        fontFamily="heading"
        fontWeight={350}
        fontSize={{ base: "26px", md: "32px" }}
        lineHeight={1.2}
        letterSpacing="-2px"
        color="indigo.900"
        maxW="553px"
        m={0}
      >
        Ready-to-deploy applications.
        <br />
        Tailored to{" "}
        <Box as="span" color="accent.link">
          how your firm operates.
        </Box>
      </Box>

      <Flex
        direction={{ base: "column", md: "row" }}
        border="1px solid"
        borderColor="slate.30"
        borderRadius="4px"
        overflow="hidden"
        w="full"
      >
        {APPLICATIONS.map(({ title, body, Icon }, i) => (
          <Flex
            key={title}
            direction="column"
            justify="center"
            gap={2}
            flex="1"
            minW={0}
            minH={{ base: "auto", md: "209px" }}
            p={9}
            borderTop={{ base: i === 0 ? "none" : "1px solid", md: "none" }}
            borderLeft={{ base: "none", md: i === 0 ? "none" : "1px solid" }}
            borderColor={{ base: "slate.30", md: "slate.30" }}
            boxShadow="0px 4px 16px 0px rgba(12,29,52,0.04)"
          >
            <Flex align="flex-start" justify="space-between" gap={4} w="full">
              <Text
                fontFamily="body"
                fontWeight="medium"
                fontSize="20px"
                lineHeight="28.8px"
                letterSpacing="-0.8px"
                color="indigo.900"
                m={0}
              >
                {title}
              </Text>
              <Box color="indigo.900" flexShrink={0}>
                <Icon size={24} strokeWidth={1.5} aria-hidden />
              </Box>
            </Flex>
            <Text
              fontFamily="body"
              fontSize="16px"
              lineHeight={1.4}
              color="gray.600"
              m={0}
            >
              {body}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </SectionShell>
);
