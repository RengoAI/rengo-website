import React from "react";

export interface FormStateContextValue {
  isDisabled: boolean | undefined;
}

export const FormStateContext = React.createContext<FormStateContextValue>({
  isDisabled: undefined,
});

export const FormStateProvider: React.FC<
  React.PropsWithChildren<FormStateContextValue>
> = ({ children, ...props }) => (
  <FormStateContext.Provider value={props}>
    {children}
  </FormStateContext.Provider>
);

export const useIsFormDisabled = () =>
  React.useContext(FormStateContext).isDisabled;
