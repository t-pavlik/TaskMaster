import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './components/HomeView.vue'
import ProjectsView from './components/ProjectsView.vue'
import TasksView from './components/TasksView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/projects', component: ProjectsView },
    { path: '/tasks', component: TasksView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router