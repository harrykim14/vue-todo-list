import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { STATE, ITEM } from "@/store/store.interface";
import AxiosService from "../../service/axios.service";
import { AxiosResponse } from "axios";

// define injection key
export const key: InjectionKey<Store<STATE>> = Symbol();

export const store = createStore<STATE>({
  state: {
    todoList: [] as ITEM[],
  },
  mutations: {
    // TODO added
    addItem(state, item: ITEM) {
      state.todoList.push(item);
    },
    // TODO changed status
    changeStatus(
      state,
      { id, status }: { id: number; status: "active" | "clear" }
    ) {
      state.todoList[id].status = status;
    },
    // TODO deleted
    removeItem(state, id: number) {
      state.todoList.splice(
        state.todoList.findIndex((item) => item.id === id),
        1
      );
    },
    setTodoList(state, todoList: ITEM[]) {
      state.todoList = todoList;
    },
  },
  // 비동기나 통신을 담당하는 것은 action
  actions: {
    async initData({ commit }) {
      // TODO http 통신
      const response: AxiosResponse<{
        todoList: ITEM[];
      }> = await AxiosService.instance.get("/data.json");
      commit("setTodoList", response.data.todoList);
    },
  },
  modules: {},
  getters: {
    allTodoList: (state) => state.todoList,
    activeTodoList: (state) =>
      state.todoList.filter((item: ITEM) => item.status === "active"),
    clearTodoList: (state) =>
      state.todoList.filter((item: ITEM) => item.status === "clear"),
  },
});
