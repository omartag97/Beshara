import makeRoutingList from "@/helpers/makeRoutingList";
import { AnimatedGroup } from "../AnimatedGroup";
import { TextEffect } from "../TextEffect";
import { Button } from "../../ui/Button";
import { useNavigate } from "react-router-dom";

interface SimulationContentProps {
  onClose: () => void;
}

export const SimulationContent = ({ onClose }: SimulationContentProps) => {
  const routes = makeRoutingList();

  const navigate = useNavigate();

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col space-y-4">
      <TextEffect
        preset="fade-in-blur"
        speedReveal={1.1}
        speedSegment={0.3}
        className="text-center text-sm"
      >
        Beshara Store
      </TextEffect>
      <AnimatedGroup
        className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={{
          container: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          },
          item: {
            hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 1.2,
                type: "spring",
                bounce: 0.3,
              },
            },
          },
        }}
      >
        {routes.map(
          (route) =>
            route.show && (
              <Button
                key={route.navLink}
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigateToPage(route.navLink);
                  onClose();
                }}
              >
                {route.navName}
              </Button>
            ),
        )}
      </AnimatedGroup>
    </div>
  );
};
