<template>
  <div>
    <ToDoCreate @task="newTask" />
    <div class="task-list mt-2">
      <div class="flex">
        <div class="total-tasks font-semibold mr-4">Tasks: <span class="text-orange-500">{{taskCount}}</span></div>
        <div class="completed-tasks font-semibold">Completed: <span class="text-orange-500">{{completedCount}}</span></div>
      </div>
      <div class="task-row flex border-b-2 border-orange-300 py-2" :class="{complete:task.complete}" v-for="(task, index) in tasks" :key="index">
        <div class="text-lg font-semibold w-4/5">{{task.task}}</div>
        <div class="w-1/5">
          <input  @click="toggleTask(index)" type="checkbox" :data-unit="`task-checkbox-${index}`">
          <button class="text-xs border-2 border-red-500 bg-red-500 cursor-pointer hover:bg-red-600 ml-2 shadow rounded px-2 text-white" title="Delete Task" @click="deleteTask(index)" :data-unit="`btn-${index}`">X</button>
        </div>
      </div>
    </div>
    <div v-if="tasks.length == 0" class="no-todo-message">You have no tasks</div>
  </div>
</template>

<script>
import ToDoCreate from "@/components/ToDoCreate.vue"
export default {
  data() {
    return {
      tasks: []
    }
  },
  components: {
    ToDoCreate
  },
  computed: {
    taskCount() {
      return this.tasks.length
    },
    completedCount() {
      var tasks = []
      tasks = this.tasks.filter(task => task.complete)
      return tasks.length
    }
  },
  methods: {
    newTask(task) {
      this.tasks.push({
        task:task,
        complete: false
      })
    },
    toggleTask(index) {
      this.tasks[index].complete = !this.tasks[index].complete
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
    }
  }
}
</script>

<style>
  .complete {
    text-decoration: line-through;
    background-color: rgba(0,255,0,.1)
  }
</style>