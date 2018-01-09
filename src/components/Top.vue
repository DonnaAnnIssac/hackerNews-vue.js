<template>
  <div class="main">
    <div><div v-on:click="getPrev">< prev</div> <div v-on:click="getNext">next ></div></div>
    <div><post-list v-bind:posts="stories"></post-list></div>
  </div>
</template>

<script>
import list from './List.vue'
import Vue from 'vue'

Vue.component('post-list', list)

export default ({
  name: 'Top',
  data () {
    return {
      start : 0,
      resLength : 0,
      results : [],
      stories : []
    }
  },
  methods : {
    getPrev() {
      if (this.resLength === 0) {
        this.resLength = this.results.length % 10
        this.start = this.start - 10
        this.getPosts(this.start, this.start + 10)
      } else if (this.resLength !== this.results.length - 10){
        this.resLength = this.resLength + 10
        this.start = this.start - 10
        this.getPosts(this.start, this.start + 10)
      }
    },
    getNext() {
     if (this.resLength > 10) {
        this.resLength = this.resLength - 10
        this.start = this.start + 10
        this.getPosts(this.start, this.start + 10)
      } else if(this.resLength < 10 && this.resLength !== 0) {
        this.start = this.start + 10
        this.getPosts(this.start, this.start + this.resLength)
        this.resLength = 0
      }
    },
    getPosts(start, end) {
      this.stories = []
      for (let i = start; i < end; i++) {
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
    xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json', true)
    xhr.send()
    xhr.onreadystatechange = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        this.results = JSON.parse(xhr.responseText)
        this.resLength = this.results.length - 10
        this.getPosts(this.start, this.start + 10)
      }
    }
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
