import { prefersReducedMotion } from "@/shared/utils/motion";
import { Box, VisuallyHidden } from "@chakra-ui/react";
import React from "react";

/** Typing: ms before the first letter, per letter, and random extra. */
const TYPE_START = 300;
const TYPE_STEP = 45;
const TYPE_JITTER = 40;

/**
 * Text typed in one character at a time, the blue underscore leading each
 * one in and coming to rest at the end. The untyped rest is laid out but
 * hidden, so the line holds its final width from the start. Screen readers
 * get the whole text at once; reduced motion gets it already typed.
 */
export const TypedText: React.FC<{ text: string }> = ({ text }) => {
  const [typed, setTyped] = React.useState(() =>
    prefersReducedMotion() ? text.length : 0,
  );

  React.useEffect(() => {
    if (typed >= text.length) return;
    const delay =
      typed === 0 ? TYPE_START : TYPE_STEP + Math.random() * TYPE_JITTER;
    const id = window.setTimeout(() => setTyped((n) => n + 1), delay);
    return () => window.clearTimeout(id);
  }, [typed, text.length]);

  return (
    <>
      <VisuallyHidden>{text}</VisuallyHidden>
      <span aria-hidden>
        {text.slice(0, typed)}
        <Box as="span" color="site.highlight">
          _
        </Box>
        <span style={{ visibility: "hidden" }}>{text.slice(typed)}</span>
      </span>
    </>
  );
};
