<template>
  <div class="profiles">
    <h1>Edit Profile</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <button class="app_profile_btn" @click="updateProfile">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import ProfileRepository from '@/shared/repositories/ProfileRepository'
export default {
  name: 'EditProfile',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      const response = await ProfileRepository.get(this.$route.params.id)
      this.title = response.data.title
      this.description = response.data.description
    },
    async updateProfile () {
      await ProfileRepository.put(this.$route.params.id, {
        title: this.title,
        description: this.description
      })
      this.$router.push({ name: 'Profiles' })
    }
  }
}
</script>
<style lang="scss" scoped>
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_profile_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
