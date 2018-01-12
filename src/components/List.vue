<template>
  <div id="content">
    <div class = "card" v-for="post in posts">
      <div class="score">{{ post.score }}</div>
      <div class="info">
          <a v-if="post.url" v-bind:href="post.url" target="_blank"><strong>{{ post.title }}</strong></a>
          <div v-else><strong>{{ post.title }}</strong></div>
          <div class="postInfo">
              <router-link :to="{ name: 'user', params: {userinfo : post.by }}">by {{ post.by }} </router-link>
              <div class="time"> {{ timeAgo(post.time) }} </div>
              <div v-if="post.descendants">
                <router-link :to="{ name: 'post', params: {id : post.id}}">{{ post.descendants }} comments</router-link>
              </div>
              <div v-else><router-link :to="{ name: 'post', params: {id : post.id}}"> 0 comments </router-link></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['posts'],
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
    }
  }
</script>

<style>
  #content {
    padding-top: 45px;
  }
  .card {
    display: flex;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  }
  .score {
    min-width: 40px;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f60;
    font-weight: 500;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
  .info a{
    text-decoration: none;
    color: #34495e;
  }
  .postInfo {
    display: flex;
  }
  .time {
    margin: 0px 4px 0px 4px;
  }
</style>