<template>
  <div>
    <div v-for="post in posts">
        <div class="card">
            <div>{{ post.score }}</div>
            <div>
                <div> {{ post.title }} </div>
                <div>
                    <div> {{ post.by }} </div>
                    <div> {{ post.time }} </div>
                    <div> {{ post.descendants}} </div>
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