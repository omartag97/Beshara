import React, { ReactElement } from "react";
import { HomeIcon, Wifi } from "lucide-react";
import { SimulationContent } from "./SimulationContent";
import { MiniNavabr } from "./MiniNavabr";

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
    Component: MiniNavabr,
  },
  {
    id: 2,
    label: "User",
    title: React.createElement(Wifi, {
      className: "h-5 w-5 text-accent-foreground",
    }),
    tooltip: "Simulate mutation requests",
    Component: SimulationContent,
  },
];

export const SCROLL_THRESHOLD = 300;

export const TOOLBAR_TRANSITION = {
  type: "spring",
  bounce: 0.2,
  duration: 0.5,
} as const;
