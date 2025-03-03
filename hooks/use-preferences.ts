import { create } from "zustand";

interface PreferenceStoreType {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOpen:(value:boolean)=>void;
  selectedPreference: AdminstratorPreferenceType | null;
  setSelectedPreference: (prf: AdminstratorPreferenceType) => void;
}

export const usePreferenceStore = create<PreferenceStoreType>((set) => ({
  selectedPreference: null,
  setSelectedPreference: (prf) => set({ selectedPreference: prf }),
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false,selectedPreference:null }),
  setOpen:(value)=>set({open:value,selectedPreference:null})
}));
