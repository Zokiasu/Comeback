<template>
  <div class="mx-auto p-5 md:p-10">
    <div id="searchbar" class="flex w-full justify-start">
      <div id="search-icon" class="rounded-l bg-gray-500 bg-opacity-20 p-2">
        <icons-search v-if="!searchActive" class="h-5 w-5" />
        <icons-cancel v-else class="h-5 w-5" />
      </div>
      <input
        id="search-input"
        v-model="search"
        type="text"
        placeholder="Search"
        class="w-full rounded-none rounded-r bg-gray-500 bg-opacity-20 pl-2 text-tertiary placeholder-tertiary focus:outline-none"
      />
    </div>
    <transition-group
      id="artist-list"
      name="list-complete"
      tag="div"
      class="grid grid-cols-2 items-center justify-center gap-5 py-5 sm:grid-cols-3 md:grid-cols-4 md:gap-10 md:py-10 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8"
    >
      <lazy-artist-card
        v-for="artist in filteredArtistList"
        :id="artist.id"
        :key="artist.id"
        :image="artist.image"
        :name="artist.name"
        :type="artist.type"
        :groups="artist.groups"
        class="list-complete-item w-34 mx-auto"
      />
    </transition-group>
    <div v-if="loading" class="flex w-full justify-center">
      <div
        class="loader h-10 w-10 rounded-full border-4 border-t-4 border-gray-200 ease-linear"
      ></div>
    </div>
    <div v-if="(filteredArtistList.length < 1) & !loading" class="px-5">
      <p
        class="flex w-full justify-center rounded bg-[#6B728033] p-2 text-tertiary"
      >
        No artists found.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Artists',

  data() {
    return {
      search: '',
      artists: [],
      loading: true,
      searchActive: false,
      limitedAt: 50,
      dsl: 0,
    }
  },

  async fetch() {
    this.artists = await this.$fire.firestore
      .collection('artists')
      .orderBy('name')
      /* .limit(this.limitedAt) */
      .get()
      .then((snapshot) => {
        const artists = []
        snapshot.forEach((doc) => {
          artists.push(doc.data())
        })
        this.loading = false
        this.limitedAt = this.limitedAt + 20
        return artists
      })
  },

  head() {
    return {
      title: 'Comeback - Artists',
    }
  },

  computed: {
    filteredArtistList() {
      return this.artists.filter((element) => {
        return element.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  watch: {
    search: {
      immediate: true,
      handler(search) {
        if (search !== '') {
          this.searchActive = true
        } else {
          this.searchActive = false
        }
      },
    },
  },
}
</script>

<style scoped>
.list-complete-item {
  transition: all 0.7s;
  display: inline-block;
}
.list-complete-enter {
  opacity: 0;
  transform: translateY(50px);
}
.list-complete-leave-active {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
