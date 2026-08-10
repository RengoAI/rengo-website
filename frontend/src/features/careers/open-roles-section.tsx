import { rootRoute } from "@/app/app-routes";
import { PageContainer } from "@/components/layout/page-container";
import { marketingLayoutBorderColor } from "@/components/layout/marketing-frame";
import { TOP_NAV_HEIGHT } from "@/components/nav/nav-styles";
import { OPEN_ROLES } from "@/features/careers/open-roles";
import { SectionHeading } from "@/features/landing/sections/section-heading";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const OPEN_ROLES_SECTION_ID = "open-roles";

export const OpenRolesSection: React.FC = () => (
  <Box
    as="section"
    id={OPEN_ROLES_SECTION_ID}
    bg="slate.10"
    py={24}
    borderTop="1px solid"
    borderColor={marketingLayoutBorderColor}
    scrollMarginTop={`${TOP_NAV_HEIGHT}px`}
  >
    <PageContainer>
      <Box mb={12}>
        <SectionHeading maxW="720px" flushToRim={false} showAccent={false}>
          Open roles
        </SectionHeading>
      </Box>

      <Flex direction="column" gap={3} w="full" alignItems="stretch">
        {OPEN_ROLES.map((role) => (
          <Box
            key={role.id}
            asChild
            w="full"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            textDecoration="none"
            border="1px solid"
            borderColor="slate.30"
            px={7}
            py={6}
            minH="100px"
            borderRadius={0}
            _hover={{ bg: "slate.20", textDecoration: "none" }}
            transition="background 150ms ease"
          >
            <RouterLink
              to={rootRoute({}).careers({}).role({ roleId: role.id }).$}
            >
              <Text
                fontFamily="body"
                fontSize="20px"
                fontWeight="medium"
                lineHeight={1.25}
                letterSpacing="-0.4px"
                color="indigo.900"
                m={0}
                textAlign="left"
                flex="1"
                minW={0}
              >
                {role.title}
              </Text>
              <Text
                fontFamily="body"
                fontSize="sm"
                lineHeight="short"
                color="slate.50"
                m={0}
                flexShrink={0}
                textAlign="right"
              >
                {role.location}
              </Text>
            </RouterLink>
          </Box>
        ))}
      </Flex>
    </PageContainer>
  </Box>
);
