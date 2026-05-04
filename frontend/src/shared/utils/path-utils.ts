export const extractPathParams = (path: string) =>
  path.match(/:(\w+)/g)?.map((param) => param.slice(1)) ?? [];
