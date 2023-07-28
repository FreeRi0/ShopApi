import { defineStore } from "pinia";

export const useUser = defineStore("counter", {
  state: () => ({
    authenticated: false
  }),

  actions: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) => state.authenticated = auth
  },
});