<template>
  <div class="container">

    <div class="jumbotron text-center">
            <h1>Welcome to the <strong>VENoM</strong> Example Starter App</h1>
            <p>Based on tutorial from <a target="_blank" href="https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0">here</a>.</p>

        <p>Fully loaded with Docker-compose for local development, hot reload, scss in templates, and more.</p>
        <router-link v-bind:to="{ name: 'Posts' }" class="add_post_link">View Posts App</router-link>
    </div>

</div>
</template>
<script>
// import Profile from '../shared/models/Profile'
import ProfileRepository from '../shared/repositories/ProfileRepository'

export default {
  name: 'Hello',
  mounted () {
    (new ProfileRepository()).get(
      '61630ea36348840debfc0a23'
    ).then(console.log);
    (new ProfileRepository()).getAll().then(data => {
      console.log(data)
    })
  }
}
</script>

<style lang="scss" scoped>
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
