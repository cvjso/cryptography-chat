import create from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

let user = (set) => ({
  isLogged: false,
  login: () => set(() => ({ isLogged: true })),
  logout: () => set(() => ({ isLogged: false })),

  communicationKey: "",
  setCommunicationKey: (param) => set(() => ({ communicationKey: param })),

  username: "",
  setUsername: (param) => set(() => ({ username: param })),
});

user = persist(user);
user = devtools(user);

export const userStore = create(user);
