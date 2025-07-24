export const camelToSnake = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // insert _ between lowercase/number and uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2") // handle cases like "JSONFile" -> "JSON_File"
    .toLowerCase();

export const spaceToSnake = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\s+/g, "_") // replace one or more spaces with underscore
    .replace(/[^a-z0-9_]/g, "_") // replace any non-alphanumeric characters (except underscores) with underscore
    .replace(/_+/g, "_") // replace multiple consecutive underscores with single underscore
    .replace(/^_|_$/g, ""); // remove leading and trailing underscores

export const camelToTitleCase = (str: string): string => {
  const spaced = str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  const words = spaced.split(" ").map((word) => word.toLowerCase());
  if (words.length === 0) return "";
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
};
