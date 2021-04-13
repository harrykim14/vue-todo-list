import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { STATE, ITEM } from "@/store/store.interface";

// define injection key
export const key: InjectionKey<Store<STATE>> = Symbol();

export const store = createStore<STATE>({
  state: {
    todoList: [
      { id: 0, title: "test1", status: "active" },
      { id: 1, title: "test2", status: "active" },
      { id: 2, title: "test3", status: "clear" },
    ] as ITEM[],
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
  },
  actions: {},
  modules: {},
  getters: {
    allTodoList: (state) => state.todoList,
    activeTodoList: (state) =>
      state.todoList.filter((item: ITEM) => item.status === "active"),
    clearTodoList: (state) =>
      state.todoList.filter((item: ITEM) => item.status === "clear"),
  },
});
