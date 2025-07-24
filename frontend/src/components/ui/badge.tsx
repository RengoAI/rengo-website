import {
  type HTMLChakraProps,
  type RecipeProps,
  createRecipeContext,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export interface BadgeProps
  extends HTMLChakraProps<"span", RecipeProps<"badge">> {}

const { withContext } = createRecipeContext({
  key: "badge",
});

const BaseBadge = withContext<
  HTMLSpanElement,
  HTMLChakraProps<"span", RecipeProps<"badge">>
>("span");

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    return <BaseBadge {...props} ref={ref} />;
  },
);
