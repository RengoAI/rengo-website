import { LAB_DRAFTS } from "@/features/lab/lab-drafts";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const LabIndexPage: React.FC = () => (
  <Box
    maxW="1080px"
    mx="auto"
    px={{ base: 4, md: 6 }}
    py={{ base: 10, md: 16 }}
  >
    <Text fontFamily="heading" fontSize="3xl" color="primary.800" mb={2}>
      Design drafts
    </Text>
    <Text fontSize="md" color="gray.500" maxW="640px" mb={10}>
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
              <Text fontSize="sm" color="gray.500" lineHeight={1.5}>
                {draft.description}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>
    )}
  </Box>
);
