<template>
  <!--동적인 데이터는 v-bind(:)를 사용해야 함-->
  <div>
    <item
      :key="item.id"
      v-for="item in renderList"
      :id="item.id"
      :title="item.title"
      :status="item.status"
    ></item>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import item from "@/components/item.vue";

interface DATA {
  id: string;
  title: string;
  status: string;
}

export default defineComponent({
  name: "item-list",
  data() {
    return {
      data: [
        { id: "0", title: "test1", status: "active" },
        { id: "1", title: "test2", status: "active" },
        { id: "2", title: "test3", status: "clear" },
      ] as DATA[],
      renderList: [] as DATA[],
    };
  },
  created() {
    this.renderList = this.data;

    this.$watch(
      () => this.$route.params.status,
      // eslint-disable-next-line
      (toParams: string, previousParams: string) => {
        console.log(toParams);
        if (!toParams) {
          this.renderList = this.data;
        } else if (toParams === "active" || toParams === "clear") {
          this.renderList = this.data.slice().filter((item) => {
            return item.status === toParams;
          });
        }
      }
    );
  },
  components: {
    item,
  },
});
</script>
