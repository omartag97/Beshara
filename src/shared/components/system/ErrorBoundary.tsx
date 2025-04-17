import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "../ui/Button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="animate-fadeIn from-background via-primary dark:via-primary-foreground to-background animate-gradient flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4">
          <h1 className="mb-4 animate-pulse text-3xl font-bold text-white">
            Something went wrong
          </h1>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Back to Home
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
