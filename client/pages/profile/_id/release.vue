<template>
  <div class="py-5">
    <h3 class="w-full p-10 text-center text-2xl font-semibold lg:text-5xl">
      Release Liked
    </h3>
    <transition-group
      name="object"
      class="md:inner grid w-full grid-cols-2 gap-y-5 md:flex md:flex-wrap md:justify-center lg:justify-start"
    >
      <ReleaseCard
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
      const artTmp = []
      this.enough = false
      setTimeout(() => {
        this.maxRelease = this.maxRelease + 20
        if (this.maxRelease >= this.releases.length) {
          this.enough = true
          $state.complete()
        } else {
          $state.loaded()
        }
        /* this.$axios.get(`https://comeback-api.herokuapp.com/users/${params.id}/releases?sortby=name&limit=9&offset=${this.maxRelease}`).then(response => {
                        if(response.data.length) {
                            artTmp = artTmp.concat(response.data)
                            this.releases = [...new Set(artTmp)]
                            this.maxRelease = this.maxRelease + 9
                            $state.loaded();
                        } else {
                            this.enough = true
                            $state.complete();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    }); */
      }, 500)
    },
  },
}
</script>

<style></style>
