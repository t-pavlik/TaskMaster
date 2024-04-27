<template>
  <section class="hero is-dark is-fullheight">
    <header>
      <h1 class="title is-1 text-center">TaskMaster</h1>
      <nav class="hero-head">
        <div class="container">
          <div class="tabs is-boxed is-fullwidth">
            <div class="col text-center">
              <router-link to="/">Home</router-link>
            </div>
            <div class="col text-center">
              <router-link to="/projects">Projects</router-link>
            </div>
            <div class="col text-center">
              <router-link to="/tasks">Tasks</router-link>
            </div>
          </div>
        </div>
        <main><router-view></router-view></main>
      </nav>
    </header>
  </section>
</template>

<script>
import TasksView from "@/components/TasksView.vue";

export default {
  name: 'App',
  components: {TasksView}
}
</script>

<style>
@import "node_modules/bulma/css/bulma.min.css";

</style>
