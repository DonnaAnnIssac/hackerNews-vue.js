<template>
  <div id="app">
    <header>
    <div class="inner">
      <router-link v-bind:to="'/'">Top</router-link>
      <router-link v-bind:to="'/new'">New</router-link>
      <router-link v-bind:to="'/ask'">Ask</router-link>
      <router-link v-bind:to="'/show'">Show</router-link>
      <router-link v-bind:to="'/jobs'">Jobs</router-link>
    </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
header {
  width: 100%;
  text-align: center;
  background-color: #f60;
  position: fixed;
  z-index: 999;
}
.inner {
  width: 100%;
  padding: 15px 5px;
  color: white;
  box-sizing: border-box;
  margin: 0 auto;
}

header a {
  color: hsla(0,0%,100%,.8);
  transition: color .15s ease;
  display: inline-block;
  font-weight: 300;
  letter-spacing: .075em;
  margin-right: 1.8em;
}

a {
  text-decoration: none;
}

header a.router-link-exact-active {
  color: #fff;
  font-weight: 400;
}

header a:hover {
  color: #fff;
}
</style>
