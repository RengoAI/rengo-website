import { Alert as ChakraAlert, Flex } from "@chakra-ui/react";
import * as React from "react";

export interface AlertProps extends Omit<ChakraAlert.RootProps, "title"> {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactElement;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const { title, children, icon, startElement, endElement, ...rest } = props;
    return (
      <ChakraAlert.Root ref={ref} {...rest}>
        <Flex gap={4}>
          {startElement || (
            <ChakraAlert.Indicator display="flex" alignItems="center">
              {icon}
            </ChakraAlert.Indicator>
          )}
          {children ? (
            <ChakraAlert.Content display="flex" alignItems="center">
              <ChakraAlert.Title>{title}</ChakraAlert.Title>
              <ChakraAlert.Description>{children}</ChakraAlert.Description>
            </ChakraAlert.Content>
          ) : (
            <ChakraAlert.Title flex="1" display="flex" alignItems="center">
              {title}
            </ChakraAlert.Title>
          )}
          {endElement}
        </Flex>
      </ChakraAlert.Root>
    );
  },
);
