import { useState, useEffect } from "react";

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.scrollY;
      if (currentOffset === 0) {
        setScrollDirection("up");
        return;
      }

      const direction = currentOffset > prevOffset ? "down" : "up";
      if (Math.abs(currentOffset - prevOffset) > 10) {
        setScrollDirection(direction);
      }
      setPrevOffset(currentOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevOffset]);

  return scrollDirection;
};
