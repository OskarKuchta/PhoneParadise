import React, { ReactNode, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ErrorBoundaryProps {
  children: ReactNode;
  error?: Error;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, error }) => {
  const [hasError, setHasError] = useState(false);
  const [boundaryError, setBoundaryError] = useState<Error | null>(null);
  const { t } = useTranslation();
  const translatedError = boundaryError
    ? boundaryError.toString()
    : t("unknownError");

  useEffect(() => {
    if (error) {
      setHasError(true);
      setBoundaryError(error);
    } else {
      const errorHandler = (event: ErrorEvent) => {
        const { error } = event;
        setHasError(true);
        setBoundaryError(error);
      };
      window.addEventListener("error", errorHandler);

      return () => {
        window.removeEventListener("error", errorHandler);
      };
    }
  }, [error]);

  if (hasError) {
    return (
      <main className="h-[60vh] flex justify-center items-center text-center">
        {t("errorOccurred")} {translatedError}
      </main>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
