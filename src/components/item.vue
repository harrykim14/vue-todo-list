<template>
  <div class="input-group">
    <span class="input-group-addon">
      <input
        type="checkbox"
        :checked="status === 'clear'"
        @change="changeStatus"
        v-model="checked"
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
import { defineComponent, ref } from "vue";
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
    const check = this.status === "active" ? true : false;
    const checkboxRef = ref(this.checked);
    return {
      ref: checkboxRef,
      checked: check,
    };
  },
  mounted() {
    this.$watch(
      () => this.ref,
      () => this.$emit("initRenderList", this.status)
    );
    this.$forceUpdate();
  },
  setup() {
    const store = useStore(key);
    return {
      store: store,
    };
  },
  methods: {
    changeStatus() {
      if (this.checked) {
        this.store.commit("changeStatus", { id: this.id, status: "clear" });
        this.$forceUpdate();
      } else {
        this.store.commit("changeStatus", { id: this.id, status: "active" });
        this.$forceUpdate();
      }
    },
    removeItem() {
      this.store.commit("removeItem", this.id);
    },
  },
});
</script>
