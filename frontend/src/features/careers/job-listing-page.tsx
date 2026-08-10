import { rootRoute } from "@/app/app-routes";
import { PageContainer } from "@/components/layout/page-container";
import { TOP_NAV_HEIGHT } from "@/components/nav/nav-styles";
import {
  ButtonArrowLabel,
  ctaButtonHoverWithArrowProps,
} from "@/components/ui/button-arrow-label";
import {
  getOpenRoleById,
  roleMailto,
  type JobContentBlock,
  type OpenRole,
} from "@/features/careers/open-roles";
import { useRequiredStringParams } from "@/shared/hooks/use-required-string-params";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";

const MetaItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Flex direction="column" gap={1} minW={0}>
    <Text
      fontFamily="body"
      fontSize="11px"
      fontWeight="medium"
      letterSpacing="0.08em"
      textTransform="uppercase"
      color="slate.50"
      m={0}
    >
      {label}
    </Text>
    <Text fontFamily="body" fontSize="14px" color="indigo.900" m={0}>
      {value}
    </Text>
  </Flex>
);

const JobBlock: React.FC<{ block: JobContentBlock }> = ({ block }) => {
  if (block.type === "paragraph") {
    return (
      <Text
        fontFamily="body"
        fontSize="16px"
        lineHeight="26px"
        color="ink.body"
        m={0}
      >
        {block.text}
      </Text>
    );
  }

  return (
    <Box as="ul" m={0} pl={6} listStyleType="disc" listStylePosition="outside">
      {block.items.map((item) => (
        <Box
          as="li"
          key={item}
          display="list-item"
          fontFamily="body"
          fontSize="16px"
          lineHeight="26px"
          color="ink.body"
          mb={2}
          _last={{ mb: 0 }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
};

const ApplyButton: React.FC<{ role: OpenRole; w?: string }> = ({ role, w }) => (
  <Button
    asChild
    w={w}
    bg="indigo.900"
    color="slate.10"
    px={8}
    py={3.5}
    h="auto"
    fontFamily="body"
    fontSize="14px"
    fontWeight="normal"
    lineHeight="21px"
    {...ctaButtonHoverWithArrowProps}
  >
    <a href={roleMailto(role.title)}>
      <ButtonArrowLabel>Apply for this job</ButtonArrowLabel>
    </a>
  </Button>
);

export const JobListingPage: React.FC = () => {
  const { roleId } = useRequiredStringParams();
  const role = getOpenRoleById(roleId);

  if (!role) {
    return <Navigate to={rootRoute({}).careers({}).$} replace />;
  }

  return (
    <Box
      fontFamily="body"
      bg="slate.10"
      minH="100vh"
      pt={`${TOP_NAV_HEIGHT}px`}
    >
      <PageContainer>
        <Box
          maxW="760px"
          mx="auto"
          pt={{ base: 8, md: 12 }}
          pb={{ base: 12, md: 16 }}
        >
          <Button
            asChild
            variant="ghost"
            mb={6}
            h="auto"
            minH="auto"
            px={0}
            py={0}
            border="none"
            color="slate.100"
            fontFamily="body"
            fontSize="14px"
            fontWeight="normal"
            bg="transparent"
            _hover={{ bg: "transparent", color: "indigo.900" }}
          >
            <RouterLink to={rootRoute({}).careers({}).$}>← Back</RouterLink>
          </Button>

          <Box
            as="h1"
            fontFamily="heading"
            fontWeight={350}
            fontSize={{ base: "34px", md: "44px" }}
            lineHeight={1.1}
            letterSpacing="-0.03em"
            color="indigo.900"
            m={0}
            mb={6}
          >
            {role.title}
          </Box>

          <Flex
            gap={{ base: 6, md: 10 }}
            flexWrap="wrap"
            pb={8}
            mb={10}
            borderBottom="1px solid"
            borderColor="slate.30"
          >
            <MetaItem label="Location" value={role.location} />
            <MetaItem label="Department" value={role.department} />
            <MetaItem label="Employment" value={role.employmentType} />
          </Flex>

          <Flex direction="column" gap={12}>
            {role.sections.map((section) => (
              <Box key={section.heading}>
                <Box
                  as="h2"
                  fontFamily="heading"
                  fontWeight={350}
                  fontSize={{ base: "22px", md: "26px" }}
                  lineHeight={1.25}
                  letterSpacing="-1px"
                  color="indigo.900"
                  m={0}
                  mb={4}
                >
                  {section.heading}
                </Box>
                <Flex direction="column" gap={4}>
                  {section.blocks.map((block, i) => (
                    <JobBlock key={`${section.heading}-${i}`} block={block} />
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>

          <Box pt={12}>
            <ApplyButton role={role} />
          </Box>
        </Box>
      </PageContainer>
    </Box>
  );
};
