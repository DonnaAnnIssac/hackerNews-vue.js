<template>
  <div class="card" v-if="userid !== null">
      <div>User: {{userid.id}}</div>
      <div>Created: {{timeAgo(userid.created)}}</div>
      <div>Karma: {{userid.karma}}</div>
      <div class="subs">
        <a v-bind:href=fullSubmitUrl>submissions</a>
        <a v-bind:href=fullCommentsUrl>comments</a>
      </div>
  </div>
</template>

<script>
export default {
    props: ['userinfo'],
    data () {
      return {
        userid : null,
        submiturl : "https://news.ycombinator.com/submitted?id=",
        commentsurl : "https://news.ycombinator.com/threads?id="
      }
    },
    methods : {
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
    mounted() {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/user/' + this.userinfo + '.json', true)
      xhr.send()
      xhr.onreadystatechange = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
          this.userid = JSON.parse(xhr.responseText)
        }
      }
    },
    computed: {
      fullSubmitUrl() {
        return this.submiturl + this.userid.id
      },
      fullCommentsUrl() {
        return this.commentsurl + this.userid.id
      }
    }
}
</script>
<style>
  .card {
    padding-top: 65px;
    padding-bottom: 15px;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  }
  .subs {
    display: flex;
  }
  .subs a{
    margin-right: 3px;
  }
</style>