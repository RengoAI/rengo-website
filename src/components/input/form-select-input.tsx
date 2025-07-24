import { createListCollection, Select, useSlotRecipe } from "@chakra-ui/react";
import * as React from "react";

import { Field } from "@/components/ui/field";
import { useController, useFormContext } from "react-hook-form";

export interface FormSelectInputProps {
  label: string;
  name: string;
  items: SelectOption[] | SelectOptionGroup[];
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  readOnly?: boolean;
  multiple?: boolean;
  helperText?: string;
  hidden?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

const isOptionGroup = (
  item: SelectOption | SelectOptionGroup,
): item is SelectOptionGroup => "options" in item;

export const FormSelectInput = ({
  label,
  name,
  items,
  placeholder = "Select an option...",
  size = "md",
  disabled = false,
  readOnly = false,
  multiple = false,
  helperText,
  hidden,
}: FormSelectInputProps) => {
  const { control } = useFormContext();
  const recipe = useSlotRecipe({ key: "select" });
  const styles = recipe({ size });

  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  // Flatten options for collection
  const flatOptions = React.useMemo(() => {
    const flattened: SelectOption[] = [];
    items.forEach((item) => {
      if (isOptionGroup(item)) {
        flattened.push(...item.options);
      } else {
        flattened.push(item);
      }
    });
    return flattened;
  }, [items]);

  const collection = React.useMemo(
    () =>
      createListCollection({
        items: flatOptions,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [flatOptions],
  );

  const handleValueChange = React.useCallback(
    (details: { value: string[] }) => {
      if (multiple) {
        onChange(details.value);
      } else {
        onChange(details.value[0] || "");
      }
    },
    [onChange, multiple],
  );

  // Convert single value to array for internal handling
  const internalValue = React.useMemo(() => {
    if (value === undefined || value === null || value === "") return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  return (
    <Field
      mt={4}
      label={hidden ? undefined : label}
      helperText={helperText}
      invalid={invalid}
      errorText={error?.message}
    >
      <Select.Root
        collection={collection}
        value={internalValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        readOnly={readOnly}
        multiple={multiple}
        size={size}
        positioning={{ sameWidth: true }}
        css={styles.root}
      >
        <Select.HiddenSelect />
        <Select.Control css={styles.control}>
          <Select.Trigger css={styles.trigger}>
            <Select.ValueText
              placeholder={placeholder}
              css={styles.valueText}
            />
          </Select.Trigger>
          <Select.IndicatorGroup css={styles.indicatorGroup}>
            <Select.Indicator css={styles.indicator} />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content css={styles.content}>
            {collection.items.map((item) => (
              <Select.Item key={item.value} item={item} css={styles.item}>
                {item.label}
                <Select.ItemIndicator css={styles.itemIndicator} />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Field>
  );
};
