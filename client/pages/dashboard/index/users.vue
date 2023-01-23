<template>
  <div class="space-y-5 p-5 px-10">
    <section id="users-body" class="grid grid-cols-1 gap-3 pb-5 lg:grid-cols-2">
      <div
        v-for="(user, index) in users"
        :key="index"
        style="background-color: #6b728033"
        class="relative flex flex-col overflow-hidden rounded-sm p-3 text-tertiary"
      >
        <span
          class="absolute bottom-0 right-0 bg-gray-900 px-2 text-tertiary"
          >{{ index }}</span
        >
        <div class="flex space-x-5 p-2">
          <img
            :src="
              user.avatar ? user.avatar : require(`~/assets/image/artist.png`)
            "
            class="h-20 w-20 rounded-full border border-gray-400 object-cover"
            alt=""
          />
          <div class="-mt-1 flex flex-col space-y-1.5">
            <div class="flex space-x-2">
              <span class="text-lg font-semibold"
                ><NuxtLink
                  :to="`/users/${user.uid}`"
                  target="_blank"
                  class="hover:underline"
                  >{{ user.username }}</NuxtLink
                >
                -
                <span class="text-base font-normal">{{ user.uid }}</span></span
              >
            </div>
            <div>
              <span :class="user.role === 'ADMIN' ? 'text-red-500' : ''">{{
                user.role.charAt(0).toUpperCase() + user.role.slice(1)
              }}</span>
            </div>
            <div>
              <span v-if="user.email">{{ user.email }}</span>
              <span v-if="!user.email"> Email Undefined </span>
            </div>
          </div>
        </div>
        <!--<div class="flex space-x-3">
                    <div>
                        <span v-if="user.artists.length > 0">{{user.artists.length}} Artists followed</span>
                        <span v-else> No artists followed </span>
                    </div>
                    <span>•</span>
                    <div>
                        <span v-if="user.requests.length > 0">{{user.requests.length}} Request sent</span>
                        <span v-else> No request sent </span>
                    </div>
                </div>-->
      </div>
    </section>
    <InfiniteLoading
      spinner="spiral"
      @infinite="infiniteScroll"
    ></InfiniteLoading>
  </div>
</template>

<script>
export default {
  name: 'UserList',

  data() {
    return {
      users: [],
      maxObjectDisplay: 0,
      enough: false,
      search: '',
    }
  },

  computed: {
    userId() {
      const utmp = this.$store.state.dataUser
      return utmp.id
    },

    defaultImage() {
      return '../../assets/image/profile.png'
    },
  },

  methods: {
    infiniteScroll($state) {
      let artTmp = []
      setTimeout(() => {
        artTmp = artTmp.concat(this.users)
        this.$axios
          .get(
            `https://comeback-api.herokuapp.com/users?sortby=username&limit=2&offset=${this.maxObjectDisplay}`
          )
          .then((response) => {
            if (response.data.length > 0) {
              artTmp = artTmp.concat(response.data)
              this.users = [...new Set(artTmp)]
              this.maxObjectDisplay = this.maxObjectDisplay + 2
              $state.loaded()
            } else {
              this.enough = true
              $state.complete()
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }, 500)
    },
  },
}
</script>
