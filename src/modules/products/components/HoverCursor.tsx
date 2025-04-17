import { AnimatePresence, motion } from "motion/react";
import { Cursor } from "@/shared/components/motion/Cursor";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

interface HoverCursorProps {
  hoveredId: string | null;
  onPositionChange: (x: number, y: number) => void;
}

export const HoverCursor = memo(function HoverCursor({
  hoveredId,
  onPositionChange,
}: HoverCursorProps) {
  return (
    <Cursor
      attachToParent
      variants={{
        initial: { scale: 0.3, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 },
      }}
      springConfig={{ bounce: 0.001 }}
      transition={{ ease: "easeInOut", duration: 0.15 }}
      onPositionChange={onPositionChange}
    >
      <motion.div
        animate={{
          width: hoveredId ? 80 : 16,
          height: hoveredId ? 32 : 16,
        }}
        className="flex items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40"
      >
        <AnimatePresence mode="wait">
          {hoveredId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="inline-flex w-full items-center justify-center"
            >
              <div className="inline-flex items-center text-sm text-white dark:text-black">
                More <PlusIcon className="ml-1 h-4 w-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Cursor>
  );
});
