import { create } from 'zustand';
import { createUsersSlice } from './users';

const useAppStore = create((set) => ({
  version: 0.1,
  setVersion: (version) => set({ version }),
  ...createUsersSlice(set),
}))

export default useAppStore;