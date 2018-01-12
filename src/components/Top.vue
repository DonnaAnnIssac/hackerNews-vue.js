<template>
  <div class="main">
    <div class="nav">
      <div id="prev" v-on:click="getPrev">< prev </div>
      <span> {{ currPage }}/{{ numPages }} </span>
      <div id="next" v-on:click="getNext"> next ></div>
    </div>
    <post-list v-bind:posts="stories"></post-list>
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
      currPage : 1,
      resLength : 0,
      results : [],
      stories : []
    }
  },
  methods : {
    getPrev() {
      if (this.resLength === 0) {
        this.currPage = this.currPage - 1
        this.resLength = this.results.length % 10
        this.start = this.start - 10
        this.getPosts(this.start, this.start + 10)
      } else if (this.resLength !== this.results.length - 10) {
        this.currPage = this.currPage - 1
        this.resLength = this.resLength + 10
        this.start = this.start - 10
        this.getPosts(this.start, this.start + 10)
      }
    },
    getNext() {
     if (this.resLength > 10) {
        this.currPage = this.currPage + 1
        this.resLength = this.resLength - 10
        this.start = this.start + 10
        this.getPosts(this.start, this.start + 10)
      } else if(this.resLength < 10 && this.resLength !== 0) {
        this.currPage = this.currPage + this.currPage
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
  },
  computed: {
      numPages() {
        return Math.ceil(this.results.length / 10)
      }
  }
})

</script>

<style scoped>
.main {
  padding-top: 48px;
  width: 100%;
  margin: 0;
  position: relative;
}
.nav {
  display: flex;
  width: 100%;
  padding: 10px 50px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  position: fixed;
  background-color: #fff;
}
#prev {
  padding: 0px 5px;
}
#next {
  padding: 0px 5px;
}
</style>
