import { Field } from "@/components/ui/field";
import { Input, InputProps, useSlotRecipe } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends Omit<InputProps, "size"> {
  name: string;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg";
  visual?: "simple" | "simple-table";
}

const FormInput = ({
  label,
  name,
  placeholder,
  type,
  hidden,
  size = "md",
  visual = "simple",
  ...rest
}: FormInputProps) => {
  const { register } = useFormContext();
  const recipe = useSlotRecipe({ key: "input" });
  const styles = recipe({ size, visual });

  return (
    <Field label={hidden ? undefined : label}>
      <Input
        {...register(name)}
        placeholder={placeholder}
        type={type}
        hidden={hidden}
        unstyled
        className="rengo-input"
        css={styles.control}
        data-size={size}
        data-visual={visual}
        {...rest}
      />
    </Field>
  );
};

export default FormInput;
