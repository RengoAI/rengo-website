import { Field } from "@/components/ui/field";
import { HStack, RadioCard, VStack } from "@chakra-ui/react";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

export interface RadioCardOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface FormRadioCardInputProps {
  label: string;
  name: string;
  options: RadioCardOption[];
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  readOnly?: boolean;
  helperText?: string;
  hidden?: boolean;
  direction?: "horizontal" | "vertical";
}

export const FormRadioCardInput: React.FC<FormRadioCardInputProps> = ({
  label,
  name,
  options,
  size = "md",
  disabled = false,
  readOnly = false,
  helperText,
  hidden,
  direction = "horizontal",
}) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const handleValueChange = (selectedValue: string) => {
    if (!disabled && !readOnly) {
      onChange(selectedValue);
    }
  };

  if (hidden) {
    return null;
  }

  const Container = direction === "horizontal" ? HStack : VStack;

  return (
    <Field
      mt={4}
      label={label}
      helperText={helperText}
      invalid={invalid}
      errorText={error?.message}
    >
      <RadioCard.Root
        value={value || ""}
        onValueChange={(details) => handleValueChange(details.value || "")}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
      >
        <Container align="stretch" width="100%">
          {options.map((option) => (
            <RadioCard.Item
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemContent>
                  <RadioCard.ItemText>{option.label}</RadioCard.ItemText>
                  {option.description && (
                    <RadioCard.ItemDescription>
                      {option.description}
                    </RadioCard.ItemDescription>
                  )}
                </RadioCard.ItemContent>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </Container>
      </RadioCard.Root>
    </Field>
  );
};
