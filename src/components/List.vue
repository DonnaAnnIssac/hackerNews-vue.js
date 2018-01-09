<template>
  <div>
    <div v-for="post in posts">
        <div class="card">
            <div>{{ post.score }}</div>
            <div>
                <div> <strong>{{ post.title }}</strong> </div>
                <div>
                    <div> by {{ post.by }} </div>
                    <div> {{ post.time }} </div>
                    <div> {{ post.descendants}} comments </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
      props: ['posts']
  }
</script>