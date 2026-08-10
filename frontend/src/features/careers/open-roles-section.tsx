import { rootRoute } from "@/app/app-routes";
import { PageContainer } from "@/components/layout/page-container";
import {
  marketingCardBorderColor,
  marketingContentPaddingX,
  marketingLayoutBorderColor,
} from "@/components/layout/marketing-frame";
import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import { TOP_NAV_HEIGHT } from "@/components/nav/nav-styles";
import { OPEN_ROLES, type OpenRole } from "@/features/careers/open-roles";
import { SectionHeading } from "@/features/landing/sections/section-heading";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const OPEN_ROLES_SECTION_ID = "open-roles";

const groupRolesByDepartment = (
  roles: readonly OpenRole[],
): { department: string; roles: OpenRole[] }[] => {
  const order: string[] = [];
  const byDept = new Map<string, OpenRole[]>();

  for (const role of roles) {
    if (!byDept.has(role.department)) {
      order.push(role.department);
      byDept.set(role.department, []);
    }
    byDept.get(role.department)!.push(role);
  }

  return order.map((department) => ({
    department,
    roles: byDept.get(department)!,
  }));
};

const rolePath = (roleId: string) =>
  rootRoute({}).careers({}).role({ roleId }).$;

export const OpenRolesSection: React.FC = () => {
  const groups = groupRolesByDepartment(OPEN_ROLES);

  return (
    <Box
      as="section"
      id={OPEN_ROLES_SECTION_ID}
      bg="slate.10"
      pt={{ base: 16, md: 20 }}
      pb={{ base: 28, md: 32 }}
      borderTop="1px solid"
      borderColor={marketingLayoutBorderColor}
      scrollMarginTop={`${TOP_NAV_HEIGHT}px`}
    >
      <PageContainer>
        <Box mb={{ base: 12, md: 20 }} display="flex" justifyContent="center">
          <Box maxW="720px" w="full" textAlign="center">
            <SectionHeading maxW="full" flushToRim={false} showAccent={false}>
              Open roles
            </SectionHeading>
            <Text
              mt={{ base: 3, md: 4 }}
              fontFamily="body"
              fontSize="16px"
              lineHeight="24px"
              fontWeight={300}
              color="slate.50"
              m={0}
              textAlign="center"
            >
              If building the next generation of software excites you, we&apos;d
              love to talk
            </Text>
          </Box>
        </Box>
      </PageContainer>

      <MarketingPageWidth variant="content">
        <Flex direction="column" gap={{ base: 10, md: 12 }} w="full">
          {groups.map(({ department, roles }) => (
            <Box key={department} w="full">
              <Box
                as="h4"
                fontFamily="body"
                fontSize="16px"
                lineHeight="24px"
                color="slate.50"
                m={0}
                mb={6}
                px={marketingContentPaddingX}
              >
                {department}
              </Box>

              <Box w="full">
                {roles.map((role) => (
                  <Box
                    key={role.id}
                    borderTop="1px solid"
                    borderColor={marketingCardBorderColor}
                    _hover={{ bg: "slate.20" }}
                    transition="background 150ms ease"
                  >
                    <Box
                      asChild
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={4}
                      px={marketingContentPaddingX}
                      py={{ base: 5, md: 6 }}
                      minH={{ base: "56px", md: "64px" }}
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
                      <RouterLink to={rolePath(role.id)}>
                        <Text
                          fontFamily="body"
                          fontSize="16px"
                          lineHeight="24px"
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
                          fontSize="16px"
                          lineHeight="24px"
                          color="slate.50"
                          m={0}
                          flexShrink={0}
                          textAlign="right"
                        >
                          {role.location}
                        </Text>
                      </RouterLink>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Flex>
      </MarketingPageWidth>
    </Box>
  );
};
