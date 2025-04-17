export const NAVBAR_ANIMATION = {
  initial: { y: 0, opacity: 0 },
  animate: {
    down: { y: -100, opacity: 0 },
    up: { y: 0, opacity: 1 },
  },
  transition: {
    y: { duration: 0.5, delay: 0.2, ease: [0.34, 2, 0.6, 1] },
    opacity: { duration: 0.5, delay: 0.2, ease: [0.34, 2, 0.6, 1] },
  },
} as const;

export const BACK_BUTTON_ANIMATION = {
  initial: { x: -50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
  exit: {
    x: -30,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
} as const;
