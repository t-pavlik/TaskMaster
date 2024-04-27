<template>
  <section class="hero is-dark is-fullheight">
    <header>
      <h1 class="title is-1 text-center"
          style="margin: 10px"
      >
        TaskMaster
      </h1>

      <nav class="hero-head">
        <div class="container" style="padding: 20px">
          <div class="tabs is-toggle is-fullwidth">
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
        <main>
          <router-view></router-view>
        </main>
      </nav>
    </header>
    <footer>
      <div class="footer text-center" style="padding: 5px">
        Created by Tomas Pavlik
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "node_modules/bulma/css/bulma.min.css";
</style>
