<template>
    <div v-if="postObj.title !== undefined"class="main">
        <div class="card">
          <div>{{postObj.title}}</div>
          <div>
            <div>{{postObj.score}}</div>
            <div>by {{this.postObj.by}}</div>
            <div>{{this.timeAgo(this.postObj.time)}}</div>
          </div>
        </div>
        <div class="card">
            <div>{{this.postObj.descendants}} comments</div>
            <div v-for="kid in postObj.kids">
              <comment-info :commentId="kid"></comment-info>
            </div>
        </div>
    </div>
</template>

<script>
import comment from './Comment'
import Vue from 'vue'
Vue.component('comment-info', comment)

export default {
  props: ['id'],
  data() {
    return {
      postObj: {}
    }
  },
  methods: {
    timeAgo(time) {
      let ts = new Date(time)
      let nowTs = Math.floor(new Date().getTime()/1000)
      let seconds = nowTs - ts
      if (seconds > 2 * 24 * 3600) return Math.floor(seconds/(24 * 3600)) + " days ago"
      if ( seconds > 24 * 3600) return "yesterday"
      if (seconds > 2 * 3600) return Math.floor(seconds/3600) + " hours ago"
      if (seconds > 3600) return "1 hour ago"
      if (seconds > 60) return Math.floor(seconds/60) + " minutes ago"
      if (seconds === 60) return "1 minute ago"
      return seconds + " seconds ago"
    }
  },
  created() {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/item/' + this.id + '.json', true)
    xhr.send()
    xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
        this.postObj = JSON.parse(xhr.responseText)
      }
    }
  }
}
</script>
