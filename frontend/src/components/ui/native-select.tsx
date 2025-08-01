import { NativeSelect as Select, useRecipe } from "@chakra-ui/react";
import * as React from "react";

interface NativeSelectRootProps extends Select.RootProps {
  icon?: React.ReactNode;
}

export const NativeSelectRoot = React.forwardRef<
  HTMLDivElement,
  NativeSelectRootProps
>(function NativeSelect(props, ref) {
  const { icon, children, ...rest } = props;
  return (
    <Select.Root ref={ref} {...rest}>
      {children}
      <Select.Indicator>{icon}</Select.Indicator>
    </Select.Root>
  );
});

interface NativeSelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface NativeSelectField extends Select.FieldProps {
  items?: Array<string | NativeSelectItem>;
  size?: "xs" | "sm" | "md" | "lg";
  visual?: "simple" | "simple-table";
}

export const NativeSelectField = React.forwardRef<
  HTMLSelectElement,
  NativeSelectField
>(function NativeSelectField(props, ref) {
  const {
    items: itemsProp,
    children,
    size = "md",
    visual = "simple",
    ...rest
  } = props;

  const recipe = useRecipe({ key: "nativeSelect" });
  const styles = recipe({ size, visual });

  const items = React.useMemo(
    () =>
      itemsProp?.map((item) =>
        typeof item === "string" ? { label: item, value: item } : item,
      ),
    [itemsProp],
  );

  return (
    <Select.Field ref={ref} css={styles} {...rest}>
      {children}
      {items?.map((item) => (
        <option key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </option>
      ))}
    </Select.Field>
  );
});
