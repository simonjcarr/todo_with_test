<template>
  <div id="app" class="p-8">
    <div class="text-orange-500 text-3xl font-bold mb-4">Manage my tasks</div>
    <ToDo />
  </div>
</template>

<script>
import ToDo from "@/components/ToDo.vue"
export default {
  name: "App",
  components: {
    ToDo
  }
};
</script>

<style>
</style>
