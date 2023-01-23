<template>
  <section id="menu">
    <ul class="flex space-x-2 text-xs text-tertiary md:text-sm lg:text-base">
      <NuxtLink
        :to="`/moderator/pending`"
        class="px-3 py-1.5"
        :class="
          $route.name !== 'moderator-pending'
            ? ''
            : 'border-bg-primary border-b-2'
        "
      >
        <span>Pending</span>
      </NuxtLink>
      <NuxtLink
        :to="`/moderator/artistslist`"
        class="px-3 py-1.5"
        :class="
          $route.name !== 'moderator-artistslist'
            ? ''
            : 'border-bg-primary border-b-2'
        "
      >
        <span>Artists</span>
      </NuxtLink>
      <NuxtLink
        :to="`/moderator/releaseslist`"
        class="px-3 py-1.5"
        :class="
          $route.name !== 'moderator-releaseslist'
            ? ''
            : 'border-bg-primary border-b-2'
        "
      >
        <span>Releases</span>
      </NuxtLink>
      <NuxtLink
        :to="`/moderator/musicslist`"
        class="px-3 py-1.5"
        :class="
          $route.name !== 'moderator-musicslist'
            ? ''
            : 'border-bg-primary border-b-2'
        "
      >
        <span>Musics</span>
      </NuxtLink>
      <NuxtLink
        :to="`/moderator/stylelist`"
        class="px-3 py-1.5"
        :class="
          $route.name !== 'moderator-stylelist'
            ? ''
            : 'border-bg-primary border-b-2'
        "
      >
        <span>Styles</span>
      </NuxtLink>
      <NuxtLink
        :to="`/moderator/newslist`"
        class="px-3 py-1.5"
        :class="
          $route.name !== 'moderator-newslist'
            ? ''
            : 'border-bg-primary border-b-2'
        "
      >
        <span>News</span>
      </NuxtLink>
      <NuxtLink
        v-if="adminCheck"
        :to="`/moderator/users`"
        class="px-3 py-1.5"
        :class="
          $route.name !== 'moderator-users'
            ? ''
            : 'border-bg-primary border-b-2'
        "
      >
        <span>Users</span>
      </NuxtLink>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      adminCheck: false,
    }
  },

  computed: {
    userData() {
      const utmp = this.$store.state.dataUser
      return utmp
    },
  },

  created() {
    this.adminChecker()
  },

  methods: {
    async adminChecker() {
      const that = this
      await this.$fire.auth.onAuthStateChanged(async function (user) {
        if (user !== null) {
          const userDatas = await that.$axios.$get(
            `https://comeback-api.herokuapp.com/users/${user.uid}`
          )
          if (userDatas.role !== 'NONE') {
            that.adminCheck = true
          } else {
            that.adminCheck = false
          }
        } else {
          that.adminCheck = false
        }
      })
    },
  },
}
</script>
