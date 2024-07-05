import { SlashTypeContext } from "types";
import { createContext, useContext, useState } from "react";

const SlashContext = createContext<SlashTypeContext>({} as SlashTypeContext);

export function useSlash() {
  return useContext(SlashContext);
}

type Props = {
  children: React.ReactNode;
};

export const SlashProvider: React.FC<Props> = ({ children }: Props) => {
  const [slashOpen, setSlashOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const value: SlashTypeContext = {
    slashOpen,
    setSlashOpen,
    position,
    setPosition,
  };

  return (
    <SlashContext.Provider value={value}>{children}</SlashContext.Provider>
  );
};
