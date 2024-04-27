<template>
  <div>
    <h1 class="title is-2"
        style="margin-left: 20px"
    >
      Projects
    </h1>
    <button
        class="button is-info"
        style="margin-left: 20px; margin-bottom: 50px"
        @click="openModal">
      Create new project
    </button>
  </div>

  <div class="fixed-grid has-5-cols" style="margin: 10px">
    <div class="grid">
      <div
          v-for="project in projects"
          class="card"
          style="margin: 0px"
      >
        <header class="card-header">
          <p class="card-header-title">{{ project.name }}</p>
        </header>
        <div class="card-footer">
          <div class="card-footer-item delete-button-container">
            <button @click="deleteProject(project.id)" class="button is-danger">Delete</button>
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
            <label class="label">Create new project</label>
            <div class="control">
              <input
                  v-model="newProjectName"
                  class="input"
                  type="text"
                  maxlength="25"
                  placeholder="Project name"
              >
            </div>
          </div>

          <div class="grid">
            <div>
              <button
                  :disabled="!newProjectName"
                  class="button is-info"
                  @click="closeModal(); addProject();"
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
import {addDoc, collection, deleteDoc, doc, onSnapshot} from "firebase/firestore"
import {db} from "@/firebase"

const projectCollectionRef = collection(db, "projects")

const projects = ref([])

onMounted(async () => {
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

const newProjectName = ref("");

const addProject = () => {
  addDoc(projectCollectionRef, {
    name: newProjectName.value
  })

  newProjectName.value = ""
}

const deleteProject = id => {
  deleteDoc(doc(projectCollectionRef, id))
  //TODO delete all task with this project
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
  margin: 0 auto;
}

.delete-button-container {
  padding: 0;
  justify-content: end;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-header-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>