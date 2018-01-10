<template>
  <div>
    <div v-for="post in posts">
        <div class="card">
            <div>{{ post.score }}</div>
            <div>
                <a v-if="post.url" v-bind:href="post.url" target="_blank"><strong>{{ post.title }}</strong></a>
                <div v-else><strong>{{ post.title }}</strong></div>
                <div>
                    <router-link :to="{ name: 'user', params: {userinfo : post.by }}">by {{ post.by }} </router-link>
                    <div> {{ timeAgo(post.time) }} </div>
                    <div v-if="post.descendants"> {{ post.descendants}} comments </div>
                </div>
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
        if (seconds > 2 * 24 * 3600) return Math.floor(seconds/(2 * 24 * 3600)) + " days ago"
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