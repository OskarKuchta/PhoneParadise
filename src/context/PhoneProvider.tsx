import { createContext, useContext, useState, useEffect } from "react";
import { isPhone } from "../Types/Types";

const PhoneContext = createContext<isPhone | undefined>(undefined);

export const PhoneProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isPhoneState, setIsPhoneState] = useState<boolean>(
    window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setIsPhoneState(newWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const contextValue: isPhone = {
    windowWidth,
    isPhone: isPhoneState,
    setIsPhone: setIsPhoneState,
  };

  return (
    <PhoneContext.Provider value={contextValue}>
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhoneContext = () => {
  const context: isPhone = useContext(PhoneContext);

  if (!context) {
    throw new Error("usePhoneContext must be used within a PhoneProvider");
  }

  return context;
};
