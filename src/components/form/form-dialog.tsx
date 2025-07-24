import { FormCancelButton } from "@/components/button/form-cancel-button";
import { FormSubmitButton } from "@/components/button/form-submit-button";
import { Form, FormProps } from "@/components/form/form";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { HStack, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FieldValues } from "react-hook-form";

export interface FormDialogProps<T extends FieldValues, R> {
  title: string;
  subtitle?: string;
  formProps: FormProps<T, R>;
  bodyProps?: Record<string, string | boolean | number>;
  open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
}

export const FormDialog = <T extends FieldValues, R>({
  title,
  subtitle,
  formProps,
  bodyProps,
  children,
  open,
  onClose,
}: React.PropsWithChildren<FormDialogProps<T, R>>) => {
  const initialFocusRef = React.useRef<HTMLInputElement>(null);

  const onSuccess = async (data: R, values: T) => {
    formProps.onSuccess?.(data, values);
    onClose();
  };

  return (
    <DialogRoot open={open} onOpenChange={(e) => !e.open && onClose()}>
      <FormDialogContext.Provider value={{ initialFocusRef }}>
        <DialogContent ref={initialFocusRef}>
          <Form {...formProps} onSuccess={onSuccess}>
            <DialogHeader>
              <DialogTitle>
                <VStack gap={2} align="stretch">
                  <Text variant="h3">{title}</Text>
                  {!!subtitle && <Text variant="body">{subtitle}</Text>}
                </VStack>
              </DialogTitle>
              <DialogCloseTrigger />
            </DialogHeader>
            <DialogBody {...bodyProps}>{children}</DialogBody>
            <DialogFooter justifyContent="space-between">
              <HStack gap={2} w="100%">
                <DialogActionTrigger asChild>
                  <FormCancelButton flex={1} onClick={onClose} />
                </DialogActionTrigger>
                <FormSubmitButton flex={1}>Save</FormSubmitButton>
              </HStack>
            </DialogFooter>
          </Form>
        </DialogContent>
      </FormDialogContext.Provider>
    </DialogRoot>
  );
};

const FormDialogContext = React.createContext<{
  initialFocusRef: React.RefObject<HTMLInputElement> | null;
}>({
  initialFocusRef: null,
});

export const useFormDialogInitialFocusRef = () => {
  const { initialFocusRef } = useContext(FormDialogContext);
  return initialFocusRef;
};
