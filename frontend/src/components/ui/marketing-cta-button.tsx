import {
  ButtonArrowLabel,
  ctaButtonHoverProps,
  ctaButtonHoverWithArrowProps,
} from "@/components/ui/button-arrow-label";
import { Button } from "@chakra-ui/react";
import React from "react";

type MarketingCtaSize = "sm" | "md";

const SIZE: Record<
  MarketingCtaSize,
  {
    px: number | string;
    py: number | string;
    h: string;
    minH?: string;
    lineHeight: string;
    iconSize: number;
  }
> = {
  md: {
    px: 8,
    py: 3.5,
    h: "auto",
    lineHeight: "21px",
    iconSize: 12,
  },
  sm: {
    px: "14px",
    py: "8px",
    h: "34px",
    minH: "34px",
    lineHeight: "16px",
    iconSize: 11,
  },
};

interface MarketingCtaButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  size?: MarketingCtaSize;
  showArrow?: boolean;
}

export const MarketingCtaButton: React.FC<MarketingCtaButtonProps> = ({
  children,
  onClick,
  size = "md",
  showArrow = true,
}) => {
  const s = SIZE[size];

  return (
    <Button
      bg="indigo.900"
      color="slate.10"
      px={s.px}
      py={s.py}
      h={s.h}
      minH={s.minH}
      fontFamily="body"
      fontSize="14px"
      fontWeight="light"
      lineHeight={s.lineHeight}
      onClick={onClick}
      {...(showArrow ? ctaButtonHoverWithArrowProps : ctaButtonHoverProps)}
    >
      {showArrow ? (
        <ButtonArrowLabel iconSize={s.iconSize}>{children}</ButtonArrowLabel>
      ) : (
        children
      )}
    </Button>
  );
};
