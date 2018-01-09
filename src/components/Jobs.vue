<template>
  <div class="main">
    <div><post-list v-bind:posts="stories"></post-list></div>
  </div>
</template>

<script>
import list from './List.vue'
import Vue from 'vue'

Vue.component('post-list', list)

export default ({
  name: 'New',
  data () {
    return {
      results : [],
      stories : []
    }
  },
  methods : {
    getPosts() {
      for (let i = 0; i < this.results.length; i++) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/item/' + this.results[i] + '.json', true)
        xhr.send()
        xhr.onreadystatechange = () => {
          if (xhr.status === 200 && xhr.readyState === 4) {
            this.stories.push(JSON.parse(xhr.responseText))
          }
        }
      }
    }
  },
  mounted() {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/jobstories.json', true)
    xhr.send()
    xhr.onreadystatechange = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        this.results = JSON.parse(xhr.responseText)
        this.getPosts()
      }
    }
  }
})
</script>
<!-- styling for the component -->
<style scoped>

</style>