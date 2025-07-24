import { BoxProps, Center, ProgressCircle, Text } from "@chakra-ui/react";
import React from "react";
import { useBoolean, useTimeout } from "usehooks-ts";

export interface LoadingStateProps extends BoxProps {
  delay?: number;
  message?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | undefined;
  gap?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  delay = 500,
  message,
  size,
  gap,
  ...props
}) => {
  // If delay is 0, show immediately; otherwise use the delay mechanism
  const { setTrue: showSpinner, value: isShowingSpinner } = useBoolean(
    delay === 0,
  );
  useTimeout(showSpinner, delay > 0 ? delay : null);

  return (
    <Center
      flex={1}
      gap={gap || 8}
      flexDirection="column"
      py="24px"
      my="24px"
      {...props}
    >
      {isShowingSpinner && (
        <>
          <ProgressCircle.Root value={null} size={size}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track stroke="blue.200" strokeWidth="0.5" />
              <ProgressCircle.Range stroke="blue.400" strokeWidth="0.5" />
            </ProgressCircle.Circle>
          </ProgressCircle.Root>
          {message && <Text>{message}</Text>}
        </>
      )}
    </Center>
  );
};
