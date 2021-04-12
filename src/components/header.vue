<template>
  <div>
    <h1>TODO LIST</h1>
    <ol class="breadcrumb">
      <!-- router-link의 to tag는 a로 rebuild됨-->
      <li><router-link to="/">All</router-link></li>
      <li><router-link to="/active">Active</router-link></li>
      <li class="active"><router-link to="/clear">Clear</router-link></li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "header",
});
</script>
