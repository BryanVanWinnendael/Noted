import { create } from "zustand";

type SlashStoreType = {
  slashOpen: boolean;
  setSlashOpen: (open: boolean) => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
};

export const useSlashStore = create<SlashStoreType>((set) => ({
  slashOpen: false,
  setSlashOpen: (open) => set({ slashOpen: open }),
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
}));
