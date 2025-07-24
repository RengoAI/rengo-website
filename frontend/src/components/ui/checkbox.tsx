import { Checkbox as ChakraCheckbox, useSlotRecipe } from "@chakra-ui/react";
import * as React from "react";

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.Ref<HTMLLabelElement>;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "subtle";
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const {
      icon,
      children,
      inputProps,
      rootRef,
      size = "md",
      variant = "solid",
      colorScheme = "primary",
      ...rest
    } = props;

    const recipe = useSlotRecipe({ key: "checkbox" });
    const styles = recipe({ size, variant });

    return (
      <ChakraCheckbox.Root
        ref={rootRef}
        className="rengo-checkbox"
        css={styles.root}
        data-size={size}
        data-variant={variant}
        data-color-scheme={colorScheme}
        {...rest}
      >
        <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
        <ChakraCheckbox.Control css={styles.control}>
          {icon ? (
            <ChakraCheckbox.Indicator css={styles.indicator}>
              {icon}
            </ChakraCheckbox.Indicator>
          ) : (
            <ChakraCheckbox.Indicator css={styles.indicator} />
          )}
        </ChakraCheckbox.Control>
        {children != null && (
          <ChakraCheckbox.Label css={styles.label}>
            {children}
          </ChakraCheckbox.Label>
        )}
      </ChakraCheckbox.Root>
    );
  },
);
