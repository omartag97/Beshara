import React, { ReactElement } from "react";
import { HomeIcon } from "lucide-react";
import { SimulationContent } from "./SimulationContent";

interface ToolbarItem {
  id: number;
  label: string;
  title: ReactElement;
  tooltip: string;
  Component: React.ComponentType<{ onClose: () => void }>;
}

export const TOOLBAR_ITEMS: ToolbarItem[] = [
  {
    id: 1,
    label: "Home",
    title: React.createElement(HomeIcon, {
      className: "h-5 w-5 text-accent-foreground",
    }),
    tooltip: "Pages",
    Component: SimulationContent,
  },
];

export const SCROLL_THRESHOLD = 300;

export const TOOLBAR_TRANSITION = {
  type: "spring",
  bounce: 0.2,
  duration: 0.5,
} as const;
