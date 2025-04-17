import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

import useClickOutside from "@/shared/hooks/useClickOutside";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/Tooltip";

import Typography from "../../ui/Typography";

import { TOOLBAR_ITEMS, TOOLBAR_TRANSITION } from "./toolbarConfig";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../ui/Select";

import { useGetCategoriesQuery } from "@/redux/services/products";
import { parseAsString, useQueryState } from "nuqs";

import { Filter } from "lucide-react";

import useScrollThreshold from "@/shared/hooks/useScrollThreshold";

export default function Toolbar() {
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const [toolbarItemsRef, { width: toolbarItemsWidth }] = useMeasure();

  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsString
      .withOptions({
        history: "replace",
      })
      .withDefault(""),
  );

  const { data: categories = [] } = useGetCategoriesQuery();

  const hasScrolledPastThreshold = useScrollThreshold();

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;
    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  const formatCategory = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const modifiedCategories = useMemo(
    () => ["all", ...categories],
    [categories],
  );

  return (
    <MotionConfig transition={TOOLBAR_TRANSITION}>
      <motion.div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          className="bg-primary-foreground h-full w-full rounded-xl"
          animate={{
            width: isOpen
              ? 300
              : toolbarItemsWidth + (hasScrolledPastThreshold ? 59 : 24),
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          ref={ref}
        >
          {hasScrolledPastThreshold && (
            <>
              <div className="overflow-hidden">
                <AnimatePresence initial={false} mode="sync">
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0 }}
                      animate={{ height: heightContent || 0 }}
                      exit={{ height: 0 }}
                    >
                      <div ref={contentRef} className="p-2">
                        {TOOLBAR_ITEMS.map((item) => {
                          const isSelected = active === item.id;
                          const ItemComponent = item.Component;

                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isSelected ? 1 : 0 }}
                              exit={{ opacity: 0 }}
                              className={cn(
                                "px-2 pt-2 text-sm",
                                isSelected ? "block" : "hidden",
                              )}
                            >
                              {isSelected && (
                                <ItemComponent
                                  onClose={() => {
                                    setIsOpen(false);
                                    setActive(null);
                                  }}
                                />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-center space-x-2 p-2" ref={menuRef}>
                <div ref={toolbarItemsRef} className="flex space-x-2">
                  {TOOLBAR_ITEMS.map((item) => (
                    <TooltipProvider key={item.id}>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <button
                            aria-label={item.label}
                            className={cn(
                              "relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-200 hover:text-zinc-500 hover:dark:bg-zinc-600 hover:dark:text-zinc-800",
                              active === item.id
                                ? "bg-zinc-300 text-zinc-200 dark:bg-zinc-500 dark:text-zinc-800"
                                : "",
                            )}
                            type="button"
                            onClick={() => {
                              if (!isOpen) setIsOpen(true);
                              setActive(active === item.id ? null : item.id);
                              if (active === item.id) setIsOpen(false);
                            }}
                          >
                            {item.title}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-accent rounded-lg p-2">
                          <Typography
                            variant="subtitle2"
                            color="accent-foreground"
                          >
                            {item.tooltip}
                          </Typography>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>

                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 35, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div>
                      <Select
                        value={activeCategory || ""}
                        onValueChange={(value) => setActiveCategory(value)}
                      >
                        <SelectTrigger withIcon={false} className="w-full">
                          <Filter size={20} className="text-gray-500" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {modifiedCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {formatCategory(category)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
