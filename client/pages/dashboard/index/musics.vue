<template>
  <div class="space-y-5 p-5 px-10">
    <div class="mb-5">
      <button
        class="rounded bg-gray-500 px-2 py-1 text-tertiary focus:outline-none"
        @click="
          sorting = 'name'
          updateDateList()
        "
      >
        Name
      </button>
      <button
        class="rounded bg-gray-500 px-2 py-1 text-tertiary focus:outline-none"
        @click="
          sorting = 'createdAt'
          updateDateList()
        "
      >
        Creation
      </button>
      <button
        class="rounded bg-gray-500 px-2 py-1 text-tertiary focus:outline-none"
        @click="
          sorting = 'updatedAt'
          updateDateList()
        "
      >
        Last Update
      </button>
    </div>
    <section
      v-if="musics.length > 0"
      id="releases-body"
      class="grid grid-cols-1 gap-3 pb-5 lg:grid-cols-2 xl:grid-cols-3"
    >
      <div
        v-for="(music, index) in musics"
        :key="index"
        style="background-color: #6b728033"
        class="relative flex flex-col overflow-hidden rounded-sm p-3 text-tertiary"
      >
        <span
          class="absolute bottom-0 right-0 z-50 bg-gray-900 px-2 text-tertiary"
          >{{ index }}</span
        >
        <div class="right-2 top-3 mb-2 flex space-x-2 xl:absolute xl:mb-0">
          <!--<NuxtLink :to="`/edit/release/${release.id}`" target="_blank"><img src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"/></NuxtLink>-->
          <button class="focus:outline-none" @click="removeVideo(music)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 172 172"
              style="fill: #000000"
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#ffffff">
                  <path
                    d="M28.66667,28.66667c-7.91917,0 -14.33333,6.41417 -14.33333,14.33333v86c0,7.91917 6.41417,14.33333 14.33333,14.33333h84.26432l-8.32845,-8.32845l-13.17155,-13.17155h-55.59765l25.08333,-32.25l17.91667,21.56999l25.08333,-32.31999l15.67708,20.91211l5.27702,-5.27702l18.50456,18.49056l14.29134,-14.29134v-55.66764c0,-7.91917 -6.41417,-14.33333 -14.33333,-14.33333zM124.87077,114.73666l-10.13411,10.13411l18.50456,18.50456l-18.50456,18.49057l10.13411,10.13411l18.50456,-18.49056l18.49057,18.49056l10.13411,-10.13411l-18.49056,-18.49057l18.49056,-18.50456l-10.13411,-10.13411l-18.49057,18.50456z"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
          <img
            v-if="adminCheck"
            class="cursor-pointer"
            src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"
            @click="removeMusic(music.id, music, index)"
          />
        </div>
        <div class="flex space-x-2">
          <img
            :src="music.release.image"
            class="h-20 w-20 object-cover"
            :alt="music.release.name"
          />
          <div class="-mt-1 flex flex-col">
            <div class="mb-1.5 flex space-x-2">
              <span class="text-lg font-semibold"
                ><NuxtLink
                  :to="`/release/${music.release.id}`"
                  target="_blank"
                  class="hover:underline"
                  >{{ music.name }}</NuxtLink
                ></span
              >
            </div>
            <div class="mb-1.5 flex space-x-1">
              <span>{{ music.release.name }}</span>
              <span>-</span>
              <span>{{ music.release.type }}</span>
            </div>
            <div>
              <span v-if="sorting === 'createdAt'"
                >Created At :
                <span
                  >{{
                    new Date(music.createdAt).toLocaleDateString({
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })
                  }}
                </span>
                -
                <span>{{
                  new Date(music.createdAt).toLocaleTimeString({
                    hour: 'numeric',
                    minute: 'numeric',
                  })
                }}</span></span
              >
              <span v-if="sorting === 'updatedAt'"
                >Updated At :
                <span
                  >{{
                    new Date(music.updatedAt).toLocaleDateString({
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })
                  }}
                </span>
                -
                <span>{{
                  new Date(music.updatedAt).toLocaleTimeString({
                    hour: 'numeric',
                    minute: 'numeric',
                  })
                }}</span></span
              >
            </div>
          </div>
        </div>
        <div v-if="music.clip" class="flex justify-center p-2">
          <iframe
            v-if="music.clip"
            class="justify-self-center"
            width="560"
            height="315"
            :src="getYoutubeId(music.clip)"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <!--<iframe v-if="music.clip" class=" justify-self-center" width="560" height="315" :src="getYoutubeId(music.clip)" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
        </div>
      </div>
    </section>
    <InfiniteLoading
      spinner="spiral"
      @infinite="infiniteScroll"
    ></InfiniteLoading>
    <div v-if="musics.length < 1" class="px-5">
      <span
        style="background-color: #6b728033"
        class="flex w-full justify-center rounded p-2 text-tertiary"
        >No Release found.</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReleaseList',

  data() {
    return {
      search: '',
      musics: [],
      maxObjectDisplay: 20,
      enough: false,
      sorting: 'name',
    }
  },

  computed: {
    userId() {
      const utmp = this.$store.state.dataUser
      return utmp.id
    },

    adminCheck() {
      return this.adminChecker()
    },
  },

  methods: {
    infiniteScroll($state) {
      let artTmp = []
      setTimeout(() => {
        artTmp = artTmp.concat(this.musics)
        this.$axios
          .get(
            `https://comeback-api.herokuapp.com/musics?sortby=${this.sorting}&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxObjectDisplay}`
          )
          .then((response) => {
            if (response.data.length > 0) {
              artTmp = artTmp.concat(response.data)
              this.musics = [...new Set(artTmp)]
              this.maxObjectDisplay = this.maxObjectDisplay + 20
              $state.loaded()
            } else {
              this.enough = true
              $state.complete()
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }, 500)
    },

    async updateDateList() {
      let artTmp = []
      this.maxObjectDisplay = 0
      const { data: response } = await this.$axios.get(
        `https://comeback-api.herokuapp.com/musics?sortby=${this.sorting}&name=%${this.search}%&op=ilike&limit=20&offset=${this.maxObjectDisplay}`
      )
      if (response.length > 0) {
        artTmp = artTmp.concat(response)
        this.musics = [...new Set(artTmp)] // Remove all double entry
        if (response.length < 20) {
          this.enough = true
        } else {
          this.maxObjectDisplay = this.maxObjectDisplay + 20
        }
      } else {
        this.enough = true
      }
    },

    getYoutubeId(url) {
      let id, fullId
      if (url?.includes('list=')) {
        id = url.split('list=')[1]
        fullId = 'https://www.youtube.com/embed/videoseries?list=' + id
      } else if (url?.includes('v=')) {
        id = url.split('v=')[1]
        fullId = 'https://www.youtube.com/embed/' + id
      } else if (url?.includes('.be/')) {
        id = url.split('.be/')[1]
        fullId = 'https://www.youtube.com/embed/' + id
      }
      return fullId
    },

    removeVideo(object) {
      object.clip = null
      this.$axios.put(
        `https://comeback-api.herokuapp.com/musics/${object.id}`,
        object
      )
    },

    removeMusic(id, object, index) {
      this.$axios
        .delete(`https://comeback-api.herokuapp.com/musics/${id}`, object)
        .then((response) => {
          this.musics.splice(index, 1)
        })
    },

    async adminChecker() {
      const that = this
      await this.$fire.auth.onAuthStateChanged(async function (user) {
        if (user !== null) {
          const userData = await that.$axios.$get(
            `https://comeback-api.herokuapp.com/users/${user.uid}`
          )
          if (userData.role !== 'NONE') {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      })
    },
  },
}
</script>
