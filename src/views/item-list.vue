<template>
  <!--동적인 데이터는 v-bind(:)를 사용해야 함-->
  <div>
    <item
      :key="item.id"
      v-for="item in renderList"
      :id="item.id.toString()"
      :title="item.title"
      :status="item.status"
    ></item>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import item from "@/components/item.vue";
import { ITEM } from "@/store/store.interface";
import { useStore } from "vuex";
import { key } from "@/store/store";

export default defineComponent({
  name: "item-list",
  setup() {
    const store = useStore(key);
    const todoListRef = ref(store.state.todoList);
    let renderList: ITEM[] = [];

    watch([todoListRef, todoListRef.value], () => {
      renderList = store.state.todoList;
    });

    return {
      ref: todoListRef,
      renderList: renderList,
      store: store,
      allTodoList: () => store.getters[`allTodoList`],
      activeTodoList: () => store.getters[`activeTodoList`],
      clearTodoList: () => store.getters[`clearTodoList`],
    };
  },
  data() {
    return {
      status: this.$route.params.status as "active" | "clear",
    };
  },
  created() {
    this.renderList = this.allTodoList();
  },
  // created는 데이터 초기화에 대한 목적, mounted는 DOM 조작에 대한 목적으로 사용할 수 있다.
  mounted() {
    this.$watch(
      () => this.$route.params.status,
      (status: "active" | "clear") => this.initRenderList(status)
    );
    watch(
      () => this.ref.values(),
      () => this.initRenderList(this.status)
    );
  },
  methods: {
    initRenderList(status: "active" | "clear") {
      if (!status) {
        this.renderList = this.allTodoList();
      } else if (status === "active") {
        this.renderList = this.activeTodoList();
      } else if (status === "clear") {
        this.renderList = this.clearTodoList();
      }
    },
  },
  components: {
    item,
  },
});
</script>
