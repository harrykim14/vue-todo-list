<template>
  <div class="form-group">
    <input
      type="text"
      class="form-control"
      placeholder="할 일을 입력해주세요."
      @keyup.enter="addItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "itemInput",
  methods: {
    addItem() {
      this.$store.commit("addItem", {});
    },
  },
});
</script>
