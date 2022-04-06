import create from "zustand";
import { devtools } from "zustand/middleware";

let user = (set) => ({
  isLogged: false,
  login: () => set(() => ({ isLogged: true })),
  logout: () => set(() => ({ isLogged: false })),

  CommunicationKey: "",
  setCommunicationKey: (param) => set(() => ({ CommunicationKey: param })),

  uuid: "",
  setUuid: (param) => set(() => ({ uuid: param })),
});
user = devtools(user);
export const userStore = create(user);
