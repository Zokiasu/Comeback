<template>
  <div class="p-5 px-10 space-y-5">
    <section
      id="searchbar"
      class="flex w-full justify-start"
      :class="{ 'mb-5': search }"
    >
      <div
        id="search-icon"
        class="
          bg-opacity-20 bg-gray-500
          pr-1
          pl-2
          rounded-none rounded-l
          py-1.5
        "
      >
        <icons-search class="w-5 h-5" />
      </div>
      <input
        id="search-input"
        type="text"
        placeholder="Search"
        v-model="search"
        class="
          w-full
          pl-2
          focus:outline-none
          rounded-r rounded-none
          bg-opacity-20 bg-gray-500
          text-tertiary
          placeholder-tertiary
        "
      />
    </section>

    <div class="flex space-x-5 text-tertiary">
      <ul class="flex flex-wrap gap-5">
        <li>
          <button
            class="px-3 py-2 border rounded"
            @click="
              onlySolo = false;
              onlyGroup = false;
            "
          >
            ALL
          </button>
        </li>
        <li>
          <button
            class="px-3 py-2 border rounded"
            :class="{
              'border-red-500 text-red-500 font-semibold border-2': onlyGroup,
            }"
            @click="
              onlyGroup = !onlyGroup;
              onlySolo = false;
            "
          >
            GROUP
          </button>
        </li>
        <li>
          <button
            class="px-3 py-2 border rounded"
            :class="{
              'border-red-500 text-red-500 font-semibold border-2': onlySolo,
            }"
            @click="
              onlySolo = !onlySolo;
              onlyGroup = false;
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
      class="pb-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3"
    >
      <div
        v-for="(artist, index) in this.filteredList"
        :key="index"
        style="background-color: #6b728033"
        class="
          flex flex-col
          text-tertiary
          rounded-sm
          relative
          p-3
          overflow-hidden
        "
      >
        <span
          class="absolute text-tertiary bottom-0 right-0 bg-gray-900 px-2"
          >{{ index }}</span
        >
        <div class="flex absolute right-2 top-3 space-x-2">
          <NuxtLink :to="`/edit/artist/${artist.id}`" target="_blank">
            <img
              src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"
            />
          </NuxtLink>
          <img
            class="cursor-pointer"
            @click="removeArtist(artist, index)"
            src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"
          />
        </div>
        <div class="flex space-x-2 mb-2">
          <img :src="artist.image" class="w-20 h-20 object-cover" alt="" />
          <div class="flex flex-col justify-between">
            <div class="flex space-x-2">
              <NuxtLink
                :to="`/artist/${artist.id}`"
                target="_blank"
                class="hover:underline"
              >
                <p class="font-semibold text-xl">{{ artist.name }}</p>
              </NuxtLink>
              <span class="text-base mt-1"
                >{{
                  artist.type.charAt(0).toUpperCase() + artist.type.slice(1)
                }}
              </span>
            </div>
            <div class="flex space-x-2">
              <a
                v-for="(social, index) in artist.socials"
                :key="index"
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
                v-for="(platforms, index) in artist.platforms"
                :key="index"
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
            v-for="(style, index) in artist.styles"
            :key="index"
            class="bg-gray-500 p-1 px-2 rounded text-xs"
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
            class="
              truncate
              hover:overflow-ellipsis
              break-words
              overflow-wrap
              block
            "
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
        class="text-tertiary w-full flex justify-center rounded p-2"
      >
        No Artist found.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistList",

  data() {
    return {
      search: "",
      typeFilter: "",
      artists: [],
      maxObjectDisplay: 0,
      enough: false,
      onlyGroup: false,
      onlySolo: false,
      limitedAt: 50,
    };
  },

  async asyncData({ $fire }) {
    const artists = await $fire.firestore
      .collection("artists")
      .orderBy("name")
      .limit(50)
      .get()
      .then((snapshot) => {
        const artistList = [];
        snapshot.forEach((doc) => {
          artistList.push(doc.data());
        });
        return artistList;
      });

    return {
      artists,
    };
  },

  mounted() {
    var vm = this;
    window.addEventListener("scroll", function (e) {
      var scrollPos = window.scrollY;
      var winHeight = window.innerHeight;
      var docHeight = document.documentElement.scrollHeight;
      var perc = (100 * scrollPos) / (docHeight - winHeight);
      if (perc > 15) {
        vm.limitedAt += 50;
        vm.fetchData();
      }
    });
  },

  computed: {
    filteredList() {
      return this.artists.filter((element) => {
        if (this.onlyGroup && element.type.toLowerCase() != "group")
          return false;
        if (this.onlySolo && element.type.toLowerCase() != "solo") return false;
        return true;
      });
    },
  },

  methods: {
    async fetchData() {
      this.artists = await this.$fire.firestore
        .collection("artists")
        .orderBy("name")
        .limit(this.limitedAt)
        .get()
        .then((snapshot) => {
          const artists = [];
          snapshot.forEach((doc) => {
            artists.push(doc.data());
          });
          return artists;
        });
    },

    async removeArtist(object, index) {
      //remove from firebase
    },
  },
};
</script>