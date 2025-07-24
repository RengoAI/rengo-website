import { toaster } from "@/components/ui/toaster";
import log from "loglevel";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { FormStateProvider } from "./form-state-provider";

export interface FormProps<T extends FieldValues, R> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<R>;
  onSuccess?: (data: R, values: T) => void | Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  isDisabled?: boolean;
}

export const Form = <T extends FieldValues, R>({
  form,
  onSubmit,
  onSuccess,
  children,
  successMessage,
  errorMessage,
  isDisabled,
}: React.PropsWithChildren<FormProps<T, R>>) => {
  const { isSubmitting } = form.formState;

  const handleSubmit = async (data: T) => {
    try {
      const result = await onSubmit(data);
      if (successMessage) {
        toaster.success({
          title: successMessage,
        });
      }
      await onSuccess?.(result, data);
    } catch (error) {
      log.error(error);
      if (errorMessage) {
        toaster.error({
          title: errorMessage,
        });
      }
    }
  };

  return (
    <FormProvider<T> {...form}>
      <FormStateProvider isDisabled={isDisabled || isSubmitting}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>{children}</form>
      </FormStateProvider>
    </FormProvider>
  );
};
