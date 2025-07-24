import { RecipeDefinition } from "@chakra-ui/react";
import { badgeRecipe } from "./recipes/badge";
import { buttonRecipe } from "./recipes/button";
import { textRecipe } from "./recipes/text";

export const recipes: Record<string, RecipeDefinition> = {
  badge: badgeRecipe,
  button: buttonRecipe,
  text: textRecipe,
};
