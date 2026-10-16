import { colors } from "@/theme/tokens/colors";

/**
 * Raw palette values for canvas drawing, read from the tokens so the
 * procedural art can't drift from the rest of the page. Canvas can't resolve
 * Chakra tokens, so the hex has to come out here.
 */
export const INK = {
  canvas0: colors.canvas[0].value,
  canvas100: colors.canvas[100].value,
  canvas200: colors.canvas[200].value,
  canvas400: colors.canvas[400].value,
  canvas500: colors.canvas[500].value,
  rengo300: colors.rengo[300].value,
  rengo400: colors.rengo[400].value,
  rengo500: colors.rengo[500].value,
  rengo600: colors.rengo[600].value,
  rengo700: colors.rengo[700].value,
  sky: colors.sky.value,
  silver100: colors.silver[100].value,
  silver200: colors.silver[200].value,
  silver300: colors.silver[300].value,
  silver400: colors.silver[400].value,
  silver500: colors.silver[500].value,
  silver600: colors.silver[600].value,
  silver700: colors.silver[700].value,
  soot200: colors.soot[200].value,
  soot300: colors.soot[300].value,
  soot400: colors.soot[400].value,
  soot500: colors.soot[500].value,
  soot600: colors.soot[600].value,
  soot700: colors.soot[700].value,
  soot800: colors.soot[800].value,
  crimson: colors.crimson.value,
};
