import { create } from 'zustand'

interface UIStore {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
}

export const useUIStore = create<UIStore>()((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}))
