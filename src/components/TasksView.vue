<template>
  <form
      @submit.prevent="addTask"
  >
    <div class="task">
      <div class="field is-grouped">
        <div class="control is-expanded">
          <input
              v-model="newContent"
              class="input"
              type="text"
              placeholder="Add task"
          >
        </div>
        <div class="control">
          <button
              :disabled="!newContent"
              class="button is-info"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </form>

  <div class="fixed-grid has-4-cols">
    <div class="grid">
      <div
          v-for="task in tasks"
          class="card"
      >
        <header class="card-header">
          <p class="card-header-title">{{ task.name }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            {{ task.id }}
          </div>
        </div>
        <footer class="card-footer">
          <button
              class="card-footer-item">Done
          </button>
          <button
              @click="deleteTask(task.id)"
              class="card-footer-item">Delete
          </button>
        </footer>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";
import {v4 as uuidv4} from "uuid"

const tasks = ref([])

const newContent = ref("");

const addTask = () => {
  const newTask = {
    id: uuidv4(),
    name: newContent.value,
    content: "Test"
  }
  tasks.value.push(newTask)
  newContent.value = ""
}

const deleteTask = id => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}
</script>

<style>
.task {
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
</style>