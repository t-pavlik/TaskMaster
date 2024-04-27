<template>
  <div>
    <h1 class="title is-2"
        style="margin-left: 20px"
    >
      Tasks
    </h1>
    <button
        class="button is-info"
        style="margin-left: 20px; margin-bottom: 50px"
        @click="openModal">
      Create new project
    </button>
  </div>

  <div class="fixed-grid has-4-cols"
       style="margin: 10px"
  >
    <div class="grid">
      <div
          v-for="task in tasks"
          class="card"
          style="margin: 0px"
      >
        <header class="card-header" :style="{backgroundColor: task.color}">
          <div>
            <p class="title">{{ task.name }}</p>
            <p class="subtitle">app: {{ task.project.name }}</p>
          </div>
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
          <div class="card-footer-item delete-button-container">
            <button @click="deleteTask(task.id)" class="button is-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal"
       :class="{ 'is-active': isModalOpen }"
  >
    <div class="modal-background align-content-center">
      <div class="task">
        <div class="box">
          <div class="field">
            <label class="label">Create new task</label>
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

          <div class="field">
            <label class="label">Project</label>
            <div class="select">
              <select v-model="newProjectRefId" style="min-width: 200px">
                <template v-if="projects && projects.length > 0">
                  <option
                      v-for="project in projects"
                      :value="project.id">{{ project.name }}
                  </option>
                </template>
                <template v-else>
                  <option value="" disabled selected>No projects available</option>
                </template>
              </select>
            </div>
          </div>

          <div class="grid">
            <div>
              <button
                  :disabled="!newTaskName || !newInfo || !newProjectRefId"
                  class="button is-info"
                  @click="closeModal(); addTask();"
              >
                Create
              </button>
            </div>
            <div class="has-text-right">
              <button
                  class="button is-info"
                  @click="closeModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore"
import {db} from "@/firebase"
// import {projects} from "./ProjectsView.vue"

const taskCollectionRef = collection(db, "tasks")
const projectCollectionRef = collection(db, "projects")

const tasks = ref([])
const projects = ref([])

onMounted(async () => {
  onSnapshot(taskCollectionRef, (querySnapshot) => {
    const fbTasks = []
    querySnapshot.forEach((doc) => {
      const task = {
        id: doc.id,
        name: doc.data().name,
        content: doc.data().content,
        color: doc.data().color,
        state: doc.data().state,
        project: doc.data().project
      }
      fbTasks.push(task)
    })
    tasks.value = fbTasks
  })

  onSnapshot(projectCollectionRef, (querySnapshot) => {
    const fbTasks = []
    querySnapshot.forEach((doc) => {
      const project = {
        id: doc.id,
        name: doc.data().name
      }
      fbTasks.push(project)
    })
    projects.value = fbTasks
  })
})

const newTaskName = ref("");
const newInfo = ref("");
const newProjectRefId = ref("")

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
    state: 1,
    project: projects.value.find(project => project.id === newProjectRefId.value)
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

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style>
.task {
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}

.delete-button-container {
  padding: 0;
  justify-content: end;
}
</style>