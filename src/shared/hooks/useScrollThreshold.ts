import { useState } from "react";

import { useMotionValueEvent, useScroll } from "motion/react";

import { SCROLL_THRESHOLD } from "../components/motion/Toolbar/toolbarConfig";

const useScrollThreshold = () => {
  const { scrollY } = useScroll();
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] =
    useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolledPastThreshold(latest >= SCROLL_THRESHOLD);
  });

  return hasScrolledPastThreshold;
};

export default useScrollThreshold;
