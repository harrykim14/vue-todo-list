<template>
  <div class="form-group">
    <input
      type="text"
      class="form-control"
      v-model="title"
      placeholder="할 일을 입력해주세요."
      @keyup.enter="addItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "itemInput",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    addItem() {
      this.$store.commit("addItem", {
        id: this.$store.state.todoList.length + 1,
        title: this.title,
        status: "active",
      });
    },
  },
});
</script>
