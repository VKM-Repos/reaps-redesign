import React, { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // Optionally, log the error to an external service
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary text-white">
          <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
          <p className="text-lg mb-8">
            {this.state.error?.message ||
              "An unexpected error occurred. Please try again later."}
          </p>
          <div className="flex gap-4">
            <Button
              variant="default"
              onClick={() => (window.location.href = "/")}
            >
              Go to Home
            </Button>
            <Button variant="secondary" onClick={this.handleRetry}>
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
