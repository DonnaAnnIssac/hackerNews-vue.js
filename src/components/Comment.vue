<template>
    <div>
        <div v-if="commentObj.by !== undefined">
            <div>{{this.commentObj.by}}</div>
            <div>{{this.timeAgo(this.commentObj.time)}}</div>
            <div v-html="this.commentObj.text"></div>
            <div v-if="commentObj.kids">
                <button v-on:click="showReplies">{{ numKids }} replies</button>
                <div v-if="replies">
                    <div v-for="kid in commentObj.kids">
                        <comment-info :commentId="kid"></comment-info>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['commentId'],
  data() {
    return {
      commentObj: {},
      replies: false
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
    },
    showReplies() {
      this.replies = (this.replies) ? false : true
    }
  },
  computed: {
    numKids() {
      return this.commentObj.kids.length
    }
  },
  mounted() {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/item/' + this.commentId + '.json', true)
    xhr.send()
    xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
        this.commentObj = JSON.parse(xhr.responseText)
      }
    }
  }
}
</script>
