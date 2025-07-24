import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const useRequiredStringParams = (): { [key: string]: string } => {
  const params = useParams();
  return useMemo(
    () =>
      new Proxy(params ?? {}, {
        get: (_, prop) => {
          if (typeof prop !== "string") {
            return undefined;
          }
          if (!params) {
            throw new Error("Params are undefined");
          }
          const value = params[prop as keyof typeof params];
          if (!value) {
            throw new Error(`Required param ${prop} is undefined`);
          }
          return value;
        },
      }) as { [key: string]: string },
    [params],
  );
};
