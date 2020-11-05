<template>
  <div>
    <input class="w-full border-orange-500 border-2 rounded p-2 text-xl" placeholder="Type task and hit enter" @keyup.enter="taskEnter" v-model="task" type="text" data-unit="taskInput">
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: ""
    }
  },
  methods: {
    taskEnter() {
      this.$emit("task", this.task)
      this.task = ""
    }
  }
}
</script>

<style>

</style>