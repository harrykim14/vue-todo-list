<template>
  <div class="form-group">
    <input
      type="text"
      class="form-control"
      placeholder="할 일을 입력해주세요."
      @keyup.enter="addItemHandler"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "itemInput",
  methods: {
    addItemHandler() {
      return null;
    },
  },
});
</script>
