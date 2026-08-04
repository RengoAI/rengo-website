import { LAB_DRAFTS } from "@/features/lab/lab-drafts";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RefChip: React.FC<{ label: string; url: string }> = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "3px",
      padding: "2px 8px",
      borderRadius: "4px",
      border: "1px solid var(--rengo-colors-border-muted)",
      fontSize: "11px",
      color: "var(--rengo-colors-gray-500)",
      fontFamily: "var(--rengo-fonts-mono)",
      textDecoration: "none",
      transition: "border-color 120ms ease, color 120ms ease",
    }}
  >
    {label}
    <ArrowUpRight size={10} />
  </a>
);

export const LabIndexPage: React.FC = () => (
  <Box
    px={{ base: 4, md: 8 }}
    pt={{ base: 20, md: 28 }}
    pb={{ base: 10, md: 16 }}
  >
    <Text fontFamily="heading" fontSize="2xl" color="primary.800" mb={2}>
      Design drafts
    </Text>
    <Text fontSize="sm" color="gray.500" maxW="480px" mb={10}>
      A scratch space for exploring website ideas. Each card is an in-progress
      concept; nothing here is live. Once a draft is finalized, promote it into
      the real feature and it ships through the normal deploy.
    </Text>

    {LAB_DRAFTS.length === 0 ? (
      <Text color="gray.400">No drafts yet — add one in `lab-drafts.tsx`.</Text>
    ) : (
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={{ base: 4, md: 6 }}
      >
        {LAB_DRAFTS.map((draft) => (
          <Link
            key={draft.slug}
            to={draft.slug}
            style={{ textDecoration: "none" }}
          >
            <Box
              borderWidth="1px"
              borderColor="border.muted"
              borderRadius="lg"
              p={6}
              h="full"
              transition="border-color 150ms ease, box-shadow 150ms ease"
              _hover={{ borderColor: "primary.400", boxShadow: "sm" }}
            >
              <Flex justify="space-between" align="start" gap={3} mb={3}>
                <Text fontFamily="heading" fontSize="lg" color="primary.800">
                  {draft.title}
                </Text>
                <ArrowUpRight
                  size={18}
                  color="var(--rengo-colors-primary-700)"
                />
              </Flex>
              <Text fontSize="sm" color="gray.500" lineHeight={1.5} mb={draft.refs?.length ? 4 : 0}>
                {draft.description}
              </Text>
              {draft.refs && draft.refs.length > 0 && (
                <Flex gap={2} wrap="wrap">
                  {draft.refs.map((ref) => (
                    <RefChip key={ref.url} label={ref.label} url={ref.url} />
                  ))}
                </Flex>
              )}
            </Box>
          </Link>
        ))}
      </Grid>
    )}
  </Box>
);
