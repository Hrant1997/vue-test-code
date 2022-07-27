<template>
  <div class="posts">
    <h1>Profiles</h1>
    <div v-if="profiles.length > 0" class="table-wrap">
      <div>
        <router-link :to="{ name: 'CreateProfile' }" >Create Profile</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="profile in profiles"  :key="profile.id">
          <td>{{ profile.title }}</td>
          <td>{{ profile.description }}</td>
          <td align="center">
            <router-link :to="{ name: 'EditProfile', params: { id: profile._id } }">Edit</router-link> |
            <a href="#" @click="deleteProfile(profile._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now!!! <br /><br />
      <router-link v-bind:to="{ name: 'CreateProfile' }" class="add_profile_link">Create Profile</router-link>
    </div>
  </div>
</template>

<script>
import ProfileRepository from '@/shared/repositories/ProfileRepository'
export default {
  name: 'Profiles',
  data () {
    return {
      profiles: []
    }
  },
  mounted () {
    this.getProfiles()
  },
  methods: {
    getProfiles () {
      return ProfileRepository.getAll()
        .then(profiles => {
          this.profiles = profiles
        })
    },

    async deleteProfile (idOrUrl) {
      await ProfileRepository.delete(idOrUrl)
      await this.getProfiles()
      this.$router.push({ name: 'Profiles' })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_profile_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
