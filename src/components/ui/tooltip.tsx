import {
  Tooltip as ChakraTooltip,
  Portal,
  useSlotRecipe,
} from "@chakra-ui/react";
import * as React from "react";

export interface TooltipProps extends Omit<ChakraTooltip.RootProps, "variant"> {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content: React.ReactNode;
  contentProps?: ChakraTooltip.ContentProps;
  disabled?: boolean;
  unstyled?: boolean;
  variant?: "default";
  size?: "sm" | "md" | "lg";
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      variant,
      size,
      ...rest
    } = props;

    const recipe = useSlotRecipe({ key: "tooltip" });
    const styles = recipe({ variant, size });

    if (disabled) return children;

    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild css={styles?.trigger}>
          {children}
        </ChakraTooltip.Trigger>
        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner css={styles?.positioner}>
            <ChakraTooltip.Content
              ref={ref}
              css={styles?.content}
              {...contentProps}
            >
              {showArrow && (
                <ChakraTooltip.Arrow css={styles?.arrow}>
                  <ChakraTooltip.ArrowTip css={styles?.arrowTip} />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    );
  },
);
