import { Card } from "@chakra-ui/react";

export const ContentBlockBody: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Card.Body px={6} pt={6} pb={6} borderRadius="md">
    {children}
  </Card.Body>
);
