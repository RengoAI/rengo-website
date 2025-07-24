import { Card } from "@chakra-ui/react";

export const ContentBlock: React.FC<React.PropsWithChildren> = ({
  children,
}) => <Card.Root>{children}</Card.Root>;
