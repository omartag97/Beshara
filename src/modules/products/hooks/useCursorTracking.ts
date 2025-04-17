import { useRef, useState } from "react";

export function useCursorTracking() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const handlePositionChange = (x: number, y: number) => {
    let isHoveringAny = false;
    elementRefs.current.forEach((element, id) => {
      const rect = element.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        setHoveredId(id);
        isHoveringAny = true;
      }
    });

    if (!isHoveringAny) {
      setHoveredId(null);
    }
  };

  const registerElement = (id: string, element: HTMLElement | null) => {
    if (element) {
      elementRefs.current.set(id, element);
    } else {
      elementRefs.current.delete(id);
    }
  };

  return {
    hoveredId,
    registerElement,
    handlePositionChange,
  };
}
