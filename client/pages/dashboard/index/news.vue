<template>
  <div class="space-y-3 p-5 px-10">
    <section
      id="searchbar"
      class="flex w-full justify-start"
      :class="search ? '' : 'mb-5'"
    >
      <div
        id="search-icon"
        class="rounded-none rounded-l bg-gray-500 bg-opacity-20 py-1.5 pr-1 pl-2"
      >
        <svg
          class=""
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
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
                d="M64.5,14.33333c-27.6214,0 -50.16667,22.54527 -50.16667,50.16667c0,27.6214 22.54527,50.16667 50.16667,50.16667c12.52732,0 23.97256,-4.67249 32.7819,-12.31771l3.05143,3.05143v9.26628l43,43l14.33333,-14.33333l-43,-43h-9.26628l-3.05143,-3.05143c7.64521,-8.80934 12.31771,-20.25458 12.31771,-32.7819c0,-27.6214 -22.54527,-50.16667 -50.16667,-50.16667zM64.5,28.66667c19.87509,0 35.83333,15.95824 35.83333,35.83333c0,19.87509 -15.95825,35.83333 -35.83333,35.83333c-19.87509,0 -35.83333,-15.95825 -35.83333,-35.83333c0,-19.87509 15.95824,-35.83333 35.83333,-35.83333z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <input
        id="search-input"
        v-model="search"
        type="text"
        placeholder="Search by username or artistname"
        class="w-full rounded-none rounded-r bg-gray-500 bg-opacity-20 pl-2 text-tertiary placeholder-tertiary focus:outline-none"
        @change="updateDateList(true)"
      />
    </section>
    <button
      v-if="search"
      class="text-bg-primary mb-5 focus:outline-none"
      @click="
        search = ''
        updateDateList(true)
      "
    >
      Reset
    </button>
    <section id="page-body" class="flex flex-wrap justify-center">
      <div
        v-for="(element, index) in news"
        :key="element.id"
        class="relative m-2 flex min-h-full flex-col overflow-hidden rounded-sm bg-black-four p-5 text-tertiary"
      >
        <div class="relative mb-2 flex w-full justify-between">
          <div class="flex flex-col">
            <span class="font-semibold"
              >Created At
              {{
                new Date(element.createdAt).toLocaleDateString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}</span
            >
            <span class="text-sm">{{ element.id }}</span>
          </div>
          <div class="absolute top-0 right-0 flex space-x-2">
            <img
              class="h-5 w-5 cursor-pointer"
              src="https://img.icons8.com/material/20/ffffff/checked-2--v2.png"
              @click="verifiedNews(element)"
            />
            <img
              class="h-5 w-5 cursor-pointer"
              src="https://img.icons8.com/material-sharp/20/ffffff/edit--v1.png"
              @click="openEditView(element)"
            />
            <img
              class="h-5 w-5 cursor-pointer"
              src="https://img.icons8.com/material-rounded/20/ffffff/delete-trash.png"
              @click="removeNews(element, index)"
            />
          </div>
        </div>
        <NewsCard class="m-auto" :element="element" />
      </div>
    </section>
    <div v-if="news.length < 1" class="px-5">
      <span
        style="background-color: #6b728033"
        class="flex w-full justify-center rounded p-2 text-tertiary"
        >No News found.</span
      >
    </div>

    <Modal
      v-model="editNews"
      title="Edit News"
      wrapper-class="animate__animated modal-wrapper"
      :modal-style="{
        background: '#1F1D1D',
        'border-radius': '0.25rem',
        color: 'white',
      }"
      :in-class="`animate__fadeInDown`"
      :out-class="`animate__bounceOut`"
      bg-class="animate__animated"
      :bg-in-class="`animate__fadeInUp`"
      :bg-out-class="`animate__fadeOutDown`"
    >
      <div class="flex flex-col justify-center space-y-2">
        <multiselect
          v-model="objectModify.artist"
          placeholder="Please select an artists"
          label="name"
          track-by="id"
          :options="artistList"
          :close-on-select="true"
          :clear-on-select="true"
          :preserve-search="false"
        >
          <template slot="singleLabel" slot-scope="props">
            <div class="flex space-x-1">
              <img
                v-if="props.option.image"
                class="option__image h-14 w-14 object-cover"
                :src="props.option.image"
              />
              <div class="option__desc flex flex-col space-y-1">
                <span class="option__title">{{ props.option.name }}</span>
                <div class="flex space-x-1">
                  <div class="space-x-1">
                    <span
                      v-for="(group, index) in props.option.groups"
                      :key="index"
                      class="rounded bg-gray-300 p-1 px-2 text-xs"
                      >{{ group.name }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template slot="option" slot-scope="props">
            <div class="flex space-x-1">
              <img
                v-if="props.option.image"
                class="option__image h-14 w-14 object-cover"
                :src="props.option.image"
              />
              <div class="option__desc flex flex-col space-y-1">
                <span class="option__title">{{ props.option.name }}</span>
                <div class="flex space-x-1">
                  <div class="space-x-1">
                    <span
                      v-for="(group, index) in props.option.groups"
                      :key="index"
                      class="rounded bg-gray-300 p-1 px-2 text-xs"
                      >{{ group.name }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </template>
        </multiselect>
        <t-datepicker
          v-model="objectModify.date"
          class="text-black"
          placeholder="Date"
          initial-view="month"
          date-format="Y-m-d"
          clearable
        >
        </t-datepicker>
        <t-input v-model="objectModify.message" class="w-full" type="text" />
        <button
          class="bg-bg-primary py-2 text-tertiary hover:bg-red-900"
          @click="editObjectNews(objectModify)"
        >
          Confirm
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'ArtistList',

  async asyncData({ $fire }) {
    const artistList = await $fire.firestore
      .collection('artists')
      .where('verified', '==', true)
      .get()
      .then((snapshot) => {
        const artists = []
        snapshot.forEach((doc) => {
          artists.push(doc.data())
        })
        return artists
      })
      .catch(() => {
        return { success: false, artists: [] }
      })
    artistList.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    return { artistList }
  },

  data() {
    return {
      search: '',
      news: [],
      maxObjectDisplay: 0,
      enough: false,

      editNews: false,

      objectModify: {},

      artistList: [],
    }
  },

  computed: {
    userId() {
      const utmp = this.$store.state.dataUser
      return utmp.id
    },
  },

  methods: {
    // methods
    async updateDateList(reset) {
      let artTmp = []
      if (reset) {
        this.maxObjectDisplay = 0
        const { data: response } = await this.$axios.get(
          `https://comeback-api.herokuapp.com/infos?sortby=createdAt:desc&limit=5&offset=${this.maxObjectDisplay}`
        )
        if (response.length > 0) {
          artTmp = artTmp.concat(response)
          this.news = [...new Set(artTmp)] // Remove all double entry
          if (response.length < 20) {
            this.enough = true
          } else {
            this.maxObjectDisplay = this.maxObjectDisplay + 20
          }
        } else {
          this.enough = true
        }
      } else {
        artTmp = artTmp.concat(this.news)
        const { data: response } = await this.$axios.get(
          `https://comeback-api.herokuapp.com/infos?sortby=createdAt:desc&limit=5&offset=${this.maxObjectDisplay}`
        )
        if (response.length > 0) {
          artTmp = artTmp.concat(response) // Add next element into actual list
          this.news = [...new Set(artTmp)] // Remove all double entry
          this.maxObjectDisplay = this.maxObjectDisplay + 20
        } else {
          this.enough = true
        }
      }
    },

    openEditView(object) {
      this.objectModify = object
      this.editNews = !this.editNews
    },

    async verifiedNews(object) {
      object.verified = !object.verified
      await this.$axios
        .put(`https://comeback-api.herokuapp.com/infos/${object.id}`, object)
        .then(() => {
          this.$toast.error('News verified has been changed', {
            duration: 2000,
            position: 'top-right',
          })
        })
    },

    async editObjectNews(object) {
      await this.$axios
        .put(`https://comeback-api.herokuapp.com/infos/${object.id}`, object)
        .then(() => {
          this.$toast.error('News has been edited', {
            duration: 2000,
            position: 'top-right',
          })
        })
      this.editNews = !this.editNews
    },

    async removeNews(object, index) {
      await this.$axios
        .delete(`https://comeback-api.herokuapp.com/infos/${object.id}`, object)
        .then(() => {
          this.$toast.error('News has been deleted', {
            duration: 2000,
            position: 'top-right',
          })
          this.news.splice(index, 1)
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
