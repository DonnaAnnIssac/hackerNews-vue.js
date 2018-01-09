<template>
  <div class="hello">
    <h2><top-list v-bind:posts="stories"></top-list></h2>
  </div>
</template>

<script>
import topList from './TopList.vue'

export default ({
  name: 'Top',
  components: { 'top-list': topList },
  data () {
    return {
      results : [],
      stories : []
    }
  },
  methods : {
    getPosts() {
      for (let i = 0; i < 20; i++) {
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
        this.getPosts()
      }
    }
  }

})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
