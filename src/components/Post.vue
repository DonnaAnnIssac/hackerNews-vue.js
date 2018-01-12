<template>
  <div v-if="postObj.title !== undefined" class="main">
    <div class="post">
      <div><strong>{{postObj.title}}</strong></div>
      <div class="info">
        <div>{{postObj.score}} points</div>
        <div>by {{this.postObj.by}}</div>
        <div>{{this.timeAgo(this.postObj.time)}}</div>
      </div>
    </div>
    <div class="list">
      <div v-if="postObj.descendants > 0">{{this.postObj.descendants}} comments</div>
      <div v-else>No comments yet</div>
      <div v-for="kid in postObj.kids" class="card">
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
<style>
  .main {
    padding-top: 48px;
  }
  .post {
    box-shadow: 0 0px 1px rgba(0,0,0,0.3);
    padding: 10px 0px;
    padding-left: 15px;
  }
  .info {
    display: flex;
  }
  .info div {
    margin-right: 5px;
  }
  .list {
    padding: 10px 0px;
    padding-left: 15px;
  }
  .card {
    box-shadow: 0 0px 1px rgba(0,0,0,0.1);
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>
