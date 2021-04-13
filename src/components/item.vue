<template>
  <div class="input-group">
    <span class="input-group-addon">
      <input
        type="checkbox"
        :checked="status === 'clear'"
        @change="changeStatus"
      />
    </span>
    <input type="text" class="form-control" :value="title" />
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="removeItem">
        X
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store/store";

export default defineComponent({
  name: "item",
  props: {
    id: String,
    title: String,
    status: String,
  },
  data() {
    return {
      checked: this.status === "active" ? true : false,
    };
  },
  setup() {
    return {
      store: useStore(key),
    };
  },
  methods: {
    changeStatus() {
      if (this.checked)
        this.store.commit("changeStatus", { id: this.id, status: "clear" });
      else this.store.commit("changeStatus", { id: this.id, status: "active" });
    },
    removeItem() {
      this.store.commit("removeItem", this.id);
    },
  },
});
</script>
