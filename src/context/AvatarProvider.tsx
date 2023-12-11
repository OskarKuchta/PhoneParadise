import React, {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
} from "react";

interface AvatarContextProps {
  actualColor: string;
  setTempColor: React.Dispatch<React.SetStateAction<string>>;
}

const AvatarContext = createContext<AvatarContextProps | undefined>(undefined);

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider: FC<AvatarProviderProps> = ({ children }) => {
  const [actualColor, setTempColor] = useState<string>("");

  return (
    <AvatarContext.Provider value={{ actualColor, setTempColor }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatarContext must be used within an AvatarProvider");
  }
  return context;
};
