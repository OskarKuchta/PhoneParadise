import React, { ReactNode, useState, useEffect } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      const { error } = event;
      console.error("Error caught by ErrorBoundary:", error);

      setHasError(true);
      setError(error);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <main className="h-[60vh] flex justify-center items-center text-center">
        Error occurred: {error ? error.toString() : "Unknown error"}
      </main>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
