<template>
  <div class="p-5 text-tertiary lg:p-10">
    <div class="flex justify-between border-b border-tertiary">
      <div class="flex space-x-2">
        <NuxtLink class="my-auto" :to="`/release/${$route.params.id}`">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
            />
          </svg>
        </NuxtLink>
        <h2 class="my-auto text-2xl font-semibold">Edition Release</h2>
      </div>
      <button
        class="Card hover:bg-bg-primary rounded px-5 py-1 text-tertiary"
        @click="editRelease()"
      >
        Confirm
      </button>
    </div>
    <section class="lg:px-5">
      <div
        class="flex flex-col justify-center space-y-10 py-7 lg:flex-row lg:space-y-0 lg:space-x-5"
      >
        <div id="image" class="Card mx-auto">
          <img
            class="h-80 object-cover lg:w-96"
            :src="release.image"
            :alt="release.name"
          />
          <div
            class="xl:bottom-2 xl:mx-auto xl:flex xl:w-full xl:justify-center"
          >
            <button
              class="bg-bg-primary w-full rounded-b px-5 py-1 text-tertiary hover:bg-red-900 focus:outline-none"
              :disabled="isUploadingImage"
              type="button"
              @click="launchImageFile"
            >
              {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
            </button>
            <input
              ref="imageFile"
              type="file"
              accept="image/png, image/jpeg"
              class="hidden"
              @change.prevent="uploadImageFile($event.target.files)"
            />
          </div>
        </div>
        <div class="flex w-full flex-col space-y-7">
          <div
            class="flex flex-col space-y-1 lg:flex-row lg:space-y-0 lg:space-x-2"
          >
            <span class="my-auto w-28 text-lg font-semibold">Name*</span>
            <t-input
              v-model="release.name"
              autocomplete="false"
              type="text"
              :value="release.name"
              placeholder="Artist Name"
              name="artists-name"
              @change="newObjectToApi('name', release.name)"
            />
          </div>
          <div
            class="flex flex-col space-y-1 lg:flex-row lg:space-y-0 lg:space-x-2"
          >
            <span class="my-auto w-28 text-lg font-semibold">Type</span>
            <t-select
              id="artists-type-selector"
              v-model="release.type"
              :options="[
                { value: 'SINGLE', text: 'Single' },
                { value: 'ALBUM', text: 'Album' },
                { value: 'EP', text: 'EP' },
              ]"
              @change="newObjectToApi('type', release.type)"
            ></t-select>
          </div>
          <div
            id="artists"
            class="flex flex-col space-y-1 lg:flex-row lg:space-y-0 lg:space-x-2"
          >
            <span class="my-auto w-28 text-lg font-semibold">Artist(s)*</span>
            <multiselect
              v-model="release.artists"
              tag-placeholder="Add this as new artist"
              placeholder="Search or add a artist"
              label="name"
              track-by="id"
              :options="artistList"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="false"
              :multiple="true"
              :taggable="true"
              @input="newObjectToApi('artists', release.artists)"
              @tag="addArtist"
            >
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
          </div>
          <div
            class="flex flex-col space-y-1 lg:flex-row lg:space-y-0 lg:space-x-2"
          >
            <span class="my-auto w-28 text-lg font-semibold">Style</span>
            <multiselect
              key="name"
              v-model="release.styles"
              tag-placeholder="Add this as new style"
              placeholder="Search or add a style"
              label="name"
              :options="styleList"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="false"
              :multiple="true"
              :taggable="true"
              @input="newObjectToApi('styles', release.styles)"
              @tag="addStyle"
            >
            </multiselect>
          </div>
        </div>
      </div>
      <div class="flex flex-col space-y-5">
        <div id="youtube-id" class="flex flex-col space-y-1">
          <h3 class="my-auto text-lg font-semibold">Youtube Music ID</h3>
          <t-input
            v-model="release.idyoutubemusic"
            autocomplete="false"
            type="text"
            :value="release.idyoutubemusic"
            placeholder="release idyoutubemusic"
            name="release-idyoutubemusic"
            @change="newObjectToApi('idyoutubemusic', release.idyoutubemusic)"
          />
        </div>
        <div id="datepicker" class="flex w-full flex-col space-y-10">
          <div id="release-date" class="flex flex-col space-y-1">
            <h2 class="my-auto text-lg font-semibold">
              Release Date*
              <span class="text-base"
                >: {{ dates.toLocaleDateString('fr-FR') }} at
                {{ dates.toLocaleTimeString('en-US').toString().slice(0, 4) }}
                in {{ actualTimezone }}</span
              >
            </h2>
            <div class="rounded bg-black-one p-5">
              <v-date-picker
                v-model="dates"
                mode="dateTime"
                :timezone="timezone"
                color="red"
                is-expanded
              />
              <div class="pt-2">
                <div class="flex w-full justify-between">
                  <span class="text-sm font-bold text-tertiary">-11:00</span>
                  <span class="text-sm font-bold text-tertiary">UTC</span>
                  <span class="text-sm font-bold text-tertiary">+11:00</span>
                </div>
                <input
                  v-model="timezoneIndex"
                  class="w-full"
                  type="range"
                  min="0"
                  :max="timezones.length - 1"
                />
                <div class="flex">
                  <span class="mr-2 font-semibold text-gray-400"
                    >Timezone:</span
                  >
                  <span class="text-tertiary"
                    >{{ timezone }} ({{ abbrTimezone }})</span
                  >
                </div>
                <div class="flex">
                  <span class="mr-2 font-semibold text-gray-400"
                    >Namezone:</span
                  >
                  <span class="text-tertiary">{{ namezone }}</span>
                </div>
                <div class="flex">
                  <span class="mr-2 font-semibold text-gray-400"
                    >GMT Zone:</span
                  >
                  <span class="text-tertiary">GMT{{ gmtzone }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="streaming-platform" class="w-full space-y-1">
          <h3 class="my-auto text-lg font-semibold">
            Streaming Platforms Link
          </h3>
          <MultipleInput
            v-for="(element, index) in release.platforms"
            :key="index"
            class="mb-1"
            :element="element"
            :placehol="'Streaming Platforms'"
            @updateinput="
              updateList(release.platforms, $event, index, 'platforms')
            "
            @deleteinput="deleteList(release.platforms, index)"
          />
          <button
            class="Card flex w-full justify-center space-x-2 rounded bg-tertiary bg-opacity-30 p-2 text-left focus:outline-none"
            @click="addStreamingLink()"
          >
            <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png" />
          </button>
        </div>
        <div id="tracklist" class="w-full space-y-1">
          <h3 class="my-auto text-lg font-semibold">Tracklist*</h3>
          <div class="bg-search-leftbar rounded p-5">
            <div
              v-for="(music, index) in release.musics"
              :key="index"
              class="mb-3 space-y-1"
            >
              <span>Track {{ index + 1 }}</span>
              <!--<button @click="deleteList(release.musics, index)" class="text-bg-primary focus:outline-none text-sm font-semibold">Delete</button>-->
              <t-input
                v-model="music.name"
                type="text"
                placeholder="Track Name"
                @change="newObjectToApiMusic(release.musics, index)"
              />
              <t-input
                v-model="music.clip"
                type="text"
                placeholder="Track Clip"
                @change="newObjectToApiMusic(release.musics, index)"
              />
            </div>
            <button
              class="Card flex w-full justify-center space-x-2 rounded bg-tertiary bg-opacity-30 p-2 text-left focus:outline-none"
              @click="addMusic()"
            >
              <img src="https://img.icons8.com/ios/20/ffffff/plus--v2.png" />
            </button>
          </div>
        </div>
        <div id="source" class="flex flex-col space-y-1">
          <h3 class="my-auto text-lg font-semibold">Source*</h3>
          <t-textarea
            id="source"
            v-model="source"
            placeholder="Source"
            name="my-textarea"
            class="h-20 w-full resize"
          />
        </div>
      </div>
      <button
        class="Card bg-bg-primary my-2 w-full rounded px-5 py-1 text-tertiary hover:bg-red-900"
        @click="editRelease()"
      >
        Confirm
      </button>
    </section>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'

export default {
  name: 'EditRelease',

  async asyncData({ $axios, params }) {
    const release = await $axios.$get(
      `https://comeback-api.herokuapp.com/releases/${params.id}`
    )
    const artistList = await $axios.$get(
      'https://comeback-api.herokuapp.com/artists/groups?sortby=name:asc'
    )
    const styleList = await $axios.$get(
      'https://comeback-api.herokuapp.com/styles?sortby=name:asc'
    )

    release.newArtists = []

    return { release, artistList, styleList }
    // return {release}
  },

  data() {
    return {
      dates: new Date(),
      actualTimezone: '',
      timezoneIndex: 11,
      timezones: [
        'Pacific/Niue', // -11
        'Pacific/Honolulu', // -10
        'America/Anchorage', // -9
        'America/Los_Angeles', // -8
        'America/Denver', // -7
        'America/Chicago', // -6
        'America/New_York', // -5
        'America/Puerto_Rico', // -4
        'America/Buenos_Aires', // -3
        'America/Sao_Paulo', // -2,
        'Atlantic/Azores', // -1
        'UTC', // 0
        'Europe/Amsterdam', // +1
        'Europe/Athens', // +2
        'Europe/Moscow', // +3
        'Indian/Mahe', // +4
        'Asia/Ashgabat', // +5
        'Asia/Dhaka', // +6
        'Asia/Bangkok', // +7
        'Asia/Hong_Kong', // +8
        'Asia/Seoul', // +9
        'Australia/Sydney', // +10
        'Asia/Magadan', // +11
      ],
      nameZones: [
        'Niue, Pago Pago', // -11
        'Hawaii, Rarotonga, Tahiti', // -10
        'Alaska Gambier', // -9
        'Tijuana, Vancouver, Whitehorse', // -8
        'Arizona, Mazatlan, Dawnson Creek, +3', // -7
        'Mexico City, Costa Rica, Guatemala, +8', // -6
        'Toronto, Jamaica, Panama, +11', // -5
        'Guyana, Puerto Rico, Curacoa, +13', // -4
        'Buenos Aires, Cayenne, Salvador, +17', // -3
        'Noronha, Sao Paulo, South Georgia', // -2,
        'Azores, Cape Verde, Scoresbysund', // -1
        'Dublin, Lisbon, London, +11', // 0
        'Amsterdam, Berlin, Oslo, +23', // +1
        'Bucharest, Jerusalem, Johannesburg, +19', // +2
        'Baghdad, Istanbul, Qatar, +5', // +3
        'Dubai, Reunion, Yerevan, +5', // +4
        'Maldives, Mawson, Karachi, +7', // +5
        'Almaty, Vostok, Chagos, +4', // +6
        'Hanoi, Jakarta, Davis, +4', // +7
        'Taipei, Kuala Lumpur, Singapore, +10', // +8
        'Tokyo, Palau, Dili, +3', // +9
        'Guam, Vladivostok, Port Moresby, +3', // +10
        'Noumea, Casey, Sydney, +7', // +11
      ],
      release: {},
      sendToApi: {},
      oldDataToApi: {},
      artistList: [],
      styleList: [],
      updateRelease: false,
      updateMusic: false,
      sendToApiMusics: [],
      isUploadingImage: false,
      source: '',
      user: null,
    }
  },

  head() {
    return {
      title: this.release.name,
    }
  },

  computed: {
    timezone() {
      return this.timezones[this.timezoneIndex]
    },
    abbrTimezone() {
      return moment.tz(this.timezone).zoneAbbr()
    },
    namezone() {
      return this.nameZones[this.timezoneIndex]
    },
    gmtzone() {
      const moment = require('moment-timezone')
      const zone = moment()
        .tz(this.timezones[this.timezoneIndex])
        .format()
        .toString()
        .slice(19, 25)
      if (zone === 'Z') {
        return '+00:00'
      } else {
        return zone
      }
    },
  },

  watch: {
    dates: function (val) {
      if (val.toString() !== new Date(this.release.date).toString()) {
        this.newObjectToApi('date', val)
      }
    },
  },

  created() {
    this.actualTimezone = moment.tz.guess()
  },

  async mounted() {
    this.dates = new Date(this.release.date)
    this.oldDataToApi = JSON.parse(JSON.stringify(this.release))
    this.user = await this.GET_USER()
  },

  methods: {
    ...mapGetters(['GET_USER']),

    async editRelease() {
      if (this.user === null) this.user = this.GET_USER()
      if (this.updateRelease) {
        await this.$axios
          .post(`https://comeback-api.herokuapp.com/requests`, {
            state: 'PENDING',
            method: 'PUT',
            endpoint: `/releases/${this.$route.params.id}`,
            body: this.sendToApi,
            currentData: this.oldDataToApi,
            userId: this.user.uid,
            source: this.source,
          })
          .then(() => {
            if (!this.updateMusic) {
              this.$router.push({ path: `/release/${this.$route.params.id}` })
            }
          })
          .catch(function (error) {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }

      if (this.updateMusic) {
        this.sendToApiMusics.forEach(async (element) => {
          let oldData = {}
          oldData = this.oldDataToApi.musics

          await this.$axios
            .post(`https://comeback-api.herokuapp.com/requests`, {
              state: 'PENDING',
              method: 'PUT',
              endpoint: `/musics/${element.id}`,
              body: element,
              currentData: oldData,
              userId: this.user.uid,
              source: this.source,
            })
            .then(() => {
              this.$router.push({ path: `/release/${this.$route.params.id}` })
            })
            .catch(function (error) {
              // eslint-disable-next-line no-console
              console.log(error)
            })
        })
      }
    },

    addArtist(newTag) {
      const tag = {
        name: newTag,
        image:
          'https://firebasestorage.googleapis.com/v0/b/comeback-65643.appspot.com/o/images%2Fartists.jpg?alt=media&token=23be3721-5157-45a7-8c0e-e1c03c2e1827',
        type: 'SOLO',
        website: null,
        description: null,
        socials: null,
        platforms: null,
      }
      this.artistList.push(tag)
      this.release.artists.push(tag)
      this.release.newArtists.push(tag)
    },

    addStyle(newTag) {
      const tag = {
        name: newTag,
      }
      if (this.release.styles === null) {
        this.release.styles = [tag]
      } else {
        this.release.styles.push(tag)
      }
      this.styleList.push(tag)
      this.newObjectToApi('styles', this.release.styles)
    },

    addMusic() {
      this.release.musics.push({
        id: null,
        name: null,
        clip: null,
        platforms: null,
      })
    },

    addStreamingLink() {
      if (this.release.platforms === null) {
        this.release.platforms = ['']
      } else {
        this.release.platforms.push('')
      }
    },

    updateList(list, newElem, index, key) {
      list[index] = newElem
      this.newObjectToApi(key, list)
    },

    deleteList(list, index) {
      list.splice(index, 1)
    },

    newObjectToApi(key, value) {
      this.sendToApi[key] = value
      this.updateRelease = true
    },

    newObjectToApiMusic(value, index) {
      if (value[index].id) {
        let elementExist = false
        this.sendToApiMusics.forEach((element) => {
          if (element.id === value[index].id) {
            element = value[index]
            elementExist = true
          }
        })
        if (!elementExist) {
          this.sendToApiMusics.push(value[index])
        }
        this.updateMusic = true
      } else {
        this.newObjectToApi('musics', value)
      }
    },

    launchImageFile() {
      this.$refs.imageFile.click()
    },

    uploadImageFile(files) {
      if (!files.length) {
        return
      }
      const file = files[0]

      if (!file.type.match('image.*')) {
        alert('Please upload an image.')
        return
      }

      const metadata = {
        contentType: file.type,
      }

      this.isUploadingImage = true

      const imageRef = this.$fire.storage.ref(
        `images/release/${this.release.id}`
      )

      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((url) => {
            return url
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
      uploadTask.then((url) => {
        this.newObjectToApi('image', url)
        this.release.image = url
        this.isUploadingImage = false
      })
    },
  },
}
</script>
