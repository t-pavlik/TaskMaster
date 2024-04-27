<template>
  <form
      @submit.prevent="addTask"
  >
    <div class="task">
      <div class="box">
        <div class="field">
          <label class="label">Task</label>
          <div class="control">
            <input
                v-model="newTaskName"
                class="input"
                type="text"
                maxlength="25"
                placeholder="Task name"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">Info</label>
          <div class="control">
              <textarea
                  v-model="newInfo"
                  class="textarea"
                  type="text"
                  placeholder="Information about task"
              ></textarea>
          </div>
        </div>

        <button
            :disabled="!newTaskName || !newInfo"
            class="button is-info"
        >
          Add
        </button>
      </div>
    </div>
  </form>

  <div class="fixed-grid has-4-cols">
    <div class="grid">
      <div
          v-for="task in tasks"
          class="card"
      >
        <header class="card-header" :style="{backgroundColor: task.color}">
          <p class="card-header-title">{{ task.name }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            {{ task.content }}
          </div>
        </div>
        <div class="card-footer">
          <div class="select is-rounded">
            <select @change="onChange(task.id, $event)">
              <option value="1">Open</option>
              <option value="2">In progress</option>
              <option value="3">Done</option>
              <option value="4">Won't do</option>
            </select>
          </div>
          <button
              @click="deleteTask(task.id)"
              class="card-footer-item">Delete
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";
import {v4 as uuidv4} from "uuid"

const tasks = ref([])

const newTaskName = ref("");
const newInfo = ref("");

const colorMap = {
  1: "",
  2: "blue",
  3: "green",
  4: "red"
}

const addTask = () => {
  const newTask = {
    id: uuidv4(),
    name: newTaskName.value,
    content: newInfo.value,
    color: colorMap[1]
  }
  tasks.value.push(newTask)
  newTaskName.value = ""
  newInfo.value = ""
  console.log(newTask)
}

const deleteTask = id => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const onChange = (id, event) => {
  tasks.value.find(task => task.id === id).color = colorMap[event.target.value];
}
</script>

<style>
.task {
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}

.card {
  background-color: green;
}
</style>