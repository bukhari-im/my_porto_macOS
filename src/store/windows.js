import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { INITIAL_Z_INDEX, WINDOWS_CONFIG } from '../constant/navbar';

const useWindowsStore = create(
  immer((set) => ({
    windows: WINDOWS_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;

        state.nextZIndex++;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        win.zIndex = state.nextZIndex++;
      }),
  }))
);

export default useWindowsStore;