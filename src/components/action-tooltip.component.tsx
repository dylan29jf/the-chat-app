"use client";

import { FC, ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

interface Props {
  label: string;
  children: ReactNode;
  side?: Side;
  align?: Align;
}

const ActionTooltip: FC<Props> = ({ children, label, align, side }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default ActionTooltip;
