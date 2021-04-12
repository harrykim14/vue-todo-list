<template>
  <div class="input-group">
    <span class="input-group-addon">
      <input
        type="checkbox"
        :checked="status === 'clear'"
        @change="changeStatusHandler"
      />
    </span>
    <input type="text" class="form-control" :value="title" />
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="removeItemHandler">
        X
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "item",
  props: {
    id: String,
    title: String,
    status: String,
  },
  methods: {
    changeStatusHandler() {
      return null;
    },
    removeItemHandler() {
      return null;
    },
  },
});
</script>
