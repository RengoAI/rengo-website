import { Field } from "@/components/ui/field";
import {
  Combobox,
  Highlight,
  Spinner,
  useComboboxContext,
  useListCollection,
  useSlotRecipe,
} from "@chakra-ui/react";
import { debounce } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FormComboboxInputProps {
  label: string;
  name: string;
  items: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  readOnly?: boolean;
  multiple?: boolean;
  helperText?: string;
  hidden?: boolean;
  emptyMessage?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  onFilter?: (query: string) => void;
  clearable?: boolean;
}

const ComboboxItem: React.FC<ComboboxOption & { styles?: any }> = ({
  styles,
  ...item
}) => {
  const combobox = useComboboxContext();
  return (
    <Combobox.Item key={item.value} item={item} css={styles?.item}>
      <Combobox.ItemText css={styles?.itemText}>
        <Highlight
          ignoreCase
          query={combobox.inputValue}
          styles={{
            bg: "primary.100",
            fontWeight: "medium",
          }}
        >
          {item.label}
        </Highlight>
      </Combobox.ItemText>
      <Combobox.ItemIndicator css={styles?.itemIndicator} />
    </Combobox.Item>
  );
};

export const FormComboboxInput = ({
  label,
  name,
  items,
  placeholder = "Search and select...",
  searchPlaceholder,
  size = "md",
  disabled = false,
  readOnly = false,
  multiple = false,
  helperText,
  hidden,
  emptyMessage = "No items found",
  isLoading = false,
  loadingMessage = "Loading...",
  onFilter,
  clearable = true,
}: FormComboboxInputProps) => {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const recipe = useSlotRecipe({ key: "combobox" });
  const styles = recipe({ size });

  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  // Create collection for Chakra UI
  const { collection, filter, set } = useListCollection({
    initialItems: items,
    filter: (itemText: string, filterText: string) => {
      // If no query, show all items
      if (!filterText || filterText.trim() === "") return true;
      // Custom contains logic - check if the item text contains the filter text (case insensitive)
      return itemText.toLowerCase().includes(filterText.toLowerCase());
    },
    itemToString: (item: ComboboxOption) => item.label,
    itemToValue: (item: ComboboxOption) => item.value,
    isItemDisabled: (item: ComboboxOption) => !!item.disabled,
  });

  // Force rerender when items change
  useEffect(() => {
    set(items);
  }, [items, set]);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (onFilter) {
          onFilter(query);
        }
      }, 300),
    [onFilter],
  );

  // Handle input value changes
  const handleInputValueChange = (details: { inputValue: string }) => {
    setIsUserTyping(true);
    setInputValue(details.inputValue);
    filter(details.inputValue);
    debouncedSearch(details.inputValue);
  };

  // Handle value changes
  const handleValueChange = (details: { value: string[] }) => {
    setIsUserTyping(false); // Reset typing flag when selection is made
    if (multiple) {
      onChange(details.value);
    } else {
      onChange(details.value[0] || "");
    }
  };

  // Convert form value to array for Chakra UI
  const comboboxValue = useMemo(() => {
    if (value === undefined || value === null || value === "") return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  // Set inputValue to display the label of the selected value for single selection
  useEffect(() => {
    if (isUserTyping) return; // Don't override while user is typing

    if (!multiple && comboboxValue.length > 0) {
      const selectedOption = items.find(
        (option) => option.value === comboboxValue[0],
      );
      if (selectedOption) {
        setInputValue(selectedOption.label);
      }
    } else if (comboboxValue.length === 0) {
      setInputValue("");
    }
  }, [comboboxValue, multiple, isUserTyping, items]);

  if (hidden) {
    return null;
  }

  return (
    <Field
      label={label}
      helperText={helperText}
      invalid={invalid}
      errorText={error?.message}
    >
      <Combobox.Root
        collection={collection}
        value={comboboxValue}
        inputValue={inputValue}
        onValueChange={handleValueChange}
        onInputValueChange={handleInputValueChange}
        multiple={multiple}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        invalid={invalid}
        placeholder={placeholder}
        closeOnSelect={!multiple}
        css={styles.root}
        openOnClick
      >
        <Combobox.Control css={styles.control}>
          <Combobox.Input
            css={styles.input}
            placeholder={
              inputValue || !comboboxValue.length
                ? searchPlaceholder || placeholder
                : undefined
            }
          />
          <Combobox.IndicatorGroup css={styles.indicatorGroup}>
            {clearable && comboboxValue.length > 0 && (
              <Combobox.ClearTrigger css={styles.clearTrigger} />
            )}
            <Combobox.Trigger css={styles.trigger} />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        <Combobox.Positioner css={styles.positioner}>
          <Combobox.Content css={styles.content}>
            {isLoading ? (
              <Combobox.Empty css={styles.empty}>
                <Spinner size="xs" borderWidth="1px" />
                {loadingMessage}
              </Combobox.Empty>
            ) : (
              <>
                <Combobox.Empty css={styles.empty}>
                  {emptyMessage}
                </Combobox.Empty>
                {/* Render flat items */}
                {collection.items.map((item: ComboboxOption) => (
                  <ComboboxItem key={item.value} styles={styles} {...item} />
                ))}
              </>
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
    </Field>
  );
};
