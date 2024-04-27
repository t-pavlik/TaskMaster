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
          Create task
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
            <select v-model="task.state" @change="changeTaskState(task.id, $event)">
              <option value=1>Open</option>
              <option value=2>In progress</option>
              <option value=3>Done</option>
              <option value=4>Won't do</option>
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
import {onMounted, ref} from "vue";
import {addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore"
import {db} from "@/firebase"

const taskCollectionRef = collection(db, "tasks")

const tasks = ref([])

onMounted(async () => {
  onSnapshot(taskCollectionRef, (querySnapshot) => {
    const fbTasks = []
    querySnapshot.forEach((doc) => {
      const task = {
        id: doc.id,
        name: doc.data().name,
        content: doc.data().content,
        color: doc.data().color,
        state: doc.data().state
      }
      fbTasks.push(task)
    })
    tasks.value = fbTasks
  })
})

const newTaskName = ref("");
const newInfo = ref("");

const state = {
  1: "",
  2: "blue",
  3: "green",
  4: "red"
}

const addTask = () => {
  addDoc(taskCollectionRef, {
    name: newTaskName.value,
    content: newInfo.value,
    color: state[1],
    state: 1
  })

  newTaskName.value = ""
  newInfo.value = ""
}

const deleteTask = id => {
  deleteDoc(doc(taskCollectionRef, id))
}

const changeTaskState = (id, event) => {
  updateDoc(doc(taskCollectionRef, id), {
    color: state[event.target.value],
    state: event.target.value
  })
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