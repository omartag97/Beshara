import {
  useSimulateFailureMutation,
  useSimulateSuccessMutation,
} from "@/redux/services/products";
import { Button } from "../../ui/Button";
import Typography from "../../ui/Typography";

interface SimulationContentProps {
  onClose: () => void;
}

export const SimulationContent = ({ onClose }: SimulationContentProps) => {
  const [simulateSuccess, { isLoading: isLoadingSuccess }] =
    useSimulateSuccessMutation();
  const [simulateFailure, { isLoading: isLoadingFailure }] =
    useSimulateFailureMutation();

  return (
    <div className="flex flex-col space-y-4">
      <Typography variant="body2" color="accent-foreground">
        Handle missing data or API failures
      </Typography>
      <Button
        variant="secondary"
        className="bg-green-600 text-white hover:bg-green-700"
        onClick={async () => {
          await simulateSuccess();
          onClose();
        }}
        disabled={isLoadingSuccess}
      >
        {isLoadingSuccess ? "Processing..." : "Simulate success mutation"}
      </Button>
      <Button
        variant="destructive"
        onClick={async () => {
          await simulateFailure();
          onClose();
        }}
        disabled={isLoadingFailure}
      >
        {isLoadingFailure ? "Processing..." : "Simulate failure mutation"}
      </Button>
    </div>
  );
};
