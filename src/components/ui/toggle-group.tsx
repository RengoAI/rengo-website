import { Button, ButtonGroup, type ButtonProps } from "@chakra-ui/react";
import * as React from "react";

interface ToggleGroupProps {
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  type?: "single" | "multiple";
}

interface ToggleGroupItemProps extends ButtonProps {
  value: string;
}

const ToggleGroupContext = React.createContext<{
  selectedValues: string[];
  onToggle: (value: string) => void;
  type: "single" | "multiple";
}>({
  selectedValues: [],
  onToggle: () => {},
  type: "multiple",
});

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  children,
  value = [],
  onValueChange,
  type = "multiple",
}) => {
  const handleToggle = (itemValue: string) => {
    if (!onValueChange) return;

    if (type === "single") {
      onValueChange([itemValue]);
    } else {
      const newValue = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];
      onValueChange(newValue);
    }
  };

  return (
    <ButtonGroup>
      <ToggleGroupContext.Provider
        value={{
          selectedValues: value,
          onToggle: handleToggle,
          type,
        }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ButtonGroup>
  );
};

export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, children, ...props }, ref) => (
  <Button ref={ref} {...props} className={className}>
    {children}
  </Button>
));

ToggleGroupItem.displayName = "ToggleGroupItem";
