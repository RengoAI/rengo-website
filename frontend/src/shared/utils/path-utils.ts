/**
 * Cleans a path of trailing /* or trailing /
 * @param path - The path to clean.
 * @returns The cleaned path.
 */
export const cleanPath = (path: string) =>
  path.replace(/\/\*$/, "").replace(/\/$/, "");

/**
 * Extracts the path parameters from a path.
 * @param path - The path to extract the parameters from.
 * @returns The path parameters.
 */
export const extractPathParams = (path: string) =>
  path.match(/:(\w+)/g)?.map((param) => param.slice(1)) ?? [];

/**
 * Updates the pageTitle of a handle.
 * @param handle - The handle to update.
 * @param pageTitle - The pageTitle to update the handle with.
 */
export const updateHandlePageTitle = (handle: Handle, pageTitle: string) => {
  if (handle) {
    handle.pageTitle = pageTitle;
  }
};
