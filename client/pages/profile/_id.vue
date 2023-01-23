<template>
  <div class="text-tertiary">
    <div
      class="background-top relative bg-slate-200"
      :style="{ 'background-image': 'url(' + user.avatar + ')' }"
    >
      <div class="flex h-full w-full bg-background bg-opacity-30">
        <div
          class="mt-auto flex w-full flex-col justify-start px-2 py-16 md:px-5 lg:my-auto lg:space-y-5 lg:px-20"
        >
          <div
            class="z-50 mt-auto flex space-y-5 lg:my-auto lg:space-y-0 lg:space-x-10"
          >
            <div class="releaseJacket relative">
              <img
                class="shadowRelease h-72 w-72 rounded-xl object-cover object-center"
                :src="user.avatar"
                :alt="user.avatar"
              />
            </div>
            <div class="mt-auto flex">
              <div class="mt-auto space-y-5 py-5">
                <div>
                  <!--<span v-if="userConnected && userConnected.id === user.uid" class="text-lg">Edit</span>-->
                  <h1
                    class="tShadowRelease cursor-default text-6xl font-semibold filter xl:text-8xl"
                  >
                    {{ user.username }}
                  </h1>
                </div>
                <div>
                  <span class="rounded-3xl bg-dark-gray py-2 px-5">
                    {{ user.role }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-row">
            <ul class="flex flex-row flex-wrap space-x-5">
              <li v-if="user.country">
                <span class="font-semibold">Location :</span>
                <span> {{ user.country }} </span>
              </li>
              <li v-if="user.birthday">
                <span class="font-semibold">Birthday :</span>
                <span>
                  {{
                    new Date(user.birthday).toLocaleDateString('en-EN', {
                      month: 'long',
                      day: 'numeric',
                    })
                  }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="gradient absolute bottom-0 h-32 w-full font-bold"></div>
      </div>
    </div>
    <section>
      <div class="lg:px-20">
        <ul class="grid grid-cols-3 lg:text-2xl">
          <NuxtLink
            :to="`/profile/${$route.params.id}/general`"
            class="w-full cursor-pointer justify-self-center py-2 text-center"
            :class="
              $route.name === 'profile-id-general'
                ? 'z-50 border-b-2 border-red-500'
                : 'border-b border-main-gray'
            "
            >General</NuxtLink
          >
          <NuxtLink
            :to="`/profile/${$route.params.id}/artist`"
            class="w-full cursor-pointer justify-self-center py-2 text-center"
            :class="
              $route.name === 'profile-id-artist'
                ? 'z-50 border-b-2 border-red-500'
                : 'border-b border-main-gray'
            "
            >Artist</NuxtLink
          >
          <NuxtLink
            :to="`/profile/${$route.params.id}/release`"
            class="w-full cursor-pointer justify-self-center py-2 text-center"
            :class="
              $route.name === 'profile-id-release'
                ? 'z-50 border-b-2 border-red-500'
                : 'border-b border-main-gray'
            "
            >Release</NuxtLink
          >
          <!--<li @click="actualPage = 'Stats'" class="justify-self-center text-center w-full cursor-pointer" :class="actualPage === 'Stats' ? 'border-b-2 border-red-500 z-50':'border-b border-main-gray'">Stats</li>-->
        </ul>
        <NuxtChild />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $axios, params }) {
    const user = await $axios.$get(
      `https://comeback-api.herokuapp.com/users/${params.id}`
    )
    return { user }
  },

  data() {
    return {
      user: null,
      actualPage: 'General',
      userConnected: null,
    }
  },
  head() {
    return {
      title: this.user.username,
    }
  },

  beforeCreate() {
    if (
      this.$router.currentRoute.name !== 'profile-id-general' &&
      this.$router.currentRoute.name !== 'profile-id-artist' &&
      this.$router.currentRoute.name !== 'profile-id-release'
    )
      this.$router.push(`/profile/${this.$route.params.id}/general`)
  },

  mounted() {
    this.userConnected = this.GET_USER()
  },

  methods: {
    ...mapGetters(['GET_USER']),
  },
}
</script>

<style>
@media screen and (max-width: 1024px) {
  .releaseJacket {
    display: none !important;
  }
}

.tShadowRelease {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.shadowRelease {
  --tw-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.background-top {
  height: 30rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-position: 50% 25%;
}
.gradient {
  background: rgb(0, 0, 0);
  background: -moz-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(31, 29, 29, 1) 96%
  );
  background: -webkit-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(31, 29, 29, 1) 96%
  );
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(31, 29, 29, 1) 96%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#1f1d1d",GradientType=1);
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
