import { create } from "zustand";

interface PrferenceStoreType {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOpen:(value:boolean)=>void;
  selectedPreference: PrferenceType | null;
  setSelectedPreference: (prf: PrferenceType) => void;
}

export const usePreferenceStore = create<PrferenceStoreType>((set) => ({
  selectedPreference: null,
  setSelectedPreference: (prf) => set({ selectedPreference: prf }),
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false,selectedPreference:null }),
  setOpen:(value)=>set({open:value,selectedPreference:null})
}));
