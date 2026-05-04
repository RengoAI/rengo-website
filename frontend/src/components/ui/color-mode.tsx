/* eslint-disable func-style */

import {
  type IconButtonProps,
  type SpanProps,
  ClientOnly,
  IconButton,
  Skeleton,
  Span,
} from "@chakra-ui/react";
import { Sun } from "lucide-react";
import * as React from "react";

export function ColorModeIcon() {
  return <Sun />;
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

const iconSizeMap: Record<
  string,
  { buttonSize: "sm" | "lg"; iconSize: string }
> = {
  sm: { buttonSize: "sm", iconSize: "5" },
  lg: { buttonSize: "lg", iconSize: "9" },
  "2xl": { buttonSize: "lg", iconSize: "11" },
};

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const size = (props.size as string) ?? "sm";
  const sizeConfig = iconSizeMap[size] ?? iconSizeMap.sm;

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        variant="ghost"
        aria-label="Toggle color mode"
        size={sizeConfig.buttonSize}
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: sizeConfig.iconSize,
            height: sizeConfig.iconSize,
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    );
  },
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    );
  },
);
