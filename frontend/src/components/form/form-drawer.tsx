import { FormCancelButton } from "@/components/button/form-cancel-button";
import { FormSubmitButton } from "@/components/button/form-submit-button";
import { Form, FormProps } from "@/components/form/form";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FieldValues } from "react-hook-form";

export interface FormDrawerProps<T extends FieldValues, R> {
  title: string;
  subtitle?: string;
  formProps: FormProps<T, R>;
  bodyProps?: Record<string, string | boolean | number>;
  open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
}

export const FormDrawer = <T extends FieldValues, R>({
  title,
  subtitle,
  formProps,
  bodyProps,
  children,
  open,
  onClose,
  size = "sm",
}: React.PropsWithChildren<FormDrawerProps<T, R>>) => {
  const initialFocusRef = React.useRef<HTMLInputElement>(null);

  const onSuccess = async (data: R, values: T) => {
    formProps.onSuccess?.(data, values);
    onClose();
  };

  return (
    <Drawer.Root
      size={size}
      open={open}
      onOpenChange={onClose}
      onEscapeKeyDown={onClose}
      onExitComplete={onClose}
      closeOnEscape={true}
    >
      <Form {...formProps} onSuccess={onSuccess}>
        <FormDrawerContext.Provider value={{ initialFocusRef }}>
          <Drawer.Backdrop background="drawerOverlay" />
          <Drawer.Content ref={initialFocusRef}>
            <Drawer.CloseTrigger />
            <DrawerHeader>
              <Text fontSize="20px" fontWeight="500">
                {title}
              </Text>
              {!!subtitle && (
                <Text fontSize="18px" fontWeight="400">
                  {subtitle}
                </Text>
              )}
            </DrawerHeader>
            <DrawerBody {...bodyProps}>{children}</DrawerBody>
            <DrawerFooter justifyContent="space-between">
              <HStack gap={2} w="100%">
                <FormCancelButton flex={1} onClick={onClose} />
                <FormSubmitButton flex={1}>Save</FormSubmitButton>
              </HStack>
            </DrawerFooter>
          </Drawer.Content>
        </FormDrawerContext.Provider>
      </Form>
    </Drawer.Root>
  );
};

const FormDrawerContext = React.createContext<{
  initialFocusRef: React.RefObject<HTMLInputElement> | null;
}>({
  initialFocusRef: null,
});

export const useFormDrawerInitialFocusRef = () => {
  const { initialFocusRef } = useContext(FormDrawerContext);
  return initialFocusRef;
};
