<template>
  <div class="space-y-5 p-5 px-10">
    <section
      id="searchbar"
      class="flex w-full justify-start"
      :class="{ 'mb-5': search }"
    >
      <div
        id="search-icon"
        class="rounded-none rounded-l bg-gray-500 bg-opacity-20 py-1.5 pr-1 pl-2"
      >
        <icons-search class="h-5 w-5" />
      </div>
      <input
        id="search-input"
        v-model="search"
        type="text"
        placeholder="Search"
        class="w-full rounded-none rounded-r bg-gray-500 bg-opacity-20 pl-2 text-tertiary placeholder-tertiary focus:outline-none"
      />
    </section>

    <div class="flex space-x-5 text-tertiary">
      <ul class="flex flex-wrap gap-5">
        <li>
          <button
            class="rounded border px-3 py-2"
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
              'border-2 border-red-500 font-semibold text-red-500': onlyGroup,
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
              'border-2 border-red-500 font-semibold text-red-500': onlySolo,
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
    </div>

    <section
      v-if="artists.length > 0"
      id="page-body"
      class="grid grid-cols-1 gap-3 pb-5 lg:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="(artist, index) in filteredList"
        :key="index"
        style="background-color: #6b728033"
        class="relative flex flex-col overflow-hidden rounded-sm p-3 text-tertiary"
      >
        <span
          class="absolute bottom-0 right-0 bg-gray-900 px-2 text-tertiary"
          >{{ index }}</span
        >
        <div class="absolute right-2 top-3 flex space-x-2">
          <NuxtLink :to="`/edit/artist/${artist.id}`" target="_blank">
            <img
              src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"
            />
          </NuxtLink>
          <img
            class="cursor-pointer"
            src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"
            @click="removeArtist(artist, index)"
          />
        </div>
        <div class="mb-2 flex space-x-2">
          <img :src="artist.image" class="h-20 w-20 object-cover" alt="" />
          <div class="flex flex-col justify-between">
            <div class="flex space-x-2">
              <NuxtLink
                :to="`/artist/${artist.id}`"
                target="_blank"
                class="hover:underline"
              >
                <p class="text-xl font-semibold">{{ artist.name }}</p>
              </NuxtLink>
              <span class="mt-1 text-base"
                >{{
                  artist.type.charAt(0).toUpperCase() + artist.type.slice(1)
                }}
              </span>
            </div>
            <div class="flex space-x-2">
              <a
                v-for="(social, indexSocial) in artist.socials"
                :key="indexSocial"
                :href="social"
                target="_blank"
              >
                <img
                  class="w-4"
                  :src="`https://www.google.com/s2/favicons?domain=${social}`"
                />
              </a>
              <span v-if="!artist.socials" class="text-red-500">
                No Social Media
              </span>
            </div>
            <div class="flex space-x-2">
              <a
                v-for="(platforms, indexPlatforms) in artist.platforms"
                :key="indexPlatforms"
                :href="platforms"
                target="_blank"
                ><img
                  class="w-4"
                  :src="`https://www.google.com/s2/favicons?domain=${platforms}`"
              /></a>
              <span v-if="!artist.platforms" class="text-red-500">
                No Streaming Platforms
              </span>
            </div>
          </div>
        </div>
        <div class="space-x-1">
          <span
            v-for="(style, indexStyle) in artist.styles"
            :key="indexStyle"
            class="rounded bg-gray-500 p-1 px-2 text-xs"
          >
            {{ style }}
          </span>
          <span v-if="artist.styles.length < 1" class="text-red-500">
            No styles
          </span>
        </div>
        <div>
          <span
            v-if="artist.description"
            class="overflow-wrap block truncate break-words hover:overflow-ellipsis"
          >
            {{ artist.description }}
          </span>
          <span v-if="!artist.description" class="text-red-500">
            No description
          </span>
        </div>
      </div>
    </section>

    <div v-if="artists.length < 1" class="px-5">
      <p
        style="background-color: #6b728033"
        class="flex w-full justify-center rounded p-2 text-tertiary"
      >
        No Artist found.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistList',

  async asyncData({ $fire }) {
    const artists = await $fire.firestore
      .collection('artists')
      .orderBy('name')
      .limit(50)
      .get()
      .then((snapshot) => {
        const artistList = []
        snapshot.forEach((doc) => {
          artistList.push(doc.data())
        })
        return artistList
      })

    return {
      artists,
    }
  },

  data() {
    return {
      search: '',
      typeFilter: '',
      artists: [],
      maxObjectDisplay: 0,
      enough: false,
      onlyGroup: false,
      onlySolo: false,
      limitedAt: 50,
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

  mounted() {
    const vm = this
    window.addEventListener('scroll', function (e) {
      const scrollPos = window.scrollY
      const winHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const perc = (100 * scrollPos) / (docHeight - winHeight)
      if (perc > 15) {
        vm.limitedAt += 50
        vm.fetchData()
      }
    })
  },

  methods: {
    async fetchData() {
      this.artists = await this.$fire.firestore
        .collection('artists')
        .orderBy('name')
        .limit(this.limitedAt)
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
      // remove from firebase
    },
  },
}
</script>
