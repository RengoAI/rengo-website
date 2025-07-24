import { useEffectEvent } from "@react-aria/utils";
import { EffectCallback, useEffect, useRef } from "react";

export const useEffectOnce = (fn: EffectCallback) => {
  const onMount = useEffectEvent(fn);
  // this is here to deal with strict mode running everything twice
  const didRunRef = useRef(false);
  useEffect(() => {
    if (didRunRef.current) {
      return;
    }
    didRunRef.current = true;
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
