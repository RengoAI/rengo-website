import { LinkButton } from "@/components/ui/link-button";
import { Status, StatusValue } from "@/components/ui/status";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "lucide-react";
import React from "react";

export interface ContentBlockItem {
  name: string;
  value: any;
  link?: string;
  status?: StatusValue;
}

interface ContentBlockItemGroupProps {
  items: ContentBlockItem[];
}

const ContentBlockItem = ({ item }: { item: ContentBlockItem }) => {
  if (item.link) {
    return (
      <LinkButton href={item.link} size="xs">
        <Text>{item.value}</Text>
        <ExternalLinkIcon size={16} />
      </LinkButton>
    );
  }

  if (item.status) {
    return <Status value={item.status}>{item.value}</Status>;
  }
  return (
    <Text flex="1" fontSize="sm">
      {item.value}
    </Text>
  );
};

export const ContentBlockItemGroup: React.FC<ContentBlockItemGroupProps> = ({
  items,
}) => (
  <Flex gap={4}>
    <Flex
      flex="1"
      direction="column"
      bg="bg.subtle"
      borderRadius="md"
      overflow="hidden"
      p={2}
    >
      {items.map((item, index) => (
        <Flex key={index} width="100%">
          <Text flex="1" p={4} fontSize="sm" color="fg.muted">
            {item.name}
          </Text>
        </Flex>
      ))}
    </Flex>
    <Flex
      flex="1"
      direction="column"
      bg="bg.subtle"
      borderRadius="md"
      overflow="hidden"
      p={4}
    >
      {items.map((item, index) => (
        <Flex key={index} width="100%">
          <Box p={4}>
            <ContentBlockItem key={index} item={item} />
          </Box>
        </Flex>
      ))}
    </Flex>
  </Flex>
);
