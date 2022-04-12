import {defineStore} from 'pinia';
import {state} from './modules/state';
import {getters} from './modules/getters';
import {actions} from "./modules/actions";

export default defineStore({
  id: "main",
  state: state,
  getters: {
    ...getters()
  },
  actions: {
    ...actions()
  },
});
