<template>
  <div class="py-5">
    <h3 class="w-full p-10 text-center text-2xl font-semibold lg:text-5xl">
      Release Liked
    </h3>
    <transition-group
      name="object"
      class="md:inner grid w-full grid-cols-2 gap-y-5 md:flex md:flex-wrap md:justify-center lg:justify-start"
    >
      <release-card
        v-for="release in releases.slice(0, 9)"
        :id="release.id"
        :key="release.id"
        :image="release.image"
        :date="release.date"
        :name="release.name"
        :type="release.type"
        class="release justify-self-center md:mr-5 md:mb-5"
      />
    </transition-group>
    <InfiniteLoading
      v-if="!enough"
      spinner="spiral"
      @infinite="infiniteScroll"
    ></InfiniteLoading>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const releases = await $axios.$get(
      `https://comeback-api.herokuapp.com/users/${params.id}/releases`
    )
    releases?.sort(function (a, b) {
      if (a.name?.toLowerCase() > b.name?.toLowerCase()) {
        return -1
      }
      if (a.name?.toLowerCase() < b.name?.toLowerCase()) {
        return 1
      }
      return 0
    })
    return { releases }
  },
  data() {
    return {
      releases: [],
      maxRelease: 0,
      enough: false,
    }
  },

  methods: {
    infiniteScroll($state) {
      this.enough = false
      setTimeout(() => {
        this.maxRelease = this.maxRelease + 20
        if (this.maxRelease >= this.releases.length) {
          this.enough = true
          $state.complete()
        } else {
          $state.loaded()
        }
      }, 500)
    },
  },
}
</script>

<style></style>
