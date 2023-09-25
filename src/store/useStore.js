import { create } from "zustand";

export const useStore = create((set) => ({
  image: "./Dark.jpg",
  bgcolor: "black",
  setImage: (image) => set({ image }),
  setBgColor: (bgcolor) => set({ bgcolor }),
}));
