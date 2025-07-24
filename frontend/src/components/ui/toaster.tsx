import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
  useSlotRecipe,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  const toastStyles = useSlotRecipe({ key: "toast" });

  // Map toast type to status for our slot recipe
  const getToastStatus = (type: string) => {
    switch (type) {
      case "success":
        return "success" as const;
      case "error":
        return "error" as const;
      case "warning":
        return "warning" as const;
      case "loading":
        return "loading" as const;
      default:
        return "info" as const;
    }
  };

  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => {
          const toastType = toast.type || "info";
          const status = getToastStatus(toastType);
          const styles = toastStyles({
            status,
            size: "md",
            variant: "solid",
            dismissible: toast.meta?.closable !== false,
          });

          return (
            <Toast.Root width={{ md: "sm" }} css={styles.root}>
              {toastType === "loading" ? (
                <Spinner size="sm" css={styles.indicator} />
              ) : (
                <Toast.Indicator css={styles.indicator} />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && (
                  <Toast.Title css={styles.title}>{toast.title}</Toast.Title>
                )}
                {toast.description && (
                  <Toast.Description css={styles.description}>
                    {toast.description}
                  </Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger css={styles.actionTrigger}>
                  {toast.action.label}
                </Toast.ActionTrigger>
              )}
              {toast.meta?.closable && (
                <Toast.CloseTrigger css={styles.closeTrigger} />
              )}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};
