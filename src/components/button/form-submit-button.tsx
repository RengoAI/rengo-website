import { useIsFormDisabled } from "@/components/form/form-state-provider";
import { type ButtonProps, Button } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

export type SubmitButtonProps = Omit<ButtonProps, "type">;

export const FormSubmitButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<SubmitButtonProps>
>(({ children, loading, disabled, ...props }, ref) => {
  const isFormDisabled = useIsFormDisabled() || disabled;
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const childrenOrDefault = children ?? "Save";
  return (
    <Button
      ref={ref}
      {...props}
      type="submit"
      loading={isSubmitting || loading}
      disabled={isFormDisabled || disabled}
    >
      {childrenOrDefault}
    </Button>
  );
});
