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
import { defineComponent } from "vue";
import item from "@/components/item.vue";
import { ITEM } from "@/store/store.interface";
import { useStore } from "vuex";
import { key } from "@/store/store";

export default defineComponent({
  name: "item-list",
  setup() {
    const store = useStore(key);

    return {
      store,
      allTodoList: () => store.getters[`allTodoList`],
      activeTodoList: () => store.getters[`activeTodoList`],
      clearTodoList: () => store.getters[`clearTodoList`],
    };
  },
  data() {
    return {
      renderList: [] as ITEM[],
    };
  },
  created() {
    (this.renderList = this.allTodoList()),
      this.$watch(
        () => this.$route.params.status,
        (toParams: "active" | "clear") => {
          this.initRenderList(toParams);
        }
      );
    this.$watch(
      () => this.store.state.todoList,
      // eslint-disable-next-line
      () => {
        console.log("watched");
      }
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
