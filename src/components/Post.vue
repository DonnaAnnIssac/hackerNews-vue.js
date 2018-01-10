<template>
    <div class="main">
        <div class="card">
            <div><strong>{{this.postinfo.title}}</strong></div>
            <div>{{this.postinfo.score}}</div>
            <div> by {{this.postinfo.by}} </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['postinfo'],
    mounted() {
      console.log('Mounted ' + this.postinfo)
    }
}
</script>
