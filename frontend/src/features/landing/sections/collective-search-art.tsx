import React from "react";

/**
 * "Unlock collective intelligence" bento art.
 * Static SVG — Animation3.svg with the Outlook logo replaced by Copilot.
 * All three logos are embedded as base64 inside the SVG, so it renders
 * correctly without any external requests.
 */

type CollectiveSearchArtProps = {
  variant?: "tile" | "compact";
};

export const CollectiveSearchArt: React.FC<CollectiveSearchArtProps> = () => (
  <img
    src="/animations/animation3.svg"
    alt=""
    aria-hidden
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "block",
    }}
  />
);
