import {
  type HTMLChakraProps,
  type RecipeProps,
  createRecipeContext,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export interface LinkButtonProps
  extends Omit<HTMLChakraProps<"a", RecipeProps<"button">>, "variant"> {}

const { withContext } = createRecipeContext({
  key: "button",
});

const BaseLinkButton = withContext<
  HTMLAnchorElement,
  HTMLChakraProps<"a", RecipeProps<"button">>
>("a");

// Replace "a" with your framework's link component
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (props, ref) => <BaseLinkButton {...props} variant="link" ref={ref} />,
);
