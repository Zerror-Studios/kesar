import { create } from "zustand";

export const useModalStore = create((set) => ({
  isRequestOpen: false,
  requestedProduct: null,
  openRequest: (product = null) =>
    set({ isRequestOpen: true, requestedProduct: product }),
  closeRequest: () => set({ isRequestOpen: false, requestedProduct: null }),
}));
