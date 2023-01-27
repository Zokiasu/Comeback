<template>
  <div class="space-y-5 p-5 px-10">
    <section
      v-if="artists.length > 0"
      id="searchbar"
      class="flex w-full justify-start"
      :class="{ 'mb-5': search }"
    >
      <div
        id="search-icon"
        class="
          rounded-none rounded-l
          bg-quaternary bg-opacity-20
          py-1.5
          pr-1
          pl-2
        "
      >
        <icons-search class="h-5 w-5" />
      </div>
      <input
        id="search-input"
        v-model="search"
        type="text"
        placeholder="Search"
        class="
          w-full
          rounded-none rounded-r
          bg-quaternary bg-opacity-20
          pl-2
          placeholder-tertiary
          focus:outline-none
        "
      />
    </section>

    <section id="filters">
      <ul class="flex space-x-2">
        <li>
          <button
            class="rounded border px-3 py-2"
            :class="{
              'border-red-500 text-red-500': !onlyGroup && !onlySolo,
            }"
            @click="
              onlySolo = false
              onlyGroup = false
            "
          >
            ALL
          </button>
        </li>
        <li>
          <button
            class="rounded border px-3 py-2"
            :class="{
              'border-red-500 text-red-500': onlyGroup,
            }"
            @click="
              onlyGroup = !onlyGroup
              onlySolo = false
            "
          >
            GROUP
          </button>
        </li>
        <li>
          <button
            class="rounded border px-3 py-2"
            :class="{
              'border-red-500 text-red-500': onlySolo,
            }"
            @click="
              onlySolo = !onlySolo
              onlyGroup = false
            "
          >
            SOLIST
          </button>
        </li>
      </ul>
    </section>

    <section
      id="artist_card"
      class="grid grid-cols-1 gap-3 pb-5 lg:grid-cols-2 xl:grid-cols-3"
    >
      <LazyDashboardArtistView
        v-for="(artist, index) in filteredList"
        :id="artist.id"
        :key="index + '_artist'"
        :index="index"
        :image="artist.image"
        :name="artist.name"
        :type="artist.type"
        :description="artist.description"
        :styles="artist.styles"
        :socials="artist.socials"
        :platforms="artist.platforms"
        @removeArtist="removeArtist(artist, index)"
      />
    </section>

    <section v-if="artists.length < 1">
      <p class="flex bg-quaternary w-full justify-center rounded py-5 text-xl">
        No Artist found.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ArtistList',

  data() {
    return {
      search: '',
      typeFilter: '',
      artists: [],
      maxObjectDisplay: 0,
      enough: false,
      onlyGroup: false,
      onlySolo: false,
    }
  },

  computed: {
    filteredList() {
      return this.artists.filter((element) => {
        if (this.onlyGroup && element.type.toLowerCase() !== 'group')
          return false
        if (this.onlySolo && element.type.toLowerCase() !== 'solo') return false
        return true
      })
    },
  },

  async mounted() {
    await this.fetch()
    console.log(this.artists)
  },

  methods: {
    async fetch() {
      this.artists = await this.$fire.firestore
        .collection('artists')
        .orderBy('name')
        .get()
        .then((snapshot) => {
          const artists = []
          snapshot.forEach((doc) => {
            artists.push(doc.data())
          })
          return artists
        })
    },

    async removeArtist(object, index) {
      console.log('removeArtist')
      await this.$fire.firestore
        .collection('artists')
        .doc(object.id)
        .delete()
        .then(() => {
          this.artists.splice(index, 1)
        })
    },
  },
}
</script>
