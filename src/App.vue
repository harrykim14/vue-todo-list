<template>
  <div id="app"></div>
  <appHeader></appHeader>
  <itemInput></itemInput>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import appHeader from "@/components/header.vue";
import itemInput from "@/components/item-Input.vue";

export default defineComponent({
  name: "App",
  components: {
    appHeader,
    itemInput,
  },
});
</script>

<style>
#app {
  padding: 100px;
}
</style>
