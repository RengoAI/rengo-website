import { radioCardRecipe } from "@/theme/slot-recipes/radio-card";
import { tabsRecipe } from "@/theme/slot-recipes/tabs";
import { SlotRecipeDefinition } from "@chakra-ui/react";
import { alertRecipe } from "./slot-recipes/alert";
import { cardRecipe } from "./slot-recipes/card";
import { checkboxSlotRecipe } from "./slot-recipes/checkbox";
import { comboboxSlotRecipe } from "./slot-recipes/combobox";
import { drawerRecipe } from "./slot-recipes/drawer";
import { inputSlotRecipe } from "./slot-recipes/input";
import { progressRecipe } from "./slot-recipes/progress";
import { selectSlotRecipe } from "./slot-recipes/select";
import { toastRecipe } from "./slot-recipes/toast";
import { tooltipRecipe } from "./slot-recipes/tooltip";

export const slotRecipes: Record<string, SlotRecipeDefinition> = {
  card: cardRecipe,
  drawer: drawerRecipe,
  alert: alertRecipe,
  tabs: tabsRecipe,
  input: inputSlotRecipe,
  progress: progressRecipe,
  radioCard: radioCardRecipe,
  select: selectSlotRecipe,
  combobox: comboboxSlotRecipe,
  toast: toastRecipe,
  tooltip: tooltipRecipe,
  checkbox: checkboxSlotRecipe,
};
