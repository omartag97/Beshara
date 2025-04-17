import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "../../ui/Typography";
import { BACK_BUTTON_ANIMATION } from "../../../../constants/navbar";

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isNestedRoute = location.pathname.split("/").filter(Boolean).length > 1;

  return (
    <AnimatePresence initial={false}>
      {isNestedRoute && (
        <motion.div key={location.pathname} {...BACK_BUTTON_ANIMATION}>
          <div
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center transition-colors"
          >
            <ChevronLeft size={15} />
            <Typography variant="body2" color="accent-foreground">
              Back
            </Typography>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
